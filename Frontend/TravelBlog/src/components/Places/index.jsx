import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar"
import axios from "axios"
import eiffel_tower from "../../assets/eiffel_tower.jpg"
import { IoMdAddCircle } from "react-icons/io";
import "./index.css"
const profileLettersArr = ["P", "L", "A", "C", "E", "S"];

const index = () => {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/places")
    .then((response) => {
      setSpots(response.data)
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div>
      {console.log(spots)}
      <Navbar />
      <div className='places-top'>
        <div className='profile-title-holder'>
          {
              profileLettersArr.map((eachLetter) => {
                  return <div className='profile-letters'>{eachLetter}</div>
              })
          }
        </div>
        <IoMdAddCircle className='add-icon' />
      </div>
      <div className='places-holder'>
        {
          spots.map((eachSpot, index) => (
            <div className='spot-img-card' key={index}>
              <img src={eiffel_tower} alt="gallery-img" className="gallery-img" />
              <div className='spot-info'>
                <div>{eachSpot.spot}</div>
                <div>{eachSpot.location}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default index;
