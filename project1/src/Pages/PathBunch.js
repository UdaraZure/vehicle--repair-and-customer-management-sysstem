import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Homepge from './Homepge/Homepge'
import Signup from './Signup/signUp'
import Login from './Login/Login'
import Services from './Services/services'

export default function PathBunch() {
  return (
    <>
    <div>
        <Router>
            <Routes>
                <Route exact path = "/" element={<Homepge/>}></Route>
                <Route path = "/signup" element={<Signup/>}></Route>
                <Route path = "/login" element={<Login/>}></Route>
                <Route path = "/services" element={<Services/>}></Route>
            </Routes>
        </Router>
    </div>
    </>
  )
}
