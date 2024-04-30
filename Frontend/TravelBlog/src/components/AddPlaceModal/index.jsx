import React, { useState } from 'react';
import "./index.css"
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const index = ({setOpenAddPlaceModal}) => {

    const [spot, setSpot] = useState()
    const[location, setLocation]= useState()

    const handleAddBtn = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/addPlace", {spot, location})
        .then((res) => {
            console.log(res)
            setOpenAddPlaceModal(false)
            window.location.reload()
        })
        .catch((err) => {
            console.log(err)
            toast.error(`${err.response.data}`, {
                position: "top-right",
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
            <h1>Add a Place</h1>
        </div>
        <div className='modal-body'>
            <form>
                <div className='form-add-div'>
                    <label htmlFor='spot'>Spot</label>
                    <input type='text' id='spot' required={true} onChange={(e) => setSpot(e.target.value)} />
                </div>
                <div className='form-add-div'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' required onChange={(e) => setLocation(e.target.value)} />
                </div>
            </form>
        </div>
        <div className='modal-footer'>
            <button onClick={() => setOpenAddPlaceModal(false)} className='cancel-btn'>Cancel</button>
            <button className='add-place-btn' onClick={handleAddBtn}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default index;

