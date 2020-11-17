import React from "react";
import "../../../styles/mars.scss";
import { MARS_VERSION } from "../../../constants/api";

//This component is a presentational component
//Purpose: Show the landing page for MARS
const Landing = (props) => {
  return (
    <div className="landing">
      <div className="landing-title">
        MARS { MARS_VERSION }
        <div className="landing-subtitle">
          Middleware for Assisting the Registration of Samples
        </div>
      </div>
    </div>
  );
};
export default Landing;
