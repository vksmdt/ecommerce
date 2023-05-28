import React from "react";
import Logo from "../header/Logo.js";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App for Android and IOS Mobile Phone </p>
        <img src={playStore} alt="" />

        <img src={appStore} alt="" />
      </div>
      <div className="midFooter">
        <Logo />
        <p>High Quality is our First Priority</p>
        <p>Copyrights 2021 &copy; VikasMoodotiya </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="/">Instagram</a>
        <a href="/">YouTube</a>
        <a href="/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
