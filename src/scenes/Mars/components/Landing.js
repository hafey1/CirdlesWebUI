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
        <div className="landing-subtitle__notice">
          NOTE: All samples are registered using our testbed and all IGSNs are
          temporary.
        </div>
      </div>
    </div>
  );
};
export default Landing;
