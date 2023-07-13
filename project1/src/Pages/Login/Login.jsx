import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import loginIcon from './login-icon.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const data = { username: username, password: password };
    axios.post('http://localhost:3001/Customers/login', data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
      localStorage.setItem('accessToken', response.data);
      setUsername('');
      setPassword('');
    });
  };

  return (
    <>
      <div className="container-form">
        <div className="card-form">
          <div className='form-header1'>
        <img src={loginIcon} alt="" />
          <p className="tittle-word">Log in</p>
          </div>
          <div className="inputBox">
            <input type="text" required />
            <span className="user">Username</span>
          </div>

          <div className="inputBox">
            <input type="password" required />
            <span>Password</span>
          </div>

          <button className="enter">Enter</button>
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
                  setUsername(event.target.value);
                }}
              />
              <span>Phone number, username, or email</span>
            </label>
            <label>
              <input
                required
                type="password"
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
          <button>Forgot password?</button>
        </div>
      </div>
    </div> */
  );
}
