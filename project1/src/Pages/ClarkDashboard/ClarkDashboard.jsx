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
// import { useNavigate } from "react-router-dom";

export default function ClarkDashboard() {
  const [employee, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [editMode, setEditMode] = useState(false); // New state variable for edit mode
  const [editedEmployee, setEditedEmployee] = useState(null); // New state variable for edited values
  const [searchQuery, setSearchQuery] = useState("");
  const [repairJobs, setRepairJobs] = useState([]); // New state variable for repair jobs

  const [submitValue,setSubmitValue] = useState("");

  // let navigate = useNavigate();	


  const [loginState, setLoginState] = useState({
    username: "",
    Role: "",
    status: false,
    UserID: "",
  });

  

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          const response = await axios.get("http://localhost:3001/User/Authentication", {
            headers: {
              accessToken: accessToken,
            },
          });

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
              const employeeResponse = await axios.get(`http://localhost:3001/Employees/profile/${response.data.UserID}`);
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
  }, []); // Make sure to pass an empty dependency array to run this effect only once on mount

  const onSubmit = async (values) => {
    const data = {
      ...values,
      EmployeeID: loginState.UserID,
    };

    console.log(data);

    try {
      const response = await axios
      .post("http://localhost:3001/Job", data);
      console.log("Form data sent successfully:", response.data);
      handleCloseModal(); // Close the modal after successful form submission
setSubmitValue(loginState.UserID)
      setRepairJobs([...repairJobs, response.data]);

      

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEditInfo = () => {
    setEditedEmployee(employee); // Store the current employee data in editedEmployee state
    setEditMode(true); // Enable edit mode
  };

  // Function to handle the "Update" button click
  const handleUpdateInfo = async () => {
    try {
      // Make an API call to update the employee data in the database using editedEmployee state
      await axios
      
      .put(`http://localhost:3001/Employees/${employee.EmployeeID}`, editedEmployee);

      // Update the employee state with the edited values
      setEmployees(editedEmployee);

      // Exit edit mode and clear the editedEmployee state
      setEditMode(false);
      setEditedEmployee(null);
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
                      <div>Address: {editMode ? <input type="text" value={editedEmployee?.Address || ""} onChange={(e) => setEditedEmployee({ ...editedEmployee, Address: e.target.value })} /> : (employee && employee.Address)}</div>
                      <div>TelNo: {editMode ? <input type="text" value={editedEmployee?.TelNo || ""} onChange={(e) => setEditedEmployee({ ...editedEmployee, TelNo: e.target.value })} /> : (employee && employee.TelNo)}</div>
                      <div>NIC: {editMode ? <input type="text" value={editedEmployee?.NIC || ""} onChange={(e) => setEditedEmployee({ ...editedEmployee, NIC: e.target.value })} /> : (employee && employee.NIC)}</div>
                      <div>StartDate: {employee && employee.StartDate}</div>
                      <div>Status: {employee && employee.Status}</div>
                    </div>
                  </div>
                  {!editMode && <button className="Pcard-button" onClick={handleEditInfo}>Edit info</button>}
                  {editMode && <button className="Pcard-button" onClick={handleUpdateInfo}>Update</button>}
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <div>
                    <button onClick={handleShowModal}>Create Repair job</button>
                  </div>
                  <div>
                    <div>
                      {/* Add the search bar */}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by Job ID"
                      />
                    </div>
                  </div>
                  <div>
                    {/* Pass the searchQuery to the RepairJobCard component */}
            <RepairJobCard 
            searchQuery={searchQuery} 
            value ={submitValue} 
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
          {/* Repair Job Form */}
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
            <Form>
            <div className="form-group">
                <label htmlFor="CustomerID">Customer ID:</label>
                <Field type="text" id="CustomerID" name="CustomerID" required />
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
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
