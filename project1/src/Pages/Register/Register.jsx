import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import Navigationbar from '../../components/NavBar';

export default function Register() {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
    <Navigationbar />
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="form">
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our services.</p>
          <div className="flex">
            <label>
              <Field type="text" name="firstname" placeholder="" className="input-register" />
              <span>Firstname</span>
            </label>

            <label>
              <Field type="text" name="lastname" placeholder="" className="input-register" />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <Field type="email" name="email" placeholder="" className="input-register" />
            <span>Email</span>
            <ErrorMessage name="email" component="div" className="error-message" />
          </label>

          <label>
            <Field type="password" name="password" placeholder="" className="input-register" />
            <span>Password</span>
            <ErrorMessage name="password" component="div" className="error-message" />
          </label>

          <label>
            <Field type="password" name="confirmPassword" placeholder="" className="input-register" />
            <span>Confirm password</span>
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </label>

          <button type="submit" className="submit" >
            Submit
          </button>

          <p className="signin">
            Already have an account? <a href="http://localhost:3000/Customers/login" target="_blank">log in</a>
          </p>
        </Form>
      </Formik>
    </>
  );
}
