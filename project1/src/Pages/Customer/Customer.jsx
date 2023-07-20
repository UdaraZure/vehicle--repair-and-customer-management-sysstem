import React, { useState, useEffect } from 'react'; 
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Customer.css';
import Navigationbar from '../../components/NavBar';
import axios from 'axios'; 
import{useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Customer() {

  const [editedValues, setEditedValues] = useState({ Title: '', Description: '' });
  const [response, setResponse] = useState();
  let navigate = useNavigate();

  const initialValues = {
    CusName: '',
    Address: '',
    TelNo: '',
    Email:'',
    NIC:'',
    Password:'',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    CusName: Yup.string().required('First name is required'),
    Address: Yup.string().required('Address is required'),
    TelNo: Yup.string()
    .required('Telephone number is required')
    .test('telNo', 'Invalid Telephone number format', (value) => {
      // Custom validation function
      if (!value) {
        return false; // Fail validation if the value is empty
      }
      // Check if the TelNo starts with "07" and contains 8 other digits
      return /^07\d{8}$/.test(value);
    }),
    Email: Yup.string()
    .email('Invalid email format')
    .required('Must Enter the email'),
    NIC: Yup.string()
    .required('You must input your NIC')
    .test('nic-validation', 'Invalid NIC format', (value) => {
      if (!value) {
        return false; // Fail validation if the value is empty
      }

      // Check if the NIC matches the format of 9 digits followed by 'V' or 'X'
      const nicPattern1 = /^[0-9]{9}[VX]$/;

      // Check if the NIC consists of 12 unique digits
      const nicPattern2 = /^\d{12}$/;

      return nicPattern1.test(value) || nicPattern2.test(value);
    }),
    Password: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('Password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
  const onSubmit = (values, { resetForm }) => {
    // Show a popup message
  // const successMessage = document.createElement('div');
  // successMessage.className = 'popup-message';
  // successMessage.textContent = 'Customer Account Created. You will be redirected to the login page';
  // document.body.appendChild(successMessage);

  // Redirect to the login page after two seconds
  setTimeout(() => {
    // successMessage.remove();
    navigate("/Customers/login");
  }, 3000);

  // Submit the form
    axios
      .post('http://localhost:3001/Customers', values, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        }
      })
      .then((response) => {
        setResponse(response.data);
        console.log('success');
        toast.success('Customer Account Created. You will be redirected to the login page');
        resetForm();
        
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
     
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:3001/Customers')
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
        Customer(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  }, [response]);

  return (
    <>
    <Navigationbar />
    <div className='register-body'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="form">
          <p className="title">Customer Registration</p>
          <p className="message">Signup now and get full access to our services.</p>
         
          <label>
            <Field type="text" name="CusName" placeholder="" className="input-customer" />
            <span>Full Name</span>
            <ErrorMessage name="CusName" component="div" className="error-message" />
          </label>

          <label>
            <Field type="text" name="Email" placeholder="" className="input-customer" />
            <span>Email</span>
            <ErrorMessage name="Email" component="div" className="error-message" />
          </label>

          <label>
            <Field type="text" name="TelNo" placeholder="" className="input-customer" />
            <span>Telephone Number</span>
            <ErrorMessage name="TelNo" component="div" className="error-message" />
          </label>

          <label>
            <Field type="text" name="NIC" placeholder="" className="input-customer" />
            <span>NIC</span>
            <ErrorMessage name="NIC" component="div" className="error-message" />
          </label>

          <label>
            <Field type="text" name="Address" placeholder="" className="input-customer" />
            <span>Address</span>
            <ErrorMessage name="Address" component="div" className="error-message" />
          </label>

          <label>
            <Field type="Password" name="Password" placeholder="" className="input-customer" />
            <span>Password</span>
            <ErrorMessage name="Password" component="div" className="error-message" />
          </label>

          <label>
            <Field type="Password" name="confirmPassword" placeholder="" className="input-customer" />
            <span>Confirm Password</span>
            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
          </label>

          <button type="submit" className="submit" >
            Submit
          </button>
          <ToastContainer position="top-center" autoClose={3000} />

          <p className="signin">
            Already have an account? <a href="http://localhost:3000/Customers/login" target="_blank">log in</a>
          </p>
        </Form>
      </Formik>
      </div>
      
    </>
  );
}
