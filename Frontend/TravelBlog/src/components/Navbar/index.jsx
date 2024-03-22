import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

import travelblogLogo from "../../assets/travelblogLogo.png";

export default class index extends Component {
  render() {
    return (
      <div className="navbar">
        <div>
          <img
            src={travelblogLogo}
            alt="travel-logo"
            className="travel_blog_logo"
          />
        </div>
        <div className="nav-content">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/places">
            <div>Places</div>
          </Link>
          <Link to="/gallery">
            <div>Gallery</div>
          </Link>
          <Link to="/favourites">
            <div>Favourites</div>
          </Link>
          <Link to="/contact">
            <div>Contact</div>
          </Link>
        </div>
        <div>
          <CgProfile className="profile-icon" />
          <FaSearch className="search-icon" />
        </div>
      </div>
    );
  }
}
