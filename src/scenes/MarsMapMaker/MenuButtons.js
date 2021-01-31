import React from "react";

//#### TODO: move store content from cardlist into this file as neccessary
const MenuButton = props => {
  return (
    <div className="col-sm-4 col-md-3 order-md-4 align-self-center text-center">
      <div
        className="card-transparent border-0 mx-auto text-center"
        style={{ maxWidth: "175px" }}
      >
        <div className="card-body">
          <div class="btn-group-vertical">
            <button
              className="btn bg-white btn-outline-dark"
              onClick={() => setHide(!hide)}
            >
              {" "}
              {hideOrShow()}{" "}
            </button>
            <button
              className="btn bg-white btn-outline-dark"
              onClick={() => {
                props.callback(previewPopUp());
              }}
            >
              {" "}
              Preview Map{" "}
            </button>
            <button
              className="btn bg-white btn-outline-dark"
              onClick={checkStore}
            >
              {" "}
              Help{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
