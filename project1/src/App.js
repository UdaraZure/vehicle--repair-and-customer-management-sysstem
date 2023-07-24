import './App.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GarageIcon from "./components/GarageIcon.png"; 
import PathBunch from './Pages/PathBunch';
// import Navbar from './components/NavBar'
import { LoginContext } from './helpers/LoginContext';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [loginState, setLoginState] = useState(false);

 
  useEffect(()=> {
    axios.get('http://localhost:3001/Employees/login', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
      .then((response)=>{
      if(response.data.error){
        setLoginState(false);
      } else{
        setLoginState(true);
      }
  });
  },[]);
   
  const Logout = () => {
    localStorage.removeItem('accessToken');
    setLoginState(false);
  };

  return (
    <LoginContext.Provider value={{loginState, setLoginState}}>
   
    <div className="App">
    
      <>
      <Navbar className='Navbar-main' collapseOnSelect expand="lg" bg="black" variant="dark" fixed='top' >
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
            
          </Nav>
          {!loginState ? (
          <Nav>
            <Nav.Link href="/Employees/login" className="Login-button" target="_blank">Login</Nav.Link>
            <Nav.Link href="/Customer" className="Register-button" target="_blank">Register</Nav.Link>
          </Nav>
          ) : (
            <button onClick={Logout}>Logout</button>
          )} 
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
    
    
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
