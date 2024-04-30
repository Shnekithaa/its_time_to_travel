import React, { useEffect, useState } from 'react';
import "./index.css"
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = ({setOpenEditPlaceModal, spotId}) => {

    const [spot, setSpot] = useState('')
    const [location, setLocation] = useState('')

    useEffect(() => {
        axios.post("http://localhost:3000/getPlace/" , {spotId})
        .then(res => {
            console.log(res)
            setSpot(res.data.spot)
            setLocation(res.data.location)
        })
        .catch(err => console.log(err))
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3000/updatePlace", {spot, location, spotId})
        .then((res) => {
            console.log(res)
            setOpenEditPlaceModal(false)
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            console.log(err.response.data)
            toast.error(`${err.response.data}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
    }

  return (
    <div className='modal-bg'>
        <ToastContainer />
      <div className='modal-container'>
        <div className='modal-title'>
            <h1>Edit the Place</h1>
        </div>
        <div className='modal-body'>
            <form>
                <div className='form-add-div'>
                    <label htmlFor='spot'>Spot</label>
                    <input type='text' id='spot' required onChange={(e) => setSpot(e.target.value)} value={spot} />
                </div>
                <div className='form-add-div'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' required onChange={(e) => setLocation(e.target.value)} value={location} />
                </div>
            </form>
        </div>
        <div className='modal-footer'>
            <button onClick={() => setOpenEditPlaceModal(false)} className='cancel-btn'>Cancel</button>
            <button className='add-place-btn' onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default index;
