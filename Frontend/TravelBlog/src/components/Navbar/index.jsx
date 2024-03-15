import React, { Component } from 'react';
import "./index.css"
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

import travelblogLogo from "../../assets/travelblogLogo.png"

export default class index extends Component {
  render() {
    return (
      <div className='navbar'>
        <div>
            <img src={travelblogLogo} alt='travel-logo' className='travel_blog_logo' />
        </div>
        <div className='nav-content'>
            <div>Home</div>
            <div>Places</div>
            <div>Gallery</div>
            <div>Favourites</div>
            <div>Contact</div>
        </div>
        <div>
            <CgProfile className='profile-icon' />
            <FaSearch className='search-icon' />
        </div>
      </div>
    );
  }
}
