import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./Quotation.css";

function Quotation() {
  const [services, setServices] = useState([]);

  const initialValues = {
    serviceName: "",
    price: "",
  };

  const onSubmit = (values, { resetForm }) => {
    const newService = {
      serviceName: values.serviceName,
      price: parseFloat(values.price),
    };
    setServices([...services, newService]);
    resetForm();
  };

  const calculateTotalPrice = () => {
    const total = services.reduce((acc, service) => acc + service.price, 0);
    return total.toFixed(2);
  };

  return (
    <div className="quotation-container">
      <h2>Quotation Form</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="quotation-form">
            <div className="service-input">
              <div className="form-group">
                <label htmlFor="serviceName">Service Name:</label>
                <Field
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  className="form-control"
                />
                <ErrorMessage
                  name="serviceName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (RS):</label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  className="form-control"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <button type="submit" className="btn-submit">
              Add Service
            </button>
          </Form>
        )}
      </Formik>

      {services.length > 0 && (
        <div className="service-section">
          <h2>Added Services:</h2>
          <div className="service-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <strong>Service: </strong> {service.serviceName},{" "}
                <strong>Price: </strong>RS {service.price.toFixed(2)}
              </div>
            ))}
          </div>
          <div className="total-price">
            <strong>Total Price:</strong> RS {calculateTotalPrice()}
          </div>
        </div>
      )}

      {services.length === 0 && (
        <div className="no-services">No services added yet.</div>
      )}
    </div>
  );
}

export default Quotation;
