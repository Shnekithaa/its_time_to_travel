import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { gapi } from "gapi-script";
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Places from "./components/Places"
import Gallery from "./components/Gallery"
import Favourites from "./components/Favourites"
import Contact from "./components/Contact"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Login from "./components/Login"

import "./App.css";

const clientId = "404075190270-pfjnjp51ql5pbrsgae9hkrrdsto5kskd.apps.googleusercontent.com"

const App = () => {

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])


  return (
    <div>
      <Routes>
          <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/places" element={<ProtectedRoute element={Places} />} />
          <Route path="/gallery" element={<ProtectedRoute element={Gallery} />} />
          <Route path="/favourites" element={<ProtectedRoute element={Favourites} />} />
          <Route path="/contact" element={<ProtectedRoute element={Contact} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
