import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import loginIcon from './login-icon.png';
import Navigationbar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  let navigate = useNavigate();

  const login = () => {
    const data = { Email: Email, Password: Password };
    axios.post('http://localhost:3001/Employees/login', data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('accessToken', response.data);
          navigate('/OwnerDashboard');
        }
      })
      .catch((error) => {
        console.error("Error occurred", error);
      });
  };

  return (
    <>
      <Navigationbar />
      <div className="container-form">
        <div className="card-form">
          <div className='form-header1'>
        <img src={loginIcon} alt="" />
          <p className="tittle-word">Log in</p>
          </div>
          <div className="inputBox">
            <input 
            type="text" 
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
            <span className="Email">Email</span>
          </div>

          <div className="inputBox">
            <input 
            type="Password" 
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required />
            <span>Password</span>
          </div>

          <button className="enter" onClick={login}>Enter</button>
        </div>
      </div>
    </>

    /* <div className="container-login">
      <div className="content-login">
        <img
          src={loginIcon}
          height="50"
          width="120"
          alt=""
        />
        <form className="content__form">
          <div className="content__inputs">
            <label>
              <input
                required
                type="text"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <span>Phone number, Email, or Email</span>
            </label>
            <label>
              <input
                required
                type="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <span>Password</span>
            </label>
          </div>
          <button onClick={login}>Log In</button>
        </form>

        <div className="content__forgot-buttons">
          <button>Forgot Password?</button>
        </div>
      </div>
    </div> */
  );
}
