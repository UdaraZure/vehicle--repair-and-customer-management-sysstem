import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Homepge from './Homepge/Homepge'
import Login from './Login/Login'
import Customer from './Customer/Customer'
import Offers from './Offers/Offers';
import ServiceTypes from './ServiceTypes/ServiceTypes';
import OwnerDashboard from './OwnerDashboard/OwnerDashboard';
import Employees from './Employees/Employees';
import Quotation from './Quotation/Quotation';
import ClarkDashboard from './ClarkDashboard/ClarkDashboard';
import RepairJob from './RepairJob/RepairJob';
import ManagerDashboard from './ManagerDashboard/ManagerDashboard';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard';


export default function PathBunch() {

 
  return (
    <div>
        <Routes>
            <Route exact path = "/" element={<Homepge/>}></Route>
            <Route path = "/login" element={<Login/>}></Route>
            <Route path = "/Customer" element={<Customer/>}></Route>
            <Route path = "/ClarkDashboard" element={<ClarkDashboard/>}></Route>
            <Route path = "/Offers" element={<Offers/>}></Route>
            <Route path = "/ServiceTypes" element={<ServiceTypes/>}></Route>
            <Route path = "/OwnerDashboard" element={<OwnerDashboard/>}></Route>
            <Route path = "/Employees" element={<Employees/>}></Route>
            <Route path = "/Quotation" element={<Quotation/>}></Route>
            <Route path = "/RepairJob/:JobID" element={<RepairJob/>}></Route>
            <Route path = "/ManagerDashboard" element={<ManagerDashboard/>}></Route>
            <Route path = "/CustomerDashboard" element={<CustomerDashboard/>}></Route>
            <Route path = "*" element={<div>NOT FOUND</div>}></Route>
        </Routes>
    </div>
  );
}