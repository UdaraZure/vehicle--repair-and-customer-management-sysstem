import React from 'react'
import './Register.css'

export default function Register () {
  return (
    <>
     <form className="form">
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our services.</p>
      <div className="flex">
        <label>
          <input required placeholder="" type="text" className="input-register" />
          <span>Firstname</span>
        </label>

        <label>
          <input required placeholder="" type="text" className="input-register"/>
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input required placeholder="" type="email" className="input-register"/>
        <span>Email</span>
      </label>

      <label>
        <input required placeholder="" type="password" className="input-register"/>
        <span>Password</span>
      </label>

      <label>
        <input required placeholder="" type="password" className="input-register"/>
        <span>Confirm password</span>
      </label>

      <button className="submit">Submit</button>

      <p className="signin">
        Already have an account? <a href="http://localhost:3000/Customers/login">log in</a>
      </p>
    </form>
    </>
  )
}
