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
            
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/Offers">Offers</Nav.Link>
            <Nav.Link href="/ContactUs">Contact Us</Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link href="/login" className="Login-button">Login</Nav.Link>
            <Nav.Link href="/signup" className="Signup-button">Sign Up</Nav.Link>
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

