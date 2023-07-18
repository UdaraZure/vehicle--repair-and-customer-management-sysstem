import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from '../../components/NavBar';
import './ServiceTypes.css';


function ServiceTypes() {
  const [ServiceTypes, setServiceTypes] = useState([]);
  const [editID, setEditID] = useState(-1);
  const [editedValues, setEditedValues] = useState({ Title: '', Description: '' });
  const [response, setResponse] = useState()

  const initialValues = {
    STName: '',
    STDescription: '',
  };

  const validationSchema = Yup.object().shape({
    STName: Yup.string().min(5).max(50).required('You must input a title'),
    STDescription: Yup.string().max(100).required('You must input a description'),
  });

  const onSubmit = (values, { resetForm }) => {
    console.log('Form data:', values);
    axios
      .post('http://localhost:3001/ServiceTypes', values, {
        // headers: {
        //   // accessToken: localStorage.getItem('accessToken'),
        // }
      })
      .then((response) => {
        setResponse(response.data);
        console.log('success');
        resetForm();
        // window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };
  

  useEffect(() => {
    axios
      .get('http://localhost:3001/ServiceTypes')
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setServiceTypes(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching ServiceTypes:', error);
      });
  }, [response]);



  const handleEdit = (id) => {
    setEditID(id);
  };

  const handleUpdate = (id, updatedServiceType) => {
    axios
      .put(`http://localhost:3001/ServiceTypes/${id}`, updatedServiceType)
      .then((response) => {
        console.log('Service Type updated successfully');
        setEditID(-1); // Reset the edit ID to exit edit mode
        setServiceTypes((prevServiceTypes) =>
          prevServiceTypes.map((ServiceType) => (ServiceType.ServiceTypeID === id ? updatedServiceType : ServiceType))
        );
      })
      .catch((error) => {
        console.log('Error updating Service Type:', error);
      });
  };
  
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/ServiceTypes/${id}`)
      .then((response) => {
        console.log('Service Type deleted successfully');
        setServiceTypes((prevServiceTypes) => prevServiceTypes.filter((ServiceType) => ServiceType.ServiceTypeID !== id));
      })
      .catch((error) => {
        console.log('Error deleting Service Type:', error);
      });
  };
  
  

  const handleInputChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedServiceTypes = [...ServiceTypes];
    updatedServiceTypes[index][fieldName] = value;
    setServiceTypes(updatedServiceTypes);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Navbar />	
      <div className="ServiceTypeContainer">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="form-container">
          <p style={{fontSize:"20px", fontWeight:"bold"}}>Service Types</p>

            <label className="label">Service Type Name:</label>
            <ErrorMessage name="STName" component="span" />
            <Field id="InputServiceType" name="STName" className="field" placeholder="Name..." />

            <label className="label">Description:</label>
            <ErrorMessage name="STDescription" component="span" />
            <Field id="InputServiceType" name="STDescription" className="field" placeholder="Description" />

            
            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      <div>
        <table className="ServiceType-table">
          <thead>
            <tr>
              <th className='table-head'>ServiceType ID</th>
              <th className='table-head'>Name</th>
              <th className='table-head'>Description</th>
              <th className='table-head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {ServiceTypes.map((ServiceType, index) =>
              ServiceType.ServiceTypeID === editID ? (
                <tr key={ServiceType.ServiceTypeID}>
                  <td>{ServiceType.ServiceTypeID}</td>
                  <td>
                    <input
                      type="text"
                      value={ServiceTypes[index].Title}
                      onChange={(e) => handleInputChange(e, 'STName', index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ServiceTypes[index].Description}
                      onChange={(e) => handleInputChange(e, 'STDescription', index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(ServiceType.id, ServiceTypes[index])}>Update</button>
                  </td>

                </tr>
              ) : (
                <tr key={ServiceType.id}>
                  <td>{ServiceType.ServiceTypeID}</td>
                  <td>{ServiceType.STName}</td>
                  <td>{ServiceType.STDescription}</td>
                  <td>
                    <button onClick={() => handleEdit(ServiceType.ServiceTypeID)}>Edit</button>
                    <button onClick={() => handleDelete(ServiceType.ServiceTypeID)}>Delete</button>
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

export default ServiceTypes;
