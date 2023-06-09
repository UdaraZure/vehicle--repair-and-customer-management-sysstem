import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Homepge from './Homepge/Homepge'
import Login from './Login/Login'
import Register from './Register/Register'
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard';
import CustomerRegister from './CustomerRegister/CustomerRegister';
import Offers from './Offers/Offers';
import OwnerRegister from './OwnerRegister/OwnerRegister';

export default function PathBunch() {
  return (
    <>
    <div>
        <Router>
            <Routes>
                <Route exact path = "/" element={<Homepge/>}></Route>
                <Route path = "/Customers/login" element={<Login/>}></Route>
                <Route path = "/Register" element={<Register/>}></Route>
                <Route path = "/employeedashboard" element={<EmployeeDashboard/>}></Route>
                <Route path = "/CustomerRegister" element={<CustomerRegister/>}></Route>
                <Route path = "/OwnerRegister" element={<OwnerRegister/>}></Route>
                <Route path = "/Offers" element={<Offers/>}></Route>
            </Routes>
        </Router>
    </div>
    </>
  )
}
