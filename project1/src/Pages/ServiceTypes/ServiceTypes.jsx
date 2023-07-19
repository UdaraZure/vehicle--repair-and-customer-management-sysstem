import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './ServiceTypes.css';
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from '../../components/NavBar';


function ServiceTypes() {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [editID, setEditID] = useState(-1);
  const [editedValues, setEditedValues] = useState({ STName: '', STDescription: '' });
  const [response, setResponse] = useState()

  const initialValues = {
    STName: '',
    STDescription: '',
  };

  const validationSchema = Yup.object().shape({
    STName: Yup.string().min(5).max(50).required('You must input a Name'),
    STDescription: Yup.string().max(100).required('You must input a Description'),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post('http://localhost:3001/serviceTypes', values, {
        // headers: {
        //   accessToken: localStorage.getItem('accessToken'),
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
      .get('http://localhost:3001/serviceTypes')
      .then((response) => {
        const { data } = response;
        if (data && data.length > 0) {
          setServiceTypes(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching serviceTypes:', error);
      });
  }, [response]);



  const handleEdit = (id) => {
    // Show confirmation popup
    const confirmUpdate = window.confirm('Are you sure you want to update this serviceType?');
    if (!confirmUpdate) {
      return;
    }
    setEditID(id);
  };

  const handleUpdate = (id, updatedServiceType) => {

    
    axios
      .put(`http://localhost:3001/serviceTypes/${id}`, updatedServiceType)
      .then((response) => {
        console.log('serviceType updated successfully');
        setEditID(-1); // Reset the edit ID to exit edit mode
        setServiceTypes((prevServiceTypes) =>
          prevServiceTypes.map((serviceType) => (serviceType.ServiceTypeID === id ? updatedServiceType : serviceType))
        );
      })
      .catch((error) => {
        console.log('Error updating serviceType:', error);
      });
  };
  
  const handleDelete = (id) => {

    // Show confirmation popup
    const confirmDelete = window.confirm('Are you sure you want to delete this serviceType?');
    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`http://localhost:3001/serviceTypes/${id}`)
      .then((response) => {
        console.log('serviceType deleted successfully');
        setServiceTypes((prevServiceTypes) => prevServiceTypes.filter((serviceType) => serviceType.ServiceTypeID !== id));
      })
      .catch((error) => {
        console.log('Error deleting service Type:', error);
      });
  };
  
  

  const handleInputChange = (e, fieldName, index) => {
    const { value } = e.target;
    const updatedServiceTypes = [...serviceTypes];
    updatedServiceTypes[index][fieldName] = value;
    setServiceTypes(updatedServiceTypes);
  };

  return (
    <>
      <Navbar />	
      <div className="ServiceTypeContainer">
        
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="form-container">
          <p style={{fontSize:"20px", fontWeight:"bold"}}>Service Types</p>
            <label className="label">Name:</label>
            <ErrorMessage name="STName" component="span" />
            <Field id="InputServiceType" name="STName" className="field" placeholder="STName..." />

            <label className="label">Description:</label>
            <ErrorMessage name="STDescription" component="span" />
            <Field id="InputServiceType" name="STDescription" className="field" placeholder="STDescription" />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </Form>
        </Formik>
      </div>

      <div>
        <table className="serviceType-table">
          <thead>
            <tr>
              <th className='table-head'>serviceType ID</th>
              <th className='table-head'>STName</th>
              <th className='table-head'>STDescription</th>
              <th className='table-head'>Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceTypes.map((serviceType, index) =>
              serviceType.ServiceTypeID === editID ? ( 
                <tr key={serviceType.ServiceTypeID}>
                  <td>{serviceType.ServiceTypeID}</td>
                  <td>
                    <input
                      type="text"
                      value={serviceTypes[index].STName}
                      onChange={(e) => handleInputChange(e, 'STName', index)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={serviceTypes[index].STDescription}
                      onChange={(e) => handleInputChange(e, 'STDescription', index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(serviceType.id, serviceTypes[index])}>Update</button>
                  </td>
                </tr>
              ) : (
                <tr key={serviceType.id}>
                  <td>{serviceType.ServiceTypeID}</td>
                  <td>{serviceType.STName}</td>
                  <td>{serviceType.STDescription}</td>
                  <td>
                    <button onClick={() => handleEdit(serviceType.ServiceTypeID)}>Edit</button>
                    <button onClick={() => handleDelete(serviceType.ServiceTypeID)}>Delete</button>
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
