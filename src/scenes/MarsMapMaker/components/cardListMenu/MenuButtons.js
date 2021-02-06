import React from "react";
import { connect } from "react-redux";
import "../../../../styles/marsMapMaker.scss";
import { hideField } from "../../../../actions/marsMapMaker";

import { PreviewModal } from "./PreviewModal";

const MenuButtons = props => {
  const checkStore = () => {
    console.log(props.fileMeta);
    console.log(props.persist);
    console.log(props.multiCount);
    console.log(props.ent);
    console.log(props.toggleArr);
  };

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
              onClick={() => props.hideField(props.isHidden)}
            >
              {" "}
              {props.hideText()}{" "}
            </button>
            <PreviewModal ent={props.ent} />
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

const mapStateToProps = state => {
  return {
    ent: state.marsMapMaker.entries,
    persist: state.marsMapMaker.persistingMetaData,
    toggleArr: state.marsMapMaker.toggleArr,
    hasDateFormat: state.marsMapMaker.hasChosenDateFormat,
    storeJsFile: state.marsMapMaker.jsFile,
    multiCount: state.marsMapMaker.totalMultiCount,
    fileMeta: state.marsMapMaker.fileMetadata,
    isHidden: state.marsMapMaker.hide
  };
};

export default connect(
  mapStateToProps,
  { hideField }
)(MenuButtons);
