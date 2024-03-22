import React, { Component } from 'react';
import login_img from "../../assets/login_img.avif"
import travelblogLogo from "../../assets/travelblogLogo.png"
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css"

export default class index extends Component {
  render() {
    return (
      <div className='login-container'>
        <div>
          <img src={travelblogLogo} alt="logo" className='logo' />
          <h1>Welcome back!</h1>
          <p>Enter to get access to unlimited travel stories</p>
          <div>
            <div>
              <label>Email*</label>
              <input type='text' />
            </div>
            <div>
              <label>Password*</label>
              <div>
                <input type='text' />
                <AiOutlineEyeInvisible />
              </div>
              <div>
                <p>Forgot your password?</p>
              </div>
            </div>
          </div>
          <button>Log in</button>
          <div>
            <div></div>
            <p>Or Login With</p>
            <div></div>
          </div>
          <div>
            <button>
              <FcGoogle />
              <p>Sign up with google</p>
            </button>
            <p>Don't have an account? <span>Register here</span></p>
          </div>
        </div>
        <div>
          <img src={login_img} alt='login-img' className='login-img' />
        </div>
      </div>
    );
  }
}
