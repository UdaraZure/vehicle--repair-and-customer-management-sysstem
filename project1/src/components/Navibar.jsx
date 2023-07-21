import React, { useRef } from 'react';
import { Link } from 'react-scroll';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GarageIcon from "./GarageIcon.png"

function Navigationbar() {
  return (
    <>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" fixed='top' >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <img className='GarageIcon'
              src={GarageIcon}
              height="50"
              width = "120"
              />
            </Nav.Link>
            
            <Nav.Link><Link to="section1" smooth={true} duration={100}>Services</Link></Nav.Link>
            <Nav.Link><Link to="section2" smooth={true} duration={100}>Offers</Link></Nav.Link>
            <Nav.Link><Link to="section3" smooth={true} duration={100}>Contact Us</Link></Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link href="/Employees/login" className="Login-button" target="_blank">Login</Nav.Link>
            <Nav.Link href="/Customer" className="Register-button" target="_blank">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr size="2" color= "fff" width="50%"/>
    </div>

    </>
  )
}

export default Navigationbar;

