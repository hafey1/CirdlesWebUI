import "../../../styles/mars.scss";

import React from "react";

const Panel = ({ children, name }) => {
  return (
    <div className="panel">
      <h1 className="panel-header">{name}</h1>
      <div className="panel-content">{children}</div>
    </div>
  );
};

export default Panel;
