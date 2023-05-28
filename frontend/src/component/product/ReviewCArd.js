import React from "react";

import profilepng from "../../images/profile.png";
import { Rating } from "@mui/material";

const ReviewCArd = (props) => {
  const options = {
    readOnly: true,
    precision: 0.5,
    value: Number(props.review.rating),

  };

  return (
    <div className="reviewCard">
      <img src={profilepng} alt="User" />
      <p>{props.review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{props.review.comment}</span>
    </div>
  );
};

export default ReviewCArd;
