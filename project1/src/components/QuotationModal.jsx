import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function QuotationModal({ quotation, onClose }) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quotation Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Quotation ID: {quotation.QuotationID}</p>
        <p>Job ID: {quotation.JobID}</p>
        <p>Customer Name: {quotation.CustomerName}</p>
        <p>Customer Email: {quotation.CustomerEmail}</p>
        <p>Quotation Status: {quotation.QuotationStatus}</p>
        <p>Manager ID: {quotation.ManagerID}</p>
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