import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login_img from "../../assets/login_img.avif"
import travelblogLogo from "../../assets/travelblogLogo.png"
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import "./index.css"
import axios from 'axios';
import Cookies from 'js-cookie'
import {GoogleLogin} from 'react-google-login'


const clientId = "404075190270-pfjnjp51ql5pbrsgae9hkrrdsto5kskd.apps.googleusercontent.com"

const Index = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post("http://localhost:3000/login", {email, password})
      .then(res => {
        console.log(res)
        if(res.status){
          Cookies.set("token", res.data.token, {expires: 30})
          navigate("/")
        }
      })
      .catch(err => {
        if(err.response && err.response.data.message){
          setError(err.response.data.message)
        }else{
          setError("Something went wrong. Please try again later.")
        }
      })
    }
    const onSuccess = (res) => {
      Cookies.set("token", res.accessToken, {expires: 30})
      navigate("/")
      console.log("Login Success! Current user: ", res)
    }
    const onFailure = (res) => {
      console.log("Login failed! res: ", res)
    }
    
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
                <input type='text' className='input-box' onChange={(e) => {setEmail(e.target.value); setError('')}} />
              </div>
            </div>
            <div>
              <label>Password<span className='req-star'>*</span></label>
              <div>
                <input type='password' className='input-box' onChange={(e) => {setPassword(e.target.value); setError('')}} />
                <AiOutlineEyeInvisible className='eye-icon' />
              </div>
              <div>
                <p className='forgot-text'>Forgot your password?</p>
              </div>
            </div>
          </div>
          {error && <div className="login-err-msg">{error}</div>}
          <button className='login-btn' onClick={handleSubmit}>Log in</button>
          <div className='login-lines'>
            <hr className='login-line' />
            <p className='login-with-text'>Or Login With</p>
            <hr className='login-line' />
          </div>
          <div className='g-login'>
            <GoogleLogin clientId={clientId} buttonText='Login with Google' onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} />
          </div>
        </div>
        <div className='right-login-card'>
          <img src={login_img} alt='login-img' className='login-img' />
        </div>
      </div>
    );
  }

  export default Index