import React from "react";
import "../../../../styles/marsMapMaker.scss";
import CheckboxExample from "../CheckBox";
import { isMetaDataAddCard, lengthCheckedValue } from "../../util/helper";


class FieldCardRender extends React.Component {

  render() {

    const rObj = this.props.rObject;

    return (
      
      <div className="ui label">
            <div className="fieldContainerDisabled">
              <object>
                <div className="check__box">
                  <CheckboxExample
                    greenCallback={() => rObj.greenCallback()}
                    isChecked={rObj.isChecked}
                  />
                </div>
                <div dir="rtl" className="description__title">
                  {rObj.fieldTitle}
                </div>
                <div className="description__value">
                  {" "}
                  {":        " + lengthCheckedValue(rObj.fieldValue)}
                </div>
              </object>
              <object className="descriptionMapped" align="right">
                <div className="description__mapped__content"> </div>
                <div
                  style={{
                    paddingTop: "10px",
                    paddingLeft: "62px",
                    float: "right",
                    display: "inline"
                  }}
                ></div>
                {rObj.filterDrop()}
              </object>
            </div>
          </div>
    );
  }
  
};

export default FieldCardRender;