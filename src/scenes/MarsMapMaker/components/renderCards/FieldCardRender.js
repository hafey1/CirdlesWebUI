import React from "react";
import "../../../../styles/marsMapMaker.scss";
import CheckboxExample from "../CheckBox";
import { isMetaDataAddCard, lengthCheckedValue } from "../../util/helper";


class FieldCardRender extends React.Component {

  render() {

    const rObj = this.props.rObject;

    if (this.props.cardType === "white"){
      return (
        <div className="ui label">
            <div className="fieldContainerDisabled">
              <object>
                <div className="check__box">
                  <CheckboxExample
                    id={rObj.id}
                    isChecked={rObj.ent[rObj.id].isGreen}
                  />
                </div>
                <div dir="rtl" className="description__title">
                  {rObj.ent[rObj.id].header.includes("<METADATA_AD")
                    ? "Added Optional Metadata"
                    : rObj.ent[rObj.id].header}
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
                {rObj.ent[rObj.id].isGreen ? rObj.filterDrop() : null}
              </object>
            </div>
          </div>
      );
    }

    if (this.props.cardType === "editIcon") {
      return (
        <div className="ui label">
              <div className="fieldContainer1">
                <object>
                  <div className="check__box">
                    <CheckboxExample id={rObj.id} />
                  </div>
                  <div dir="rtl" className="description__title">
                    {rObj.fieldTitle}
                  </div>
                  <div className="description__value">
                    {" "}
                    {":        " + lengthCheckedValue(rObj.fieldValue)}
                    {rObj.fieldValue.length > 25 ? (
                      <span className="hiddentext">
                        {rObj.fieldValue}
                      </span>
                    ) : null}
                  </div>
                </object>
                <object className="arrow">
                  <i className="fa fa-angle-double-right"></i>
                </object>
                <object className="descriptionMapped" align="right">
                  {rObj.areEditing === true ? (
                    <div className="description__mapped__content">
                      {rObj.hasInit &&
                      rObj.ent[rObj.id].sesarTitle !== "" &&
                      rObj.ent[rObj.id].sesarTitle !== "none"
                        ? lengthCheckedValue(rObj.updatedValue)
                        : "Not Mapped"}
                      {rObj.updatedValue.length > 25 ? (
                        <span className="hiddentext">
                          {rObj.updatedValue}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "inline-block",
                        width: "150px",
                        paddingRight: "35px"
                      }}
                      class="ui input"
                    >
                      <input
                        value={rObj.updatedValue}
                        onKeyPress={rObj.forceEdit}
                        onChange={rObj.forceEdit}
                        style={{ display: "inline-block", width: "150px" }}
                        type="text"
                        placeholder="Edit Content..."
                      />
                    </div>
                  )}

                  {rObj.ent[rObj.id].isGreen
                    ? rObj.filterDrop()
                    : null}
                  {rObj.hasInit === true &&
                  rObj.ent[rObj.id].sesarTitle !== "none" &&
                  rObj.ent[rObj.id].sesarTitle !== "" &&
                  rObj.isMultiValue(
                    rObj.ent[rObj.id].sesarTitle
                  ) === false ? (
                    <div class="pad">
                      <button
                        onClick={() => rObj.areEditing()}
                        class="ui icon button edit_icon"
                      >
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  ) : (
                    <div class="hidden_pad">
                      <button class="ui icon button edit_icon">
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  )}

                  <div class="hidden_pad">
                    <div style={{ float: "right" }}>
                      {rObj.hasInit && rObj.index !== -1
                        ? rObj.currentTotal()
                        : ""}
                    </div>
                  </div>
                </object>
              </div>
            </div>
      );
    }

    if (this.props.cardType === "metaCardAdd") {
      return (
        <div className="ui label">
              <div className="fieldContainerMetadataAdd">
                <object>
                  <div className="check__box">
                    {rObj.id === 0 ? (
                      <div> </div>
                    ) : (
                      <div>
                        <CheckboxExample id={rObj.id} />
                      </div>
                    )}
                  </div>
                  <div dir="rtl" className="description__title">
                    {rObj.id === 0
                      ? "Required Metadata"
                      : "Added Optional Metadata"}
                  </div>
                  <div className="description__value"></div>
                </object>
                <object className="arrow">
                  <i className="fa fa-angle-double-right"></i>
                </object>
                <object className="descriptionMapped" align="right">
                  {rObj.areEditing === true ? (
                    <div className="description__mapped__content">
                      {rObj.hasInit &&
                      rObj.ent[rObj.id].sesarTitle !== "" &&
                      rObj.ent[rObj.id].sesarTitle !== "none"
                        ? lengthCheckedValue(
                            rObj.ent[rObj.id].value
                          )
                        : "Not Mapped"}
                      {rObj.fieldValue.length > 25 ? (
                        <span className="hiddentext">
                          {rObj.fieldValue}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "inline-block",
                        width: "150px",
                        paddingRight: "35px"
                      }}
                      class="ui input"
                    >
                      <input
                        onKeyPress={rObj.forceEdit}
                        style={{ display: "inline-block", width: "150px" }}
                        type="text"
                        placeholder={rObj.editPlaceholderText()}
                      />
                    </div>
                  )}
                  {rObj.ent[rObj.id].isGreen
                    ? rObj.filterDrop()
                    : null}
                  {rObj.hasInit === true &&
                  rObj.ent[rObj.id].sesarTitle !== "" &&
                  rObj.isMultiValue(
                    rObj.ent[rObj.id].sesarTitle
                  ) === false ? (
                    <div class="pad">
                      <button
                        onClick={() => rObj.areEditing()}
                        class="ui icon button edit_icon"
                      >
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  ) : (
                    <div class="hidden_pad">
                      <button class="ui icon button edit_icon">
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  )}
                  <div class="hidden_pad">
                    <div style={{ float: "right" }}>
                      {rObj.hasInit && rObj.index !== -1
                        ? rObj.entMultiSizeCount(
                            rObj.id,
                            rObj.ent[rObj.id].sesarTitle
                          )
                        : ""}
                    </div>
                  </div>
                </object>
              </div>
            </div>
      );
    }

    if (this.props.cardType === "metaCard") {
      <div className="ui label">
            <div className="fieldContainerMetadata">
              <object>
                <div className="check__box">
                  <CheckboxExample id={rObj.id} />
                </div>
                <div dir="rtl" className="description__title">
                  {rObj.fieldTitle}
                </div>
                <div className="description__value">
                  {" "}
                  {":        " + lengthCheckedValue(rObj.fieldValue)}
                </div>
              </object>
              <object className="arrow">
                <i className="fa fa-angle-double-right"></i>
              </object>
              <object className="descriptionMapped" align="right">
                {rObj.hasInit === true &&
                rObj.areEditing === true ? (
                  <div className="description__mapped__content">
                    {lengthCheckedValue(rObj.ent[rObj.id].value)}
                    <span className="hiddentext">
                      {rObj.ent[rObj.id].value}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "inline-block",
                      width: "150px",
                      paddingRight: "35px"
                    }}
                    class="ui input"
                  >
                    <input
                      value={rObj.updatedValue}
                      onChange={rObj.forceEdit}
                      onKeyPress={rObj.forceEdit}
                      style={{ display: "inline-block", width: "150px" }}
                      type="text"
                      placeholder={rObj.editPlaceholderText()}
                    />
                  </div>
                )}
                {rObj.ent[rObj.id].isGreen
                  ? rObj.filterDrop()
                  : null}
                {rObj.hasInit === true &&
                rObj.ent[rObj.id].sesarTitle !== "" &&
                rObj.isMultiValue(rObj.ent[rObj.id].sesarTitle) ===
                  false ? (
                  <div class="pad">
                    <button
                      onClick={() => rObj.areEditingFunction()}
                      class="ui icon button edit_icon"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </div>
                ) : (
                  <div class="hidden_pad">
                    <button class="ui icon button edit_icon">
                      <i class="fa fa-edit"></i>
                    </button>
                  </div>
                )}
                <div class="hidden_pad">
                  <div style={{ float: "right" }}>
                    {rObj.hasInit && rObj.index !== -1
                      ? "sss" +
                      rObj.entMultiSizeCount(
                          rObj.id,
                          rObj.ent[rObj.id].sesarTitle
                        )
                      : ""}
                  </div>
                </div>
              </object>
            </div>
          </div>
    }
    

    if (this.props.cardType === "fieldContainer1") {
      return (
        <div className="ui label">
              <div className="fieldContainer1">
                <object>
                  <div className="check__box">
                    <CheckboxExample id={rObj.id} />
                  </div>
                  <div dir="rtl" className="description__title">
                    {rObj.fieldTitle}
                  </div>
                  <div className="description__value">
                    {" "}
                    {":        " + lengthCheckedValue(rObj.fieldValue)}
                    {rObj.fieldValue.length > 25 ? (
                      <span className="hiddentext">
                        {rObj.fieldValue}
                      </span>
                    ) : null}
                  </div>
                </object>
                <object className="arrow">
                  <i className="fa fa-angle-double-right"></i>
                </object>
                <object className="descriptionMapped" align="right">
                  {/*left side of fieldcard*/}
                  {rObj.areEditing === true ? (
                    <div className="description__mapped__content">
                      {lengthCheckedValue(rObj.fieldValue)}{" "}
                      {rObj.fieldValue.length > 25 ? (
                        <span className="hiddentext">
                          {rObj.fieldValue}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "inline-block",
                        width: "150px",
                        paddingRight: "35px"
                      }}
                      class="ui input"
                    >
                      <input
                        value={rObj.updatedValue}
                        onChange={rObj.forceEdit}
                        onKeyPress={rObj.forceEdit}
                        style={{ display: "inline-block", width: "150px" }}
                        type="text"
                        placeholder={rObj.editPlaceholderText()}
                      />
                    </div>
                  )}
                  {rObj.ent[rObj.id].isGreen
                    ? rObj.filterDrop()
                    : null}

                  {/*If dropdown value is chosen, and value is not a multivalue display edit button */}
                  {rObj.hasInit === true &&
                  rObj.ent[rObj.id].sesarTitle !== "none" &&
                  rObj.ent[rObj.id].sesarTitle !== "" &&
                  rObj.isMultiValue(
                    rObj.props.ent[rObj.id].sesarTitle
                  ) === false ? (
                    <div class="pad">
                      <button
                        onClick={() => rObj.areEditingFunction()}
                        class="ui icon button edit_icon"
                      >
                        <i class="fa fa-edit"></i>
                      </button>
                    </div>
                  ) : (
                    <div class="pad">
                      {" "}
                      {rObj.hasInit && rObj.index !== -1
                        ? "ddd" +
                          rObj.entMultiSizeCount(
                            rObj.id,
                            rObj.ent[rObj.id].sesarTitle
                          )
                        : null}
                    </div>
                  )}
                </object>
              </div>
            </div>
      );
    }
  }
  
};

export default FieldCardRender;