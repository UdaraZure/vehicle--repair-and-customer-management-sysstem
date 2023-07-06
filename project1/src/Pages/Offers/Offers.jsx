import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import './Offers.css';
import * as Yup from 'yup';
import axios from 'axios';
    
      
function Offers() {
  
  const initialValues = {
    title: '',
    description: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(5).max(20).required("You must input a title"),
    description: Yup.string().max(100).required("You must input a description"),
    
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/offers', data).then((response) => {
      console.log("success");
    });
  };

  return (
    <div className='OfferContainer'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form className="form-container">

                <label className="label">Title:</label>
                <ErrorMessage name="title" component="span" />
                <Field 
                  id="InputOffer"
                  name="title"
                  className="field"
                  placeholder="Brakes..."
                />

                <label className="label">Description:</label>
                <ErrorMessage name="description" component="span" />
                <Field 
                  id="InputOffer"
                  name="description"
                  className="field"
                  placeholder="Description"
                />

                <button type="submit" className="submit-button">Submit</button>
              </Form>
        </Formik>
    </div>
  )
}

export default Offers

