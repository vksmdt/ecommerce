import React from "react";
import "./aboutSection.css";
import { Instagram, YouTube } from "@mui/icons-material";
import { Avatar, Button, Typography } from "@mui/material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/mr.vikasmoodotiya/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dtrgf59tl/image/upload/v1684772639/avatars/h2z52o9hgiupy6y7iwzq.jpg"
              alt="Founder"
            />
            <Typography>Vikas Moodotiya</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">SOCIAL</Typography>
            <a href="https://youtube.com/@MrVikaass  " target="blank">
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a
              href="https://www.instagram.com/mr.vikasmoodotiya/"
              target="blank"
            >
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
