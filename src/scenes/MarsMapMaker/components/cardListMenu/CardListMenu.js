import React from "react";
import "../../../../styles/marsMapMaker.scss";
import MapOutput from "./MapOutput";
import SampleDisplay from "./SampleDisplay";
import DateFormat from "./DateFormat";
import MenuButtons from "./MenuButtons";

const CardListMenu = props => {
  return (
    <div className="row" style={{ backgroundColor: "rgb(207, 216, 220)" }}>
      <MapOutput />
      <SampleDisplay
        toggleInd={props.toggleIndex}
        reset={() => props.refreshButton()}
        up={() => props.upArrowToggle()}
        down={() => props.downArrowToggle()}
      />

      <DateFormat />
      <MenuButtons hideText={() => props.hideOrShow()} />
    </div>
  );
};

export default CardListMenu;
