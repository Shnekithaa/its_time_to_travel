import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Navbar from "../Navbar";
import proUploadPic from "../../assets/proUploadPic.jpg"
import boyTraveller from "../../assets/boyTraveller.jpg"
import girlTraveller from "../../assets/girlTraveller.jpg"
import boyGirlTravellers from "../../assets/boyGirlTravellers.avif"
import Cookies from "js-cookie"
import { FaRegEdit } from "react-icons/fa";
import { FaTransgender } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

import "./index.css"
import axios from 'axios';

const profileLettersArr = ["P", "R", "O", "F", "I", "L", "E"];

const index = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState('notsay')
  const [bio, setBio] = useState()
  const [file, setFile] = useState()
  const [imageUrl, setImageUrl] = useState('')

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  useEffect(() => {
    const fetchProfile = () => {
      const emailFromCookie = Cookies.get("email")
      axios.post("http://localhost:3000/profile", {email: emailFromCookie}).then(res => {
        console.log(res)
        if(res.data && res.data.user){
          setUsername(res.data.user.name)
          setEmail(res.data.user.email)
          setGender(res.data.user.gender || 'notsay')
          setBio(res.data.user.bio || '')
          const buffer = Buffer.from(res.data.user.imageUrl).toString('base64')
          setImageUrl(buffer || '')
        }
        
      })
      .catch(err => console.log(err))
    }
    fetchProfile()
  }, [])

  const handleInputChange = (event) => {
    setGender(event.target.value)
  }

  const handleTick = () => {
    const email = Cookies.get("email")
    axios.post("http://localhost:3000/update-profile", {email, gender, bio})
    .then(res => {
      setIsEditing(false)
      console.log("Profile updated", res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleFileUpload = () => {
    const email = Cookies.get("email")
    const formData = new FormData()
    formData.append('file', file)
    formData.append('email', email)
    axios.post("http://localhost:3000/upload", formData)
    .then(res => {
      console.log(res)
      const buffer = Buffer.from(res.data.imageUrl).toString('base64')
      setImageUrl(buffer)
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <Navbar />
      <div className='profile-title-holder'>
        {
            profileLettersArr.map((eachLetter) => {
                return <div className='profile-letters'>{eachLetter}</div>
            })
        }
      </div>
      <div className='profile-container'>
        <div>
          {
            imageUrl ? (
              <img src={`data:image/png;base64,${imageUrl}`} alt="Profile Pic" className="profile-pic" />
            ) : (
              <img src={proUploadPic} alt='profile-upload' className='profile-upload-icon' />
            )
          }
          <div className='upload-box'>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} className='file' />
            <button type='button' onClick={handleFileUpload} className='upload-btn'>Upload</button>
          </div>
          <h1 className='profile-pic-text'>You are really a GlobeTrotter</h1>
        </div>
        <div className='profile-form'>
          <div className='form-card'>
            <FaRegCircleUser className='input-pro-icon-1' />
            <input type='text' placeholder='Username' value={username || ''} disabled className='profile-input' />
          </div>
          <div className='form-card'>
            <MdEmail className='input-pro-icon-2' />
            <input type='email' placeholder='Email' value={email || ''} disabled className='profile-input' />
          </div>
          <div className='form-card'>
            <FaTransgender className='input-pro-icon-3' />
            <select disabled={!isEditing} value={gender} onChange={handleInputChange} name='gender'className='profile-input'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="notsay">Rather not to say</option>
            </select>
          </div>
          <div className='form-card'>
            <textarea placeholder='Bio' rows='5' cols='50' disabled={!isEditing} value={bio} onChange={(e) => setBio(e.target.value)} className='profile-input-textarea'></textarea>
          </div>
          {
            isEditing ? <TiTick onClick={handleTick} className='edit-icon' /> : <FaRegEdit onClick={handleEditClick} className='edit-icon' />
          }
        </div>
        <div>
        <img src={gender === "male" ? boyTraveller : gender === "female" ? girlTraveller : boyGirlTravellers} alt='traveller' className={gender === "male" ? "boy-img" : gender === "female" ? "girl-img" : 'boy-img'} />
        </div>
      </div>
    </div>
  );
}

export default index;
