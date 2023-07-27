import { useState, useEffect } from 'react';
import axios from 'axios';
import './ClarkDashboard.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';


export default function ClarkDashboard() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [loginState, setLoginState] = useState({
    username: "", 
    Role: "", 
    status: false,
    UserID: "",
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios
        .get('http://localhost:3001/User/Authentication', {
          headers: {
            accessToken: accessToken,
          },
        })
        .then((response) => {
          if (response.data.error) {
            setLoginState({ ...loginState, status: false });
          } else {
            console.log(response.data)
            setLoginState({
              username: response.data.Email, 
              Role: response.data.UserRole, 
              status: true,
              UserID: response.data.UserID
            });
          }
        });
    }
  }, []); // Adding loginState.status as a dependency

  const onSubmit = (values) => {

const data ={
  ...values,
  EmployeeID: loginState.UserID,
}

console.log(data);
    axios
  .post('http://localhost:3001/Job', data)
  .then((response) => {
    console.log('Form data sent successfully:', response.data);
    handleCloseModal(); // Close the modal after successful form submission
    // Add any additional actions you want to perform after successful submission
  })
 
        .catch((error) => {
          console.error('Error authenticating user:', error);
        });

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
                <Tab.Pane eventKey="first" className='Pcard'>
                  <div className="Pcard-details">
                    <p className="text-title">Card title</p>
                    <p className="text-body">Here are the details of the Pcard</p>
                  </div>
                  <button className="Pcard-button">Edit info</button>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <div>
                    <button onClick={handleShowModal}>Create Repair job</button>
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
              CustomerID: '',
              VehicleNumber: '',
              Model: '',
              ServiceType: '',
              JobDescription: '',
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="CustomerID">Customer ID:</label>
                <Field type="text" id="CustomerID" name="CustomerID" required />
                <ErrorMessage name="CustomerID" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="VehicleNumber">Vehicle Number:</label>
                <Field type="text" id="VehicleNumber" name="VehicleNumber" required />
                <ErrorMessage name="VehicleNumber" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="Model">Vehicle Model:</label>
                <Field type="text" id="Model" name="Model" required />
                <ErrorMessage name="Model" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="ServiceType">Service Type:</label>
                <Field type="text" id="ServiceType" name="ServiceType" required />
                <ErrorMessage name="ServiceType" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="JobDescription">Job Description:</label>
                <Field as="textarea" id="JobDescription" name="JobDescription" required />
                <ErrorMessage name="JobDescription" component="div" className="error-message" />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Modal.Body>
        {/* No need to change the Modal.Footer */}
        <Modal.Footer>
          {/* Add any footer content/buttons here */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
