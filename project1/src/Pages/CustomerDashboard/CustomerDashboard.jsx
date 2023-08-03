import React, { useState, useEffect,useRef } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./CustomerDashboard.css";
import JobTable from "./JobTable"; // Import the JobTable component
import Modal from "react-bootstrap/Modal";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useReactToPrint } from "react-to-print";


import axios from "axios";
import jwt_decode from "jwt-decode";

function CustomerDashboard() {  
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editedDetails, setEditedDetails] = useState({}); // State to store edited details
  const [selectedJob, setSelectedJob] = useState(null);
  const [services, setServices] = useState([]);
  const [Qamount, setQamount] = useState();
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Userdata",
    // onAfterPrint: () => alert("Data Saved in PDF"),
  });
  
  // Function to fetch services for a specific repair job
  const fetchServices = (jobID, quotationID) => {
    axios
      .get(`http://localhost:3001/Service/${jobID}/${quotationID}`)
      .then((response) => {
        
        setServices(response.data);

        let qAmount = 0;
        [(response.data)].forEach((row) => {
      row.forEach((service) => {
        qAmount += parseInt(service.ServicePrice, 10); // Parse string as integer
      });
    });

   
    setQamount(qAmount);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  
    axios
      .get(`http://localhost:3001/Quotation/getQuotations/${jobID}`)
      .then((response) => {
        
        console.log(response.data.Qamount);
console.log(services);
        


        
      })
      .catch((error) => {
        console.error("Error fetching quotation:", error);
      });
  };
  
  // Function to handle when a "Pending Customer Approval" record is clicked
  const handleJobClick = (job) => {
    if (job.Status === "Pending Customer Approval") {
      setSelectedJob(job);
      fetchServices(job.JobID, job.QuotationID);
    }
  };

  // Function to clear the selected job and services when the modal is closed
  const handleModalClose = () => {
    setSelectedJob(null);
    setServices([]);
  };

  // Function to get user ID from access token
  const accessToken = localStorage.getItem("accessToken");
  const token = jwt_decode(accessToken);
  const UserID = token.UserID;

  const getCustomerDetails = (userID) => {
    axios
      .get(`http://localhost:3001/Customers/CustomerDetails/${userID}`)
      .then((response) => {
        setCustomerDetails(response.data);
        setEditedDetails(response.data[0]); // Set editedDetails to fetched data
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };

  const handleEditProfile = () => {
    setIsEditable(true);
  };

  const handleUpdateProfile = () => {
    axios
      .put(`http://localhost:3001/Customers/CustomerDetails/${UserID}`, editedDetails)
      .then((response) => {
        setIsEditable(false); // Exit edit mode after successful update
        setCustomerDetails([editedDetails]); // Update customerDetails with edited data
        console.log("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating customer details:", error);
      });
  };

  useEffect(() => {
    getCustomerDetails(UserID);
  }, [UserID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleAcceptQuotation = async() => {

    await axios.put(
      `http://localhost:3001/Quotation/${selectedJob.QuotationID}`,
      {
        QuotationStatus: "Repair In Progress",
      }
    );

    await axios.put(
      `http://localhost:3001/Job/updateJobStatus/${selectedJob.QuotationID}`,
      {
        Status: "Repair In Progress",
      }
    );
    
  };

  const handleRejectQuotation = async() => {
    await axios.put(
      `http://localhost:3001/Quotation/${selectedJob.QuotationID}`,
      {
        QuotationStatus: "Job Terminated",
      }
    );

    await axios.put(
      `http://localhost:3001/Job/updateJobStatus/${selectedJob.QuotationID}`,
      {
        Status: "Job Terminated",
      }
    );
  };

 


  

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">My Repair Jobs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          {customerDetails.map((value, key) => {
            return (
              <Tab.Content key={key}>
                <Tab.Pane eventKey="first">
                  <div className="Profile-card">
                    <div className="Profile-card-details">
                      <p className="text-title">Welcome {value.CusName} </p>
                      <p className="text-body">
                        <strong>Customer ID:</strong> {value.CustomerID} <br />
                        <strong>Address:</strong>{" "}
                        {isEditable ? (
                          <input
                            type="text"
                            name="Address"
                            value={editedDetails.Address || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          value.Address
                        )}{" "}
                        <br />
                        <strong>Phone Number:</strong>{" "}
                        {isEditable ? (
                          <input
                            type="text"
                            name="TelNo"
                            value={editedDetails.TelNo || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          value.TelNo
                        )}{" "}
                        <br />
                        <strong>NIC:</strong>{" "}
                        {isEditable ? (
                          <input
                            type="text"
                            name="NIC"
                            value={editedDetails.NIC || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          value.NIC
                        )}{" "}
                        <br />
                        <strong>Email:</strong> {value.Email} <br />
                      </p>
                    </div>
                    {isEditable ? (
                      <button className="Profile-card-button" onClick={handleUpdateProfile}>
                        Update Profile
                      </button>
                    ) : (
                      <button className="Profile-card-button" onClick={handleEditProfile}>
                        Edit Profile
                      </button>
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                <JobTable customerID={value.CustomerID} handleJobClick={handleJobClick} />

                </Tab.Pane>
              </Tab.Content>
            );
          })}
        </Col>
      </Row>
      
      <Modal show={selectedJob !== null} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Services for Job ID: {selectedJob && selectedJob.JobID}</Modal.Title>
        </Modal.Header>
        <div ref={componentPDF} style={{ width: "100%" }}>
        <Modal.Body>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", border: "1px solid #ddd", fontSize: "14px" }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Job ID:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.JobID}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Employee ID:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.EmployeeID}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Customer ID:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.CustomerID}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Vehicle Number:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.VehicleNumber}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Service Type:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.ServiceType}</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Job Description:</strong></td>
          <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{selectedJob && selectedJob.JobDescription}</td>
        </tr>
      </tbody>
    </table>

  {services.length > 0 ? (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", border: "1px solid #ddd", fontSize: "14px" }}>
  <thead>
    <tr>
      <th style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Service Description</th>
      <th style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>Service Price</th>
    </tr>
  </thead>
  <tbody>
    {services.map((service) => (
      <tr key={service.serviceID}>
        <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{service.ServiceDescription}</td>
        <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{service.ServicePrice}</td>
      </tr>
    ))}
    <tr>
      <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}><strong>Total is </strong></td>
      <td><strong>{Qamount}</strong></td>
    </tr>
  </tbody>
</table>

  ) : (
    <p>No services found.</p>
  )}
</Modal.Body>
</div>

<Modal.Footer>
  <button onClick={handleAcceptQuotation}>Accept</button>
  <button onClick={handleRejectQuotation}>Reject</button>
  <button onClick={generatePDF}>Generate PDF</button>

</Modal.Footer>
      </Modal>
      
    </Tab.Container>
  );
}

export default CustomerDashboard;
