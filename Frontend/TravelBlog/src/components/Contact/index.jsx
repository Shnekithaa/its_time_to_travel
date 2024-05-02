import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Navbar";
import contactImg from "../../assets/contactImg.avif";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import "./index.css";

const contactLettersArr = [
  "C",
  "O",
  "N",
  "T",
  "A",
  "C",
  "T",
  <LiaPhoneVolumeSolid className="contact-icon" />,
  "U",
  "S",
];

const index = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9n3kqva", "template_kcuacd9", form.current, {
        publicKey: "wEL8XNI5wiAbqoqID",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div>
      <Navbar />
      <div className="gallery-title-holder">
        {contactLettersArr.map((eachChar, index) => {
          return (
            <div className="gallery-title-box" key={index}>
              {eachChar}
            </div>
          );
        })}
      </div>
      <div className="contact-card">
        <form ref={form} onSubmit={sendEmail}>
          <div className="contact-input">
            <FaRegCircleUser className="contact-icon-name" />
            <input type="text" placeholder="Name" name="user_name" className="contact-input-box" />
          </div>
          <div className="contact-input">
            <MdEmail className="contact-icon-name" />
            <input type="email" placeholder="Email" name="user_email" className="contact-input-box" />
          </div>
          <div>
            <textarea placeholder="Message" name="message" rows='6' cols='42' className="contact-text-area"></textarea>
          </div>
          <div>
            <button type="submit" value="Send" className="contact-send-btn">
              Send Message
            </button>
          </div>
        </form>
        <img src={contactImg} className="contact-img" />
      </div>
    </div>
  );
};

export default index;

// https://youtu.be/bMq2riFCF90?si=rl2ZxNnJnezC2TCW --> Send mail api
