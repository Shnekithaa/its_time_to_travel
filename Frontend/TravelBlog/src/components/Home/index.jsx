import React, { Component } from "react";
import "./index.css"

import Navbar from "../Navbar"

import shore_carousel from "../../assets/shore_carousel.avif"
import flower_carousel_3 from "../../assets/flower_carousel_3.jpg"
import mountain_carousel_1 from "../../assets/mountain_carousel_1.avif";

export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={shore_carousel} alt="First slide" className="shore_carousel" />
              
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src={mountain_carousel_1}
                alt="Second slide"
                className="mountain_carousel"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100"
                src={flower_carousel_3}
                alt="Third slide"
                className="flower_carousel"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
