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
          <Link to="/">
          <img
            src={travelblogLogo}
            alt="travel-logo"
            className="travel_blog_logo"
          />
          </Link>
        </div>
        <div className="nav-content">
          <Link to="/">
            <div className="nav-name">Home</div>
          </Link>
          <Link to="/places">
            <div className="nav-name">Places</div>
          </Link>
          <Link to="/gallery">
            <div className="nav-name">Gallery</div>
          </Link>
          <Link to="/favourites">
            <div className="nav-name">Favourites</div>
          </Link>
          <Link to="/contact">
            <div className="nav-name">Contact</div>
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <>
              <CgProfile className="profile-icon" />
            </>
          </Link>
          <FaSearch className="search-icon" />
        </div>
      </div>
    );
  }
}
