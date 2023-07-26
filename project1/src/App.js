import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GarageIcon from "./components/GarageIcon.png"; 
import PathBunch from './Pages/PathBunch';
import { LoginContext } from './helpers/LoginContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [loginState, setLoginState] = useState({
    username: "", 
    id: 0, 
    status: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios
        .get('http://localhost:3001/Employees/login', {
          headers: {
            accessToken: accessToken,
          },
        })
        .then((response) => {
          if (response.data.error) {
            setLoginState({ ...loginState, status: false });
          } else {
            setLoginState({
              username: response.data.Email, 
              id: response.data.id, 
              status: true,
            });
          }
        });
    }
  }, [loginState.status]); // Adding loginState.status as a dependency

  const Logout = () => {
    localStorage.removeItem('accessToken');
    setLoginState({
      username: "", 
      id: 0, 
      status: false
    });
  };

  return (
    <LoginContext.Provider value={{ loginState, setLoginState }}>
      <div className="App">       
        <Navbar className='Navbar-main' collapseOnSelect expand="lg" bg="black" variant="dark" fixed='top'>
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">
                  <img className='GarageIcon'
                    src={GarageIcon}
                    height="50"
                    width="120"
                  />
                </Nav.Link>
              </Nav>
              {!loginState.status ? (
                <Nav>
                  <Nav.Link href="/Employees/login" className="Login-button" >Login</Nav.Link>
                  <Nav.Link href="/Customer" className="Register-button" >Register</Nav.Link>
                </Nav>
              ) : (
                <button onClick={Logout}>Logout</button>
              )} 
              <p>{loginState.username}</p>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <center>
          <PathBunch/>
        </center>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
