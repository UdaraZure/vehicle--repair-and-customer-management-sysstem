import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Offers.css';
import * as Yup from 'yup';
import axios from 'axios';

function Offers() {
  const initialValues = {
    Title: '',
    Description: '',
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string().min(5).max(20).required('You must input a title'),
    Description: Yup.string().max(100).required('You must input a description'),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post('http://localhost:3001/offers', values)
      .then((response) => {
        console.log(response);
        console.log('success');
        resetForm(); // Reset the form after successful submission
      })
      .catch((error) => {
        console.log(error);
        console.log('error');
      });
  };

  return (
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
  );
}

export default Offers;
