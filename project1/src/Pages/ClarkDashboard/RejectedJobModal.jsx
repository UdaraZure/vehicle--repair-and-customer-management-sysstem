import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

const ServiceRow = ({ service, handleUpdate, handleEdit, handleRemove }) => {
  const [editable, setEditable] = useState(false);

  return (
    <tr key={service.ServiceID}>
      <td contentEditable={editable}>{service.ServiceDescription}</td>
      <td contentEditable={editable}>{service.ServicePrice}</td>
      <td>
        {editable ? (
          <>
            <button onClick={() => handleUpdate(service.ServiceID)}>Update</button>
          </>
        ) : (
          <>
            <button onClick={() => handleEdit(service.ServiceID)}>Edit</button>
            <button onClick={() => handleRemove(service.ServiceID)}>Remove</button>
          </>
        )}
      </td>
    </tr>
  );
};

const RejectedJobModal = ({ show, onHide, job, services }) => {
  if (!job) {
    return null; // Return null if job is null or undefined
  }

  const handleEditService = (serviceId) => {
    // Implement your logic to handle editing a service
    
  };

  const handleUpdateService = (serviceId) => {
    // Implement your logic to handle updating a service
  };

  const handleRemoveService = (serviceId) => {
    // Implement your logic to handle removing a service
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rejected Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Job ID: {job.JobID}</p>
          <p>Quotation ID: {job.QuotationID}</p>
          <p>Created by: {job.EmployeeID}</p>
          <p>Job Description: {job.JobDescription}</p>
          <p>Status: {job.QuotationStatus}</p>

          <h4>Services:</h4>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Service Description</th>
                <th>Service Price</th>
                <th>Edit / Remove</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <ServiceRow
                  key={service.ServiceID}
                  service={service}
                  handleUpdate={handleUpdateService}
                  handleEdit={handleEditService}
                  handleRemove={handleRemoveService}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RejectedJobModal;
