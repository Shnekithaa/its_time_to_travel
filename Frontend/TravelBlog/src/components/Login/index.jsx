import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import login_img from "../../assets/login_img.avif"
import travelblogLogo from "../../assets/travelblogLogo.png"
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css"

export default class index extends Component {
  render() {
    return (
      <div className='login-container'>
        <div className='left-login-card'>
          <img src={travelblogLogo} alt="logo" className='logo' />
          <h1>Welcome back!</h1>
          <p>Enter to get access to unlimited travel stories</p>
          <div>
            <div className='input-card'>
              <label>Email<span className='req-star'>*</span></label>
              <div>
                <input type='text' className='input-box' />
              </div>
            </div>
            <div>
              <label>Password<span className='req-star'>*</span></label>
              <div>
                <input type='text' className='input-box' />
                <AiOutlineEyeInvisible className='eye-icon' />
              </div>
              <div>
                <p className='forgot-text'>Forgot your password?</p>
              </div>
            </div>
          </div>
          <button className='login-btn'>Log in</button>
          <div className='login-lines'>
            <hr className='login-line' />
            <p className='login-with-text'>Or Login With</p>
            <hr className='login-line' />
          </div>
          <div>
            <button className='signup-btn'>
              <FcGoogle className='google-icon' />
              <p className='signup-text'>Sign up with Google</p>
            </button>
            <p className='account-text'>Don't have an account? <span className='register-text'><Link to="/signup">Register here</Link></span></p>
          </div>
        </div>
        <div className='right-login-card'>
          <img src={login_img} alt='login-img' className='login-img' />
        </div>
      </div>
    );
  }
}
