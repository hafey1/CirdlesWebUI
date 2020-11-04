import React from "react";
import "../../../styles/mars.scss";

//This component is a presentational component
//Purpose: Show the landing page for MARS
const Landing = (props) => {
  return (
    <div className="landing">
      <div className="landing-title">
        MARS BETA
        <div className="landing-subtitle">
          Middleware for Assisting the Registration of Samples
        </div>
      </div>
    </div>
  );
};
export default Landing;
