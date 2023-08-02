import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Offers.css";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [editID, setEditID] = useState(-1);
  const [editedValues, setEditedValues] = useState({
    Title: "",
    Description: "",
  });
  const [response, setResponse] = useState();

  const initialValues = {
    Title: "",
    Description: "",
    FromDate: "",
    TillDate: "",
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().min(5).max(50).required("You must input a title"),
    Description: Yup.string().max(330).required("You must input a description"),
    FromDate: Yup.date()
      .required("You must input a date")
      .min(new Date(), "From Date cannot be before today")
      .test(
        "fromDateBeforeTillDate",
        "From Date must be before Till Date",
        function (value) {
          const tillDate = this.parent.TillDate;
          if (tillDate) {
            return new Date(value) < new Date(tillDate);
          }
          return true;
        }
      ),
    TillDate: Yup.date()
      .required("You must input a date")
      .min(new Date(), "Till Date cannot be before today")
      .test(
        "tillDateAfterFromDate",
        "Till Date must be after From Date",
        function (value) {
          const fromDate = this.parent.FromDate;
          if (fromDate) {
            return new Date(value) > new Date(fromDate);
          }
          return true;
        }
      ),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3001/offers", values, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log("error");
          console.log(response.data.error);
          // Handle network errors or server-side validation errors
          toast.error("Failed to create offer. Please try again.");
        } else if (response.status === 201 || response.status === 200) {
          setResponse(response.data);
          console.log("success");
          toast.success("Offer created successfully!");
          resetForm();
          // window.location.reload(); // Refresh the page
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        // Handle network errors or server-side validation errors
        toast.error("Failed to create offer. Please try again.");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/offers")
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setOffers(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, [response]);

  const handleEdit = (id) => {
    // Show confirmation popup
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this offer?"
    );
    if (!confirmUpdate) {
      return;
    }
    setEditID(id);
  };

  const handleUpdate = (id, updatedOffer) => {
    axios
      .put(`http://localhost:3001/offers/${id}`, updatedOffer)
      .then((response) => {
        console.log("Offer updated successfully");
        setEditID(-1); // Reset the edit ID to exit edit mode
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer.OfferID === id ? updatedOffer : offer
          )
        );
      })
      .catch((error) => {
        console.log("Error updating offer:", error);
      });
  };

  const handleDelete = (id) => {
    // Show confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );
    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3001/offers/${id}`)
      .then((response) => {
        console.log("Offer deleted successfully");
        setOffers((prevOffers) =>
          prevOffers.filter((offer) => offer.OfferID !== id)
        );
      })
      .catch((error) => {
        console.log("Error deleting offer:", error);
      });
  };

  const handleInputChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedOffers = [...offers];
    updatedOffers[index][fieldName] = value;
    setOffers(updatedOffers);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="OfferContainer">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="form-container">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Offers</p>
            <label className="label">Title:</label>
            <ErrorMessage name="Title" component="span" />
            <Field
              id="InputOffer"
              name="Title"
              className="field"
              placeholder="Title..."
            />

            <label className="label">Description:</label>
            <ErrorMessage name="Description" component="span" />
            <Field
              id="InputOffer"
              name="Description"
              className="field"
              placeholder="Description"
            />

            <label className="label">From:</label>
            <ErrorMessage name="FromDate" component="span" />
            <Field
              type="date"
              id="InputOffer"
              name="FromDate"
              className="field"
              placeholder=""
            />

            <label className="label">Valid Till:</label>
            <ErrorMessage name="TillDate" component="span" />
            <Field
              type="date"
              id="InputOffer"
              name="TillDate"
              className="field"
              placeholder=""
            />

            <button type="submit" className="submit-button">
              Submit
            </button>
            <ToastContainer position="top-center" autoClose={3000} />
          </Form>
        </Formik>
      </div>

      <div>
        <table className="offer-table">
          <thead>
            <tr>
              <th className="table-head">Offer ID</th>
              <th className="table-head">Title</th>
              <th className="table-head">Description</th>
              <th className="table-head">From Date</th>
              <th className="table-head">Valid Till</th>
              <th className="table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) =>
              offer.OfferID === editID ? (
                <tr key={offer.OfferID}>
                  <td>{offer.OfferID}</td>
                  <td>
                    <input
                      type="text"
                      value={offers[index].Title}
                      onChange={(e) => handleInputChange(e, "Title", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={offers[index].Description}
                      onChange={(e) =>
                        handleInputChange(e, "Description", index)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formatDate(offers[index].FromDate)}
                      onChange={(e) => handleInputChange(e, "FromDate", index)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={formatDate(offers[index].TillDate)}
                      onChange={(e) => handleInputChange(e, "TillDate", index)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdate(offer.id, offers[index])}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={offer.id}>
                  <td>{offer.OfferID}</td>
                  <td>{offer.Title}</td>
                  <td>{offer.Description}</td>
                  <td>{formatDate(offer.FromDate)}</td>
                  <td>{formatDate(offer.TillDate)}</td>
                  <td>
                    <button onClick={() => handleEdit(offer.OfferID)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(offer.OfferID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Offers;
