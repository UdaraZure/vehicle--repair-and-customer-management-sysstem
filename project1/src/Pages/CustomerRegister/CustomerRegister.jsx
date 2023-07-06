import React, { useState } from 'react';
import './CustomerRegister.css';
import axios from 'axios';

export const CustomerRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstName.trim() === '') {
      setFirstNameError('The first name should not be null');
      return;
    }

    if (lastName.trim() === '') {
      setLastNameError('The last name should not be null');
      return;
    }

    if (email.trim() === '') {
      setEmailError('The email should not be null');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberError('The phone number should not be null');
      return;
    }

    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number');
      return;
    }

    if (password.trim() === '') {
      setPasswordError('The password should not be null');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Please enter a valid password. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one digit.'
      );
      return;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('The confirm password should not be null');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('The confirm password should match the password');
      return;
    }else{
      setNewPassword(password);
    } 

    onSubmit();

    // Resetting all form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');

    // Display success message for 3 seconds
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);


    }, 3000);
  };

  const onSubmit = (event) => {

    const Data = {
      firstName: firstName,
      lastName: lastName,
      Email: email,
      mobileNumber: phoneNumber,
      Password: newPassword
  }
   
    axios
      .post("http://localhost:3001/customers", Data)
      .then((response) => {
       // resetForm();
      })
      .then((response) => {
        alert("Account Created Successfully!");
      })

      .catch((error) => {
        console.log(error);
        alert("Error: ");
      });
  };

  return (
    <>
      <div className='form' style={{ marginTop: '20vh' }}>
        <div className="form-body">
          <h4 style={{ textAlign: 'center', fontWeight: '1000' }}> Sign Up </h4>
          <div className="table">
            <table>
              <tr>
                <div className="firstName">
                  <td className="form_question"><label className="form__label" htmlFor="firstName">First Name </label></td>
                  <td>
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
                  </td>
                </div>
              </tr>
              <tr>
                <div className="lastname">
                  <td className="form_question">
                    <label className="form__label" htmlFor="lastName">Last Name </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="lastName"
                      className="form__input"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameError('');
                      }}
                    />
                    {lastNameError && <p className="error-message">{lastNameError}</p>}
                  </td>
                </div>
              </tr>
              <tr>
                <div className="email">
                  <td className="form_question">
                    <label className="form__label" htmlFor="email">Email </label>
                  </td>
                  <td>
                    <input
                      type="email"
                      id="email"
                      className="form__input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                  </td>
                </div>
              </tr>
              <tr>
                <div className="mobileNum">
                  <td className="form_question"><label className="form__label" htmlFor="mobileNum">Mobile Number </label></td>
                  <td>
                    <input
                      type="text"
                      id="mobileNum"
                      className="form__input"
                      placeholder="Mobile Number"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setPhoneNumberError('');
                      }}
                    />
                    {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                  </td>
                </div>
              </tr>
              <tr>
                <div className="password">
                  <td className="form_question">
                    <label className="form__label" htmlFor="password">Password </label>
                  </td>
                  <td>
                    <input
                      className="form__input"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError('');
                      }}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                  </td>
                </div>
              </tr>
              <tr>
                <div className="confirm-password">
                  <td className="form_question">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                  </td>
                  <td>
                    <input
                      className="form__input"
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setConfirmPasswordError('');
                      }}
                    />
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                  </td>
                </div>
              </tr>
            </table>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="footer">
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
          {formSubmitted && (
            <p className="notification-message">User account created successfully!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerRegister;
