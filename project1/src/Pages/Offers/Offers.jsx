import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Offers.css';
import * as Yup from 'yup';
import axios from 'axios';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [editID, setEditID] = useState(-1);
  const [editedValues, setEditedValues] = useState({ Title: '', Description: '' });

  const initialValues = {
    Title: '',
    Description: '',
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().min(5).max(20).required('You must input a title'),
    Description: Yup.string().max(100).required('You must input a description'),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post('http://localhost:3001/offers', values)
      .then((response) => {
        console.log('success');
        resetForm();
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error);
        console.log('error');
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/offers')
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setOffers(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  const handleEdit = (id) => {
    setEditID(id);
  };

  const handleUpdate = (id, updatedOffer) => {
    axios
      .put(`http://localhost:3001/offers/${id}`, updatedOffer)
      .then((response) => {
        console.log('Offer updated successfully');
        setEditID(-1); // Reset the edit ID to exit edit mode
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log('Error updating offer:', error);
      });
  };

  const handleInputChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedOffers = [...offers];
    updatedOffers[index][fieldName] = value;
    setOffers(updatedOffers);
  };

  return (
    <>
      <div className="OfferContainer">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="form-container">
            <label className="label">Title:</label>
            <ErrorMessage name="Title" component="span" />
            <Field id="InputOffer" name="Title" className="field" placeholder="Brakes..." />

            <label className="label">Description:</label>
            <ErrorMessage name="Description" component="span" />
            <Field id="InputOffer" name="Description" className="field" placeholder="Description" />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      <div>
        <table className="offer-table">
          <thead>
            <tr>
              <th className='table-head'>ID</th>
              <th className='table-head'>Title</th>
              <th className='table-head'>Description</th>
              <th className='table-head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) =>
              offer.id === editID ? (
                <tr key={offer.id}>
                  <td>{offer.id}</td>
                  <td>
                    <input
                      type="text"
                      value={offers[index].Title}
                      onChange={(e) => handleInputChange(e, 'Title', index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={offers[index].Description}
                      onChange={(e) => handleInputChange(e, 'Description', index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(offer.id, offers[index])}>Update</button>
                  </td>
                </tr>
              ) : (
                <tr key={offer.id}>
                  <td>{offer.id}</td>
                  <td>{offer.Title}</td>
                  <td>{offer.Description}</td>
                  <td>
                    <button onClick={() => handleEdit(offer.id)}>Edit</button>
                    <button>Delete</button>
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
