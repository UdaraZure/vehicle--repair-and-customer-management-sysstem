import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./CustomerDashboard.css";
import JobTable from "./JobTable"; // Import the JobTable component

import axios from "axios";
import jwt_decode from "jwt-decode";

function CustomerDashboard() {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editedDetails, setEditedDetails] = useState({}); // State to store edited details

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

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
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
                <JobTable customerID={value.CustomerID} />

                </Tab.Pane>
              </Tab.Content>
            );
          })}
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default CustomerDashboard;
