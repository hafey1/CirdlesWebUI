import React from "react";
import "../../../../styles/marsMapMaker.scss";

const HeaderFieldCard = props => {
  return (
    <div className="description">
      <object className="fieldWidget">
        <div
          style={{ fontFamily: "Lucida Grande" }}
          className="description__checkbox"
        >
          Use
        </div>
        <div
          style={{ fontFamily: "Lucida Grande" }}
          dir="rtl"
          className="description__title"
        >
          {"Field"}
        </div>
        <div
          className="description__value"
          style={{ fontFamily: "Lucida Grande" }}
        >
          {" "}
          {": Content"}
        </div>
      </object>
      <object
        style={{
          fontFamily: "Lucida Grande",
          display: "inline-block"
        }}
      >
        <div class="maps__to">Maps To</div>
      </object>
      <object className="descriptionKeyMapped">
        <div
          style={{ fontFamily: "Lucida Grande", whiteSpace: "nowrap" }}
          className="description__mapped__content"
        >
          {"Content : [Field]"}
        </div>
      </object>
    </div>
  );
};

export default HeaderFieldCard;
