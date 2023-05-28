import React from "react";
import Logoo from "../../../images/logo.png";

const Logo = () => {
  return (
    <div>
      <img
        className="my-3"
        src={Logoo}
        alt="Loading"
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default Logo;
