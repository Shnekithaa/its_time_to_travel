import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/index";
import Home from "./components/Home";
import Places from "./components/Places"
import Gallery from "./components/Gallery"
import Favourites from "./components/Favourites"
import Contact from "./components/Contact"
import Login from "./components/Login"

import "./App.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/places" element={<Places />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
