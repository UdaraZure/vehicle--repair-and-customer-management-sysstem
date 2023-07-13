import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './OwnerRegister.css'
import axios from 'axios';

function OwnerRegister() {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).max(20).required('You must input a username'),
    password: Yup.string().min(8).required('You must input a password'),
  });

  const onSubmit = (data, {resetForm}) => {
    axios.post("http://localhost:3001/Owners", data).then(()=>{
      console.log(data);
      resetForm(); 
    });
    
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="form-container">
            <p>Owner Registration</p>
            <label className="label">Username:</label>
            <ErrorMessage name="username" component="span" />
            <Field 
            id="InputUsername" 
            name="username" className="field" 
            placeholder="07********" />

            <label className="label">Password:</label>
            <ErrorMessage name="password" component="span" />
            <Field 
            autocomplete="off"
            type="password"
            id="InputPassword" 
            name="password" className="field" 
            placeholder="password" /> 

            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        </Formik>
    </>
  )
}

export default OwnerRegister
