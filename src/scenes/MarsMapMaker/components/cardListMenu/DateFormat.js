import React from "react";
import { connect } from "react-redux";
import "../../../../styles/marsMapMaker.scss";
import { DATE_FORMAT_OPTION } from "../../util/constants";

import DateDropdown from "./dateDropdown/DateDropdown";
import CenturyDropDown from "./dateDropdown/CenturyDropDown";

const DateFormat = props => {
  // checks the redux store to see if any of the fieldCards have selected a date
  const dateSelected = () => {
    let found = false;
    if (props.hasInit) {
      for (let i = 0; i < props.ent.length; i++) {
        if (
          props.ent[i].sesarTitle === "collection_start_date" ||
          props.ent[i].sesarTitle === "collection_end_date"
        ) {
          found = true;
        }
      }
      return found;
    }
  };

  return (
    <div className="col-sm-4 col-md-3 order-md-3 align-self-center">
      <div
        className="card-transparent border-0 mx-auto text-center"
        style={{ maxWidth: "200px" }}
      >
        <div className="card-body">
          {props.hasDateFormat === false || dateSelected() === false ? (
            <div>Select Date Format</div>
          ) : (
            <div
              style={{
                visibility: "hidden",
                width: "100%",
                maxWidth: "400px",
                textAlign: "center"
              }}
            >
              Select Date Format
            </div>
          )}

          {props.hasDateFormat === false || dateSelected() === false ? (
            <div
              className="toolbar__date__format"
              style={{ borderColor: "red" }}
            >
              <DateDropdown list={DATE_FORMAT_OPTION} />
              <CenturyDropDown />
            </div>
          ) : (
            <div className="toolbar__date__format">
              <DateDropdown list={DATE_FORMAT_OPTION} />
              <CenturyDropDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    hasInit: state.marsMapMaker.hasInit,
    ent: state.marsMapMaker.entries,
    hasDateFormat: state.marsMapMaker.hasChosenDateFormat
  };
};

export default connect(
  mapStateToProps,
  {}
)(DateFormat);
