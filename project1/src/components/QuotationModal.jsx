import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

function QuotationModal({ quotation, onClose }) {
  const [services, setServices] = useState([]);
  // Add this state to store the feedback text
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false); // Define the showFeedback state

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

  const handleAccept = async () => {
    try {
      // Update the job status in the database
      await axios.put(`http://localhost:3001/Job/${quotation.JobID}`, {
        Status: "Manager Approved",
      });

      await axios.put(`http://localhost:3001/Quotation/${quotation.QuotationID}`, {
        QuotationStatus: "Manager Approved",
      });

      // Display a success message
      alert("Quotation acceptance successful.");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    if (quotation.RejectedTimes === "1") {
      try {
        // Update the job status in the database
        await axios.put(`http://localhost:3001/job/${quotation.JobID}`, {
          Status: "Manager Rejected Twice",
        });

        await axios.put(`http://localhost:3001/Quotation/${quotation.QuotationID}`, {
          QuotationStatus: "Manager Rejected Twice",
          RejectedTimes: "2",
        });

        // Send the feedback to the database
        await axios.put(`http://localhost:3001/Quotation/${quotation.QuotationID}/Feedback2`, {
          Feedback2: feedbackText, // The feedback text entered in the textarea
        });

        // Display a success message
        alert("Quotation rejection successful.");
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else if(quotation.RejectedTimes === null) {
      try {
        // Update the job status in the database
        await axios.put(`http://localhost:3001/job/${quotation.JobID}`, {
          Status: "Manager Rejected Once",
        });

        await axios.put(`http://localhost:3001/Quotation/${quotation.QuotationID}`, {
          QuotationStatus: "Manager Rejected Once",
          RejectedTimes: "1",
        });

        // Send the feedback to the database
        await axios.put(`http://localhost:3001/Quotation/${quotation.QuotationID}/Feedback1`, {
          Feedback1: feedbackText, // The feedback text entered in the textarea
        });

        setShowFeedback(true); // Set the showFeedback state to true
        console.log(showFeedback);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quotation Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Quotation ID:</b> {quotation.QuotationID}
        </p>
        <p>
          <b>Job ID:</b> {quotation.JobID}
        </p>
        <p>
          <b>Quotation Status:</b> {quotation.QuotationStatus}
        </p>
        <p>
          <b>Quotation Description:</b> {quotation.JobDescription}
        </p>

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
                <td>{service.ServiceDescription} </td>
                <td>Rs.{service.ServicePrice}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ fontWeight: "Bolder", color: "red" }}>
              <td>Total Amount:</td>
              <td>Rs.{totalAmount}</td>
            </tr>
          </tfoot>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAccept}>
          Accept
        </Button>
        <Button variant="danger" onClick={handleReject}>
          Reject
        </Button>

        {showFeedback && ( // Use the showFeedback state to conditionally render the feedback form
          <div>
            <h5>Provide your feedback:</h5>
            <textarea
              rows="4"
              cols="60"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
            <div>
              <Button variant="primary" onClick={handleReject}>
                Send
              </Button>
            </div>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default QuotationModal;
