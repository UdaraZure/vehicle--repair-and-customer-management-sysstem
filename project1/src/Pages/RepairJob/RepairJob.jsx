import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RepairJob.css";
import { Button, Modal, Table, Form } from "react-bootstrap";
import Select from "react-select";

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
        }));
        setServiceTypeOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  

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
    const newRecord = {
      serviceType: selectedServiceType.value,
      description: description,
      amount: amount,
    };
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
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
            </div>
            <button className="createQ-button" onClick={handleModalShow}>
              <p className="createQ-button-content">Create Quotation</p>
            </button>
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
