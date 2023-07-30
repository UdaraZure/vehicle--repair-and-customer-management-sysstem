import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RepairJob.css";
import { Button, Modal, Table, Form } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RepairJob() {
  let { JobID } = useParams();
  const [jobData, setJobData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [serviceArray, setServiceArray] = useState([]);
  const [quotationCreated, setQuotationCreated] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Job/${JobID}`)
      .then((res) => {
        setJobData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [JobID]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/ServiceTypes`)
      .then((res) => {
        const options = res.data.map((ServiceType) => ({
          value: ServiceType.STName,
          label: ServiceType.STName,
          ServiceTypeID: ServiceType.ServiceTypeID,
        }));
        setServiceTypeOptions(options);
        console.log(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const updatedTableData = serviceArray.map((service) => ({
      serviceType: service.ServiceTypeID,
      description: service.Description,
      amount: service.Amount,
    }));
    setTableData(updatedTableData);
  }, [serviceArray]);
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddRecord = () => {
    if (!selectedServiceType) {
      console.log("Please select a service type.");
      return;
    }

    const newRecord = {
      serviceType: selectedServiceType.value,
      description: description,
      amount: amount,
    };

    const newQuotationService = {
      JobID: JobID,
      ServiceTypeID: selectedServiceType.ServiceTypeID,
      Description: description,
      Amount: amount,
    };

    // Use the callback form to update serviceArray
    setServiceArray((prevServiceArray) => [
      ...prevServiceArray,
      newQuotationService,
    ]);

    // Now log the updated serviceArray to check if it has been updated correctly
    console.log([...serviceArray, newQuotationService]);

    // Rest of the code remains the same
    setTableData([...tableData, newRecord]);
    setTotalAmount(totalAmount + Number(amount));
    setDescription("");
    setAmount(0);
    setSelectedServiceType(null);
  };

  const handleFinish = () => {
    const newQuotation = {
      EmployeeID: jobData[0].EmployeeID,
      JobID: JobID,
      Qamount: totalAmount,
      CreationDate: new Date().toISOString().slice(0, 10),
      QuotationStatus: "manager approval pending",
    };

    axios
      .post("http://localhost:3001/Quotation", newQuotation)
      .then((res) => {
        console.log(res.data);
        // After creating the quotation, send each service in serviceArray to the service table
        serviceArray.forEach((service) => {
          const newService = {
            QuotationID: res.data.QuotationID, // Use the QuotationID generated for the new quotation
            JobID: service.JobID,
            ServiceTypeID: service.ServiceTypeID,
            ServiceDescription: service.Description,
            ServicePrice: service.Amount,
          };

          console.log(newService);

          axios
            .post("http://localhost:3001/Service", newService)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });

        setShowModal(false);
        setQuotationCreated(true);
        toast("Quotation sent to manager for approval");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteRecord = (index) => {
    const recordToDelete = tableData[index];
    setTableData(tableData.filter((record) => record !== recordToDelete));
    setTotalAmount(totalAmount - Number(recordToDelete.amount));
  };

  const handleDeleteService = (index) => {
    const serviceToDelete = serviceArray[index];
    // Update the totalAmount by subtracting the deleted service's amount
    setTotalAmount(totalAmount - Number(serviceToDelete.Amount));
    // Use the callback form to update serviceArray
    setServiceArray((prevServiceArray) =>
      prevServiceArray.filter((service, i) => i !== index)
    );
  };
  
  

  return (
    <div>
      {jobData.map((job, index) => {
        return (
          <div className="jobdetails-card" key={index}>
            <h1>Repair Job Number: {JobID}</h1>
            <div className="jobcard-body">
              <div>Vehicle Number: {job.VehicleNumber}</div>
              <div>Description: {job.JobDescription}</div>
              <div>Service Type: {job.ServiceType}</div>
              <div>Created By: {job.EmployeeID}</div>
              <div>Created at: {job.JobCreationDate}</div>
              <div>Total Amount: {totalAmount}</div>
            </div>
            {!quotationCreated && (
              <button className="createQ-button" onClick={handleModalShow}>
                <p className="createQ-button-content">Create Quotation</p>
              </button>
            )}
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Quotation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <div>
                    <label htmlFor="serviceType">Service Type:</label>
                    <Select
                      id="serviceType"
                      options={serviceTypeOptions}
                      isSearchable={true}
                      onChange={(selectedOption) =>
                        setSelectedServiceType(selectedOption)
                      }
                    />
                  </div>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </Form.Group>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Service Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
  {tableData.map((record, index) => {
    return (
      <tr key={index}>
        <td>{record.serviceType}</td>
        <td>{record.description}</td>
        <td>{record.amount}</td>
        <td>
          <Button
            variant="danger"
            onClick={() => handleDeleteService(index)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  })}
</tbody>

                    <tfoot>
                      <tr>
                        <td colSpan="2">Total Amount:</td>
                        <td>{totalAmount}</td>
                      </tr>
                    </tfoot>
                  </Table>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddRecord}>
                  Add Record
                </Button>
                <Button variant="success" onClick={handleFinish}>
                  Finish
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      })}
    </div>
  );
}

export default RepairJob;