import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import  Login from "./pages/Login"
import  Register from "./pages/Register"
import  Profile  from "./pages/Profile"
import  Jobs from "./pages/Jobs"
import  EditP from "./pages/EditP"

import Postulation from "./pages/postulation"
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"
 
import React from "react";
import Home from "./pages/Home";
import Questionaire from "./pages/Questionaire";
import CV from "./pages/CV";


function App() {
  return (
    <>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />

      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css'
        integrity='sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4'
        crossorigin='anonymous'></link>{" "}
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />{" "}
           
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<EditP />} />
          <Route path='/Jobs' element={<Jobs />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Postulation/:id' element={<Postulation />} />
          <Route path='/register' element={<Register />} />
          <Route path="/questionaire/:id" element={<Questionaire />} />
          <Route path="/CV" element={<CV />} />
        
        </Routes>{" "}
      </Router>{" "}
      <ToastContainer />
     </>
  );
}

export default App;
