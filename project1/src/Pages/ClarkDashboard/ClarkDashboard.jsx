import React from 'react'
import './ClarkDashboard.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

export default function ClarkDashboard () {
  return (
    <>
    <div style={{marginTop:"100px"}}>
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




            <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </>
  )
}
