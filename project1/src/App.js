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
import { BrowserRouter, useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {
  const [loginState, setLoginState] = useState({
    username: "", 
    Role: "", 
    status: false,
  });

  const paragraphStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    color: '#ffff',
    fontWeight: 'bold',
    
  };

  const logoutButtonStyle = {
    backgroundColor: '	#b23b3b',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '20px',
  };


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
            setLoginState({
              username: response.data.Email, 
              Role: response.data.UserRole, 
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
      Role: "", 
      status: false,
    });
    
  };

  return (
    <BrowserRouter>
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
              <p style={paragraphStyle}>{loginState.username}</p>
              {!loginState.status ? (
                <Nav>
                  <Nav.Link href="/login" className="Login-button" >Login</Nav.Link>
                  <Nav.Link href="/Customer" className="Register-button" >Register</Nav.Link>
                </Nav>
              ) : (
                <button style={logoutButtonStyle} onClick={() => {
                  Logout();
                  window.location = "/login";
                }}>Logout</button>
              )} 
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </div>    
      <div style={{marginTop:"110px"}}>
        <center>
          <PathBunch/>
        </center>
      </div>
    </LoginContext.Provider>
  </BrowserRouter>);
}

export default App;
