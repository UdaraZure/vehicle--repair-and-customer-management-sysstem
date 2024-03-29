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
import Select from "react-select";
import jwtDecode from "jwt-decode";


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
  const [jobs, setJobs] = useState([]);
  const [ApprovedRepairJobs, setApprovedRepairJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [services, setServices] = useState([]);
  const [editingServiceID, setEditingServiceID] = useState(null);
  const [selectedJobServices, setSelectedJobServices] = useState([]);
  const [showServiceModal, setShowServiceModal] = useState(false);



  const [selectedService, setSelectedService] = useState(null);

  const [editableService, setEditableService] = useState({
    ServiceDescription: "",
    ServicePrice: "",
  });

  const [loginState, setLoginState] = useState({
    username: "",
    Role: "",
    status: false,
    UserID: "",
  });

  function formatDate(dateString) {
    if (!dateString) return ''; // Return an empty string if the dateString is not provided or is falsy
  
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad the day with '0' if needed
  
    return `${year}/${month}/${day}`;
  }
  

  const options = customerIds.map((customerId) => ({
    value: customerId,
    label: customerId,
  }));

  const handleEditService = (service) => {
    setSelectedService(service);
    setEditingServiceID(service.id);
    setEditableService({
      ServiceDescription: service.ServiceDescription,
      ServicePrice: parseFloat(service.ServicePrice), // Convert ServicePrice to a number
    });
  };

  const handleUpdateService = async (service) => {
    try {
      // Make an API call to update the service in the database
      await axios.put(`http://localhost:3001/Service/${service.id}`, {
        ServiceDescription: editableService.ServiceDescription,
        ServicePrice: parseFloat(editableService.ServicePrice),
      });

      // Update the services state with the updated service details
      setServices((prevServices) =>
        prevServices.map((prevService) =>
          prevService.id === service.id
            ? {
                ...prevService,
                ServiceDescription: editableService.ServiceDescription,
                ServicePrice: editableService.ServicePrice,
              }
            : prevService
        )
      );

      // Clear the editing state variables
      setEditingServiceID(null);
      setEditableService({
        ServiceDescription: "",
        ServicePrice: "",
      });
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleRemoveService = async (service) => {
    try {
      // Make an API call to remove the service from the database
      await axios.delete(`http://localhost:3001/Service/${service.id}`);

      // Update the services state by removing the deleted service
      setServices((prevServices) =>
        prevServices.filter((prevService) => prevService.id !== service.id)
      );

      // Clear the editing state variables
      setEditingServiceID(null);
      setEditableService({
        ServiceDescription: "",
        ServicePrice: "",
      });
    } catch (error) {
      console.error("Error removing service:", error);
    }
  };

 
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  const userID = decodedToken.UserID;

  useEffect(() => {
    const fetchRejectedJobs = async () => {
      try {
        // Retrieve all job records from the database
        const response = await axios.get("http://localhost:3001/Quotation");
  
        // Filter the job records based on the userID and Status values
        const filteredJobs = response.data.filter(
          (quotation) =>
            (quotation.QuotationStatus === "Manager Rejected Once" ||
              quotation.QuotationStatus === "Manager Rejected Twice") &&
            quotation.EmployeeID === userID
        );
  
        setJobs(filteredJobs);
  
        // Fetch the service data for the selected job
        if (filteredJobs.length > 0) {
          const selectedJob = filteredJobs[0]; // Assuming the first job in the filtered list is the selected one
          const serviceResponse = await axios.get(
            `http://localhost:3001/service/${selectedJob.JobID}/${selectedJob.QuotationID}`
          );
          setServices(serviceResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchRejectedJobs();

    const fetchApprovedRepairJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Quotation`
        );
        
        const approvedJobs = response.data.filter(
          (quotation) =>
            (quotation.QuotationStatus === "Repair In Progress") &&
            quotation.EmployeeID === userID
        );
        
        setApprovedRepairJobs(approvedJobs);

        if (approvedJobs.length > 0) {
          const selectedJob = approvedJobs[0]; // Assuming the first job in the filtered list is the selected one
          const serviceResponse = await axios.get(
            `http://localhost:3001/service/${selectedJob.JobID}/${selectedJob.QuotationID}`
          );
          setServices(serviceResponse.data);
        }
        
      } catch (error) {
        console.log(error);
      }

      
    };

    fetchApprovedRepairJobs();

  }, [userID]);
  

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

  const onSubmit = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      CustomerID: value, // Set the CustomerID from the value state variable
      EmployeeID: loginState.UserID,
      Status: "New",
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
    } finally {
      setSubmitting(false); // Don't forget to set submitting to false to enable the submit button again after form submission
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

  const handleSendForApproval = async () => {
    

    if(selectedJob.QuotationStatus === "Manager Rejected Once"){
      await axios.put(
        `http://localhost:3001/Quotation/${selectedJob.QuotationID}`,
        {
          QuotationStatus: "Returned To Manager",
        }
      );
  
      await axios.put(
        `http://localhost:3001/Job/updateJobStatus/${selectedJob.QuotationID}`,
        {
          Status: "Returned To Manager",
        }
      );
    } else if(selectedJob.QuotationStatus === "Manager Rejected Twice"){
      await axios.put(
        `http://localhost:3001/Quotation/${selectedJob.QuotationID}`,
        {
          QuotationStatus: "Pending Customer Approval",
        }
      );
  
      await axios.put(
        `http://localhost:3001/Job/updateJobStatus/${selectedJob.QuotationID}`,
        {
          Status: "Pending Customer Approval",
        }
      );
    }
    try {
      const response = await axios.get(`http://localhost:3001/Job/getServices/${selectedJob.QuotationID}`);
      const services = response.data; // Assuming the response contains an array of services
      setSelectedJobServices(services);

      
    } catch (error) {
      // Handle error if the services fetching fails
      console.error("Error fetching services:", error);
    }

    
    
  };

  const RepairDone = async () => {
    const jobid = localStorage.getItem("JobID");

    try {
      // Update the job status in the database
      await axios.put(`http://localhost:3001/Job/${jobid}`, {
        Status: "Repair Job Completed.. Come and Grab Your Vehicle..!!",
      });
console.log(selectedJob.QuotationID)
      // await axios.put(`http://localhost:3001/Quotation/${selectedJob.QuotationID}`, {
      //   QuotationStatus: "Repair Job Completed.. Come and Grab Your Vehicle..!!",
      // });

      // Display a success message
      alert("Quotation acceptance successful.");
      setSelectedJob(null);
    }
    // await axios.put(
    //   `http://localhost:3001/Quotation/${selectedJob.QuotationID}`,
    //   {
    //     QuotationStatus: "Repair Job Completed.. Come and Grab Your Vehicle..!!",
    //   }
    // );

    // await axios.put(
    //   `http://localhost:3001/Job/updateJobStatus/${selectedJob.QuotationID}`,
    //   {
    //     Status: "Repair Job Completed.. Come and Grab Your Vehicle..!!",
    //   }
    // );   
    catch (error) {} }

    console.log(repairJobs);
    console.log(submitValue);

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" >Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" >Create Repair Jobs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" >Rejected Repair Jobs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth" >Repair In Progress</Nav.Link>
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
                      <div>StartDate: {employee && formatDate(employee.StartDate)}</div>

                      
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
                <div style={{ backgroundColor: 'black', padding: '10px' }}>
  <button onClick={handleShowModal} style={{ color: 'white', background: '#E77367 ', border: 'none', borderRadius: '5px', padding: '10px' }}>Create Repair job</button>
</div>
<div style={{ backgroundColor: 'black', padding: '10px' }}>
  <div>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search by Job ID"
      style={{ color: 'white', background: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
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

                <Tab.Pane eventKey="third">
                  <table className="rejected-jobs-table">
                    <th>Job ID</th>
                    <th>Quotation ID</th>
                    <th>Created by</th>

                    <th>Job Description</th>
                    <th>Status</th>

                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.JobID} onClick={() => setSelectedJob(job)}>
                          <td>{job.JobID}</td>
                          <td>{job.QuotationID}</td>
                          <td>{job.EmployeeID}</td>
                          <td>{job.JobDescription}</td>
                          <td>{job.QuotationStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                <table style={{ borderCollapse: 'collapse', width: '80%', textAlign: 'left', border: '1px solid #ccc' }}>
  <thead style={{ backgroundColor: '#f2f2f2' }}>
    <tr>
      <th style={{ padding: '8px', border: '1px solid #ccc' }}>Quotation ID</th>
      <th style={{ padding: '8px', border: '1px solid #ccc' }}>Job Description</th>
      <th style={{ padding: '8px', border: '1px solid #ccc' }}>Quotation Status</th>
      <th></th>
      

    </tr>
  </thead>
  <tbody>
    {ApprovedRepairJobs.map((job) => (
      <tr key={job.QuotationID} style={{ backgroundColor: '#fff' }}>
        <td style={{ padding: '8px', border: '1px solid #ccc' }}>{job.QuotationID}</td>
        <td style={{ padding: '8px', border: '1px solid #ccc' }}>{job.JobDescription}</td>
        <td style={{ padding: '8px', border: '1px solid #ccc' }}>{job.QuotationStatus}</td>
        <td><button onClick={RepairDone}>Repair Process is Finished</button></td>
        
           </tr>
    ))}
  </tbody>
</table>

</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <Modal show={selectedJob !== null} onHide={() => setSelectedJob(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <div>
              <p>Job ID: {selectedJob.JobID}</p>
              <p>Quotation ID: {selectedJob.QuotationID}</p>
              <p>Created by: {selectedJob.EmployeeID}</p>
              <p>Job Description: {selectedJob.JobDescription}</p>
              <p>Status: {selectedJob.QuotationStatus}</p>

              {services.length > 0 && (
                <div>
                  <Modal.Header>
                    <Modal.Title>Repair Quotation</Modal.Title>
                  </Modal.Header>

                  <table className="service-table">
                    <thead>
                      <tr>
                        <th>Service Description</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id}>
                          <td>
                            {editingServiceID === service.id ? (
                              <input
                                type="text"
                                value={editableService.ServiceDescription}
                                onChange={(e) =>
                                  setEditableService({
                                    ...editableService,
                                    ServiceDescription: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              service.ServiceDescription
                            )}
                          </td>
                          <td>
                            {editingServiceID === service.id ? (
                              <input
                                type="text"
                                value={editableService.ServicePrice}
                                onChange={(e) =>
                                  setEditableService({
                                    ...editableService,
                                    ServicePrice: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              service.ServicePrice
                            )}
                          </td>
                          <td>
                            {editingServiceID === service.id ? (
                              <button
                                onClick={() => handleUpdateService(service)}
                              >
                                Update
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditService(service)}
                              >
                                Edit
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => handleRemoveService(service)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={handleSendForApproval}>Send for Approval</button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>

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
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="CustomerID" style={{ display: 'block', marginBottom: '5px' }}>Customer ID:</label>
            <Select
              options={options}
              value={options.find((option) => option.value === value)}
              onChange={(selectedOption) =>
                setValue(selectedOption.value)
              }
              placeholder="Enter Customer ID"
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ErrorMessage
              name="CustomerID"
              component="div"
              style={{ color: 'red', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="VehicleNumber" style={{ display: 'block', marginBottom: '5px' }}>Vehicle Number:</label>
            <Field
              type="text"
              id="VehicleNumber"
              name="VehicleNumber"
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ErrorMessage
              name="VehicleNumber"
              component="div"
              style={{ color: 'red', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="Model" style={{ display: 'block', marginBottom: '5px' }}>Vehicle Model:</label>
            <Field
              type="text"
              id="Model"
              name="Model"
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ErrorMessage
              name="Model"
              component="div"
              style={{ color: 'red', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="ServiceType" style={{ display: 'block', marginBottom: '5px' }}>Service Type:</label>
            <Field
              type="text"
              id="ServiceType"
              name="ServiceType"
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ErrorMessage
              name="ServiceType"
              component="div"
              style={{ color: 'red', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="JobDescription" style={{ display: 'block', marginBottom: '5px' }}>Job Description:</label>
            <Field
              as="textarea"
              id="JobDescription"
              name="JobDescription"
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ErrorMessage
              name="JobDescription"
              component="div"
              style={{ color: 'red', fontSize: '14px' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '4px', border: 'none' }}>Submit</button>
        </Form>
      )}
    </Formik>
  </Modal.Body>
</Modal>


      
    </>
  );
}
