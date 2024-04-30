import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import eiffel_tower from "../../assets/eiffel_tower.jpg";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddPlaceModal from "../AddPlaceModal";
import UpdatePlaceModal from "../UpdatePlaceModal";
import "./index.css";

const profileLettersArr = ["P", "L", "A", "C", "E", "S"];

const index = () => {
  const [spots, setSpots] = useState([]);
  const [openAddPlaceModal, setOpenAddPlaceModal] = useState(false);
  const [editSpotId, setEditSpotId] = useState(null);

  const handleEditClick = (id) => {
    setEditSpotId(id);
  };

  const handleCloseEditModal = () => {
    setEditSpotId(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/places")
      .then((response) => {
        setSpots(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="places-top">
        <div className="profile-title-holder">
          {profileLettersArr.map((eachLetter) => {
            return <div className="profile-letters">{eachLetter}</div>;
          })}
        </div>
        <IoMdAddCircle
          className="add-icon"
          onClick={() => setOpenAddPlaceModal(true)}
        />
        {openAddPlaceModal && (
          <AddPlaceModal setOpenAddPlaceModal={setOpenAddPlaceModal} />
        )}
      </div>
      <div className="places-holder">
        {spots.map((eachSpot) => (
          <div className="spot-img-card" key={eachSpot._id}>
            <img src={eiffel_tower} alt="gallery-img" className="gallery-img" />
            <div className="spot-info">
              <div>{eachSpot.spot}</div>
              <div>{eachSpot.location}</div>
            </div>
            <div className="icon-holder">
              <FaRegEdit
                className="edit-place-icon"
                onClick={() => handleEditClick(eachSpot._id)}
              />
              <MdDeleteOutline className="delete-place-icon" />
            </div>
            {editSpotId === eachSpot._id && (
              <UpdatePlaceModal
                setOpenEditPlaceModal={handleCloseEditModal}
                spotId={eachSpot._id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
