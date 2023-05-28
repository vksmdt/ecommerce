import React from "react";

import "./PageNotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Error } from "@mui/icons-material";

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
    
      <Error />
      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageNotFound;
