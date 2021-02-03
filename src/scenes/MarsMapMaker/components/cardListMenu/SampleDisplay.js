import React from "react";
import "../../../../styles/marsMapMaker.scss";

const SampleDisplay = props => {
  return (
    <div className="col-sm-4 col-md-3 order-md-1 align-self-center">
      <div
        className="card-transparent border-0 mx-auto text-center"
        style={{ maxWidth: "300px" }}
      >
        <div className="card-body">
          <div className="card-title border-0">Change Displayed Sample</div>
          <div className="card-text">Current Sample Row: {props.toggleInd}</div>
          <div className="btn-group-vertical text-center btn-margin">
            <button
              className="btn bg-white btn-outline-dark"
              onClick={() => props.reset()}
            >
              Refresh
            </button>
            <div className="btn-group">
              <button
                className="btn bg-white btn-outline-dark"
                onClick={() => props.up()}
              >
                <i class="fa fa-arrow-up"></i>
              </button>
              <button
                className="btn bg-white btn-outline-dark"
                onClick={() => props.down()}
              >
                <i class="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDisplay;
