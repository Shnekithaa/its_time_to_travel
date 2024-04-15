import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

import login_img from "../../assets/login_img.avif";
import travelblogLogo from "../../assets/travelblogLogo.png";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import "./index.css";

const Index = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3000/signup', {name, email, password})
      .then(res => {
        console.log(res)
        navigate("/login")
      })
      .catch(err => console.log(err))
    }

    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-top">
            <img src={travelblogLogo} alt="logo" className="signup-logo" />
            <h1>Create Account</h1>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div>
              <label>
                Username<span className="req-star">*</span>
              </label>
              <div>
                <input type="text" className="signup-input" onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div>
              <label>
                Email<span className="req-star">*</span>
              </label>
              <div>
                <input type="email" className="signup-input" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label>
                Password<span className="req-star">*</span>
              </label>
              <div className="password-input">
                <input type="password" className="signup-input" onChange={(e) => setPassword(e.target.value)} />
                <span className="eye">
                  <AiOutlineEyeInvisible className="signup-eye-icon" />
                </span>
              </div>
            </div>
            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>
          <p className="have-account-text">
            Have an account?{" "}
            <Link to="/login">
              <span className="login-text">Login</span>
            </Link>
          </p>
        </div>
        <div>
          <img src={login_img} alt="travel-img" className="signup-img" />
        </div>
      </div>
    );
  }

export default Index