import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClarkDashboard.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import { RepairJobCard } from "../../components/RepairJobCard";
import Autosuggest from "react-autosuggest";
import Select from 'react-select';

export default function ClarkDashboard() {
  const [employee, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [repairJobs, setRepairJobs] = useState([]);
  const [customerIds, setCustomerIds] = useState([]);
  const [value, setValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  const [loginState, setLoginState] = useState({
    username: "",
    Role: "",
    status: false,
    UserID: "",
  });

  const options = customerIds.map((customerId) => ({
    value: customerId,
    label: customerId,
  }));

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:3001/User/Authentication",
            {
              headers: {
                accessToken: accessToken,
              },
            }
          );

          if (response.data.error) {
            setLoginState({ ...loginState, status: false });
          } else {
            console.log(response.data);
            setLoginState({
              username: response.data.Email,
              Role: response.data.UserRole,
              status: true,
              UserID: response.data.UserID,
            });

            try {
              const employeeResponse = await axios.get(
                `http://localhost:3001/Employees/profile/${response.data.UserID}`
              );
              console.log("employee", employeeResponse.data);
              setEmployees(employeeResponse.data);
            } catch (error) {
              console.log("Error :", error);
            }
          }
        } catch (error) {
          console.error("Error authenticating user:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomerIds = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Customers");
        setCustomerIds(response.data.map((customer) => customer.CustomerID)); // Extract the list of customer IDs from the response data
      } catch (error) {
        console.error("Error fetching customer IDs:", error);
      }
    };

    fetchCustomerIds();
  }, []);

  const onSubmit = async (values) => {
    const data = {
      ...values,
      EmployeeID: loginState.UserID,
    };

    console.log(data);

    try {
      const response = await axios.post("http://localhost:3001/Job", data);
      console.log("Form data sent successfully:", response.data);
      handleCloseModal();
      setSubmitValue(loginState.UserID);
      setRepairJobs([...repairJobs, response.data]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEditInfo = () => {
    setEditedEmployee(employee);
    setEditMode(true);
  };

  const handleUpdateInfo = async () => {
    try {
      await axios.put(
        `http://localhost:3001/Employees/${employee.EmployeeID}`,
        editedEmployee
      );
      setEmployees(editedEmployee);
      setEditMode(false);
      setEditedEmployee(null);
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to get the suggestions for the customer ID field
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : customerIds.filter(
          (id) => id.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Function to render the suggestion
  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;
  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };
  const handleSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Repair Jobs</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first" className="Pcard">
                  <div className="Pcard-details">
                    <div className="pcaard-header">
                      Profile details of {employee && employee.EmpName}
                    </div>
                    <div className="Pcard-details">
                      <div>
                        Address:{" "}
                        {editMode ? (
                          <input
                            type="text"
                            value={editedEmployee?.Address || ""}
                            onChange={(e) =>
                              setEditedEmployee({
                                ...editedEmployee,
                                Address: e.target.value,
                              })
                            }
                          />
                        ) : (
                          employee && employee.Address
                        )}
                      </div>
                      <div>
                        TelNo:{" "}
                        {editMode ? (
                          <input
                            type="text"
                            value={editedEmployee?.TelNo || ""}
                            onChange={(e) =>
                              setEditedEmployee({
                                ...editedEmployee,
                                TelNo: e.target.value,
                              })
                            }
                          />
                        ) : (
                          employee && employee.TelNo
                        )}
                      </div>
                      <div>
                        NIC:{" "}
                        {editMode ? (
                          <input
                            type="text"
                            value={editedEmployee?.NIC || ""}
                            onChange={(e) =>
                              setEditedEmployee({
                                ...editedEmployee,
                                NIC: e.target.value,
                              })
                            }
                          />
                        ) : (
                          employee && employee.NIC
                        )}
                      </div>
                      <div>StartDate: {employee && employee.StartDate}</div>
                      <div>Status: {employee && employee.Status}</div>
                    </div>
                  </div>
                  {!editMode && (
                    <button className="Pcard-button" onClick={handleEditInfo}>
                      Edit info
                    </button>
                  )}
                  {editMode && (
                    <button className="Pcard-button" onClick={handleUpdateInfo}>
                      Update
                    </button>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <div>
                    <button onClick={handleShowModal}>Create Repair job</button>
                  </div>
                  <div>
                    <div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by Job ID"
                      />
                    </div>
                  </div>
                  <div>
                    <RepairJobCard
                      searchQuery={searchQuery}
                      value={submitValue}
                      repairJobs={repairJobs}
                      setRepairJobs={setRepairJobs}
                    />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Repair Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              CustomerID: "",
              VehicleNumber: "",
              Model: "",
              ServiceType: "",
              JobDescription: "",
            }}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="CustomerID">Customer ID:</label>
                  <Select
                  options={options}
                  value={options.find((option) => option.value === value)}
                  onChange={(selectedOption) => setValue(selectedOption.value)}
                  placeholder="Enter Customer ID"
                />
                  <ErrorMessage
                    name="CustomerID"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="VehicleNumber">Vehicle Number:</label>
                  <Field
                    type="text"
                    id="VehicleNumber"
                    name="VehicleNumber"
                    required
                  />
                  <ErrorMessage
                    name="VehicleNumber"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Model">Vehicle Model:</label>
                  <Field type="text" id="Model" name="Model" required />
                  <ErrorMessage
                    name="Model"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ServiceType">Service Type:</label>
                  <Field
                    type="text"
                    id="ServiceType"
                    name="ServiceType"
                    required
                  />
                  <ErrorMessage
                    name="ServiceType"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="JobDescription">Job Description:</label>
                  <Field
                    as="textarea"
                    id="JobDescription"
                    name="JobDescription"
                    required
                  />
                  <ErrorMessage
                    name="JobDescription"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
