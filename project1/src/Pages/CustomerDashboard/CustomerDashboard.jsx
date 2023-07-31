import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./CustomerDashboard.css";
import axios from "axios"; // Import Axios
import { useState, useEffect } from "react"; // Import UseState and UseEffect
import jwt_decode from "jwt-decode"; // Import jwt_decode

function CustomerDashboard() {
  // State to hold customer details
  const [customerDetails, setCustomerDetails] = useState([]);

  // Function to get user ID from access token
  const accessToken = localStorage.getItem("accessToken");
  const token = jwt_decode(accessToken);
  const UserID = token.UserID;

  console.log(UserID);

  const getCustomerDetails = (userID) => {
    console.log(token.UserID);
    axios
      .get(`http://localhost:3001/Customers/CustomerDetails/${token.UserID}`)
      .then((response) => {
        setCustomerDetails(response.data);

        console.log(response.data);
      })

      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };

  useEffect(() => {
    getCustomerDetails(UserID);
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

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
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="Profile-card">
                    <div className="Profile-card-details">
                      <p className="text-title">Welcome {value.CusName} </p>
                      <p className="text-body">
                        <strong>Customer ID:</strong> {value.CustomerID} <br />
                        <strong>Address:</strong> {value.Address} <br />
                        <strong>Phone Number:</strong> {value.TelNo} <br />
                        <strong>NIC:</strong> {value.NIC} <br />
                        <strong>Email:</strong> {value.Email} <br />
                        
                      </p>
                    </div>
                    <a className="Profile-card-button" href="#link">
                      Edit Profile
                    </a>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
              </Tab.Content>
            );
          })}
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default CustomerDashboard;
