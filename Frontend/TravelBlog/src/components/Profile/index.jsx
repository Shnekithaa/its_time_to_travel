import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import proUploadPic from "../../assets/proUploadPic.jpg"
import boyTraveller from "../../assets/boyTraveller.jpg"
import girlTraveller from "../../assets/girlTraveller.jpg"
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
          setGender(res.data.gender || 'notsay')
          setBio(res.data.bio || '')
          localStorage.setItem('gender', res.data.user.gender);
          localStorage.setItem('bio', res.data.user.bio);
          setGender(localStorage.getItem('gender') || 'notsay');
          setBio(localStorage.getItem('bio') || '');
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
          <img src={proUploadPic} alt='profile-upload' className='profile-upload-icon' />
          <h1>You are really a GlobeTrotter</h1>
        </div>
        <div>
          <div>
            <FaRegCircleUser />
            <input type='text' placeholder='Username' value={username || ''} disabled />
          </div>
          <div>
            <MdEmail />
            <input type='email' placeholder='Email' value={email || ''} disabled />
          </div>
          <div>
            <FaTransgender />
            <select disabled={!isEditing} value={gender} onChange={handleInputChange} name='gender'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="notsay">Rather not to say</option>
            </select>
          </div>
          <div>
            <textarea placeholder='Bio' rows='5' cols='50' disabled={!isEditing} value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
          </div>
          {
            isEditing ? <TiTick onClick={handleTick} /> : <FaRegEdit onClick={handleEditClick} />
          }
        </div>
        <div>
        <img src={gender === "male" ? boyTraveller : gender === "female" ? girlTraveller : ''} alt='traveller' />
        </div>
      </div>
    </div>
  );
}

export default index;
