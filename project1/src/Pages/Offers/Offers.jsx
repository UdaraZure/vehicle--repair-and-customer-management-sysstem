import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Offers.css';
import * as Yup from 'yup';
import axios from 'axios';

function Offers() {
  // offer table
  const [offers, setOffers] = useState([]);

  // variables
  const initialValues = {
    Title: "",
    Description: "",
  };

  // validation
  const validationSchema = Yup.object().shape({
    Title: Yup.string().min(5).max(20).required("You must input a title"),
    Description: Yup.string().max(100).required("You must input a description"),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post('http://localhost:3001/offers', values)
      .then((response) => {
        console.log("success");
        resetForm();
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3001/offers')
      .then(response => {
        const { data } = response;
        if (data && data.length > 0) {
          setOffers(data); // Update the state with the fetched data
        }
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  return (
    <>
      <div className='OfferContainer'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="form-container">
            <label className="label">Title:</label>
            <ErrorMessage name="Title" component="span" />
            <Field 
              id="InputOffer"
              name="Title"
              className="field"
              placeholder="Brakes..."
            />

            <label className="label">Description:</label>
            <ErrorMessage name="Description" component="span" />
            <Field 
              id="InputOffer"
              name="Description"
              className="field"
              placeholder="Description"
            />

            <button type="submit" className="submit-button">Submit</button>
          </Form>
        </Formik>
      </div>

      <div>
        <table className='offer-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th> 
            </tr>
          </thead>
          <tbody>
            {offers.map((value, key) => (
              <tr key={key}>
                <td>{value.Title}</td>
                <td>{value.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Offers;
