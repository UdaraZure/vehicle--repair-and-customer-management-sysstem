import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Homepge from './Homepge/Homepge'
import Header from './Signup/signUp'
import Login from './Login/Login'

export default function PathBunch() {
  return (
    <>
    <div>
        <Router>
            <Routes>
                <Route exact path = "/" element={<Homepge/>}></Route>
                <Route path = "/signup" element={<Header/>}></Route>
                <Route path = "/login" element={<Login/>}></Route>
            </Routes>
        </Router>
    </div>
    </>
  )
}
