import React, { useState } from 'react';
import './signupPge.css';

export const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstName.trim() === '') {
      setFirstNameError('The first name shouldn\'t be null');
      return;
    }

    // Proceed with form submission if validation passes
    // TODO: Handle form submission logic here
  };

  return (
    <>
      <div className='form' style={{ marginTop: '25vh' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <h4 style={{ textAlign: 'center', fontWeight: '1000' }}> Sign Up </h4>
          
            <div className="username">
              <label className="form__label" htmlFor="firstName">First Name </label>
              <input
                className="form__input"
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError('');
                }}
              />
              {firstNameError && <p className="error-message">{firstNameError}</p>}
            </div>
              <div className="lastname"> 
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="mobileNum">
                  <label className="form__label" for="mobileNum">Mobile Number </label>
                  <input  type='number' id="mobileNum" className="form__input" placeholder="mobile Number"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
              <div className="footer">
              <button type="submit" className="btn">Submit</button>
            </div>
          
        </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
