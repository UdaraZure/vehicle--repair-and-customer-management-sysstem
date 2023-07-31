import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

function QuotationModal({ quotation, onClose }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/service/${quotation.JobID}/${quotation.QuotationID}`
        );
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, [quotation.JobID, quotation.QuotationID]);

  // Calculate the total amount of all services
  const totalAmount = services.reduce(
    (acc, service) => acc + parseInt(service.ServicePrice, 10),
    0
  );

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quotation Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Quotation ID:</b> {quotation.QuotationID}</p>
        <p><b>Job ID:</b> {quotation.JobID}</p>
        <p><b>Quotation Status:</b> {quotation.QuotationStatus}</p>
        <p><b>Quotation Description:</b> {quotation.JobDescription}</p>

        <h5>Services:</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service Description</th>
              <th>Service Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.ServiceDescription}</td>
                <td>Rs.{service.ServicePrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{fontWeight:"Bolder", color:"red"}}>
              <td>Total Amount:</td>
              <td>Rs.{totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuotationModal;
