import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Homepge from './Homepge/Homepge'
import Login from './Login/Login'
import Customer from './Customer/Customer'
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard';
import Offers from './Offers/Offers';
import ServiceTypes from './ServiceTypes/ServiceTypes';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import Employees from './Employees/Employees';

export default function PathBunch() {
  return (
    <>
    <div>
        <Router>
            <Routes>
                <Route exact path = "/" element={<Homepge/>}></Route>
                <Route path = "/Customers/login" element={<Login/>}></Route>
                <Route path = "/Customer" element={<Customer/>}></Route>
                <Route path = "/employeedashboard" element={<EmployeeDashboard/>}></Route>
                <Route path = "/Offers" element={<Offers/>}></Route>
                <Route path = "/ServiceTypes" element={<ServiceTypes/>}></Route>
                <Route path = "/OwnerDashboard" element={<OwnerDashboard/>}></Route>
                <Route path = "/Employees" element={<Employees/>}></Route>
            </Routes>
        </Router>
    </div>
    </>
  )
}
