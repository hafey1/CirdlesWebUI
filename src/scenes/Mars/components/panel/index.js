//import CSSModules from 'react-css-modules'
import "../../../../styles/mars.scss";

import React from "react";

const Panel = ({ children, name }) => {
  return (
    <div className="panel">
      <h1 className="header">{name}</h1>
      <div className="content">{children}</div>
    </div>
  );
};

export default Panel;
