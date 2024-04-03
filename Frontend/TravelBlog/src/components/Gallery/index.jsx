import React, { Component } from "react";
import TajMahal from "../../assets/TajMahal.webp"
import Navbar from "../Navbar";

import './index.css'

const galleryLettersArr = ["G", "A", "L", "L", "E", "R", "Y"];

export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="gallery-title-holder">
          {galleryLettersArr.map((eachChar) => {
            return <div className="gallery-title-box">{eachChar}</div>;
          })}
        </div>
        <div className="gallery-img-card">
          <img src={TajMahal} alt="gallery-img" className="gallery-img" />
        </div>
      </div>
    );
  }
}
