// @flow
import React, { Component } from "react";
import { Option } from "topsoil-js";
import {
  TabPane,
  Tab
} from "components";
import {
  CheckBox,
  LeftLabelledInput,
  LeftLabelledSelect,
  RadioButton
} from "components/bootstrap";
import AxisExtents from "./AxisExtents";
import LambdaInput from "./LambdaInput";

const classes = {
  subpanel: "d-flex flex-row flex-wrap align-items-start",
  formGroup: "form-group m-2",
  controlList: "list-unstyled ml-3"
}

type Props = {
  plot: {},
  onOptionChanged: Function,
  onSetExtents: Function,
  snapToWetherillConcordia: Function
};

export class TopsoilPlotPanel extends Component<Props> {
  constructor(props) {
    super(props);

    this.handleSetExtents = this.handleSetExtents.bind(this);
  }

  handleSetExtents(xMin, xMax, yMin, yMax) {
    const {
      plot: { options },
      onSetExtents
    } = this.props;

    onSetExtents(
      xMin || options[Option.X_MIN],
      xMax || options[Option.X_MAX],
      yMin || options[Option.Y_MIN],
      yMax || options[Option.Y_MAX]
    );
  }

  render() {
    const {
      plot: { options },
      onOptionChanged,
      snapToWetherillConcordia
    } = this.props;
    return (
      <div className="topsoil-plot-panel bg-white rounded">
        <TabPane>
          <Tab label="Axis Styling" idPrefix="axisStyling">
            <AxisStylingPanel
              options={options}
              onOptionChanged={onOptionChanged}
              onSetExtents={this.handleSetExtents}
            />
          </Tab>
          <Tab label="Data Options" idPrefix="dataOptions">
            <DataOptionsPanel
              options={options}
              onOptionChanged={onOptionChanged}
            />
          </Tab>
          <Tab label="Plot Features" idPrefix="plotFeatures">
            <PlotFeaturesPanel
              options={options}
              onOptionChanged={onOptionChanged}
              snapToWetherillConcordia={snapToWetherillConcordia}
            />
          </Tab>
          <Tab label="Constants" idPrefix="constants">
            <ConstantsPanel
              options={options}
              onOptionChanged={onOptionChanged}
            />
          </Tab>
        </TabPane>
      </div>
    );
  }
}

const AxisStylingPanel = ({ options, onOptionChanged, onSetExtents }) => {
  return (
    <div className={classes.subpanel}>
      <div className={classes.formGroup}>
        <LeftLabelledInput
          id="plotTitleInput"
          label="Title:"
          type="text"
          value={options[Option.TITLE]}
          onChange={e => onOptionChanged(Option.TITLE, e.target.value)}
        />
      </div>
      
      <div className={`${classes.formGroup} d-flex flex-column align-items-center`}>
        <LeftLabelledInput
          id="xAxisInput"
          label="X&nbsp;Axis:"
          type="text"
          value={options[Option.X_AXIS]}
          onChange={e => onOptionChanged(Option.X_AXIS, e.target.value)}
        />
        <AxisExtents 
          axis="x"
          axisMin={options[Option.X_MIN]}
          axisMax={options[Option.X_MAX]}
          onSetExtents={(min, max) => onSetExtents(min, max, null, null)}
        />
      </div>

      <div className={`${classes.formGroup} d-flex flex-column align-items-center`}>
        <LeftLabelledInput
          id="yAxisInput"
          label="Y&nbsp;Axis:"
          type="text"
          value={options[Option.Y_AXIS]}
          onChange={e => onOptionChanged(Option.Y_AXIS, e.target.value)}
        />
        <AxisExtents 
          axis="y"
          axisMin={options[Option.Y_MIN]}
          axisMax={options[Option.Y_MAX]}
          onSetExtents={(min, max) => onSetExtents(null, null, min, max)}
        />
      </div>
    </div>
  );
};

const DataOptionsPanel = ({ options, onOptionChanged }) => {
  return (
    <div className={classes.subpanel}>
      <div className={classes.formGroup}>
        <LeftLabelledSelect
          id="isotopeSystemSelect"
          label="Isotope&nbsp;System:"
          value={options[Option.ISOTOPE_SYSTEM]}
          onChange={e => onOptionChanged(Option.ISOTOPE_SYSTEM, e.target.value)}
        >
          <option value="Generic">Generic</option>
          <option value="Uranium Lead">U-Pb</option>
          <option value="Uranium Thorium">U-Th</option>
        </LeftLabelledSelect>
        <LeftLabelledSelect
          id="uncertaintySelect"
          label="Uncertainty:"
          value={options[Option.UNCERTAINTY]}
          onChange={e => onOptionChanged(Option.UNCERTAINTY, e.target.value)}
        >
          <option value={1.0}>1σ</option>
          <option value={2.0}>2σ</option>
        </LeftLabelledSelect>
      </div>

      <div className={classes.formGroup}>
        <CheckBox
          id="pointsCheckBox"
          label="Points"
          checked={options[Option.POINTS]}
          onChange={e => onOptionChanged(Option.POINTS, e.target.checked)}
        />
        <ul className={classes.controlList}>
          <li>
            <LeftLabelledInput
              id="pointsColorInput"
              label="Fill:"
              type="color"
              value={options[Option.POINTS_FILL]}
              onChange={e => onOptionChanged(Option.POINTS_FILL, e.target.value)}
            />
          </li>
          {/* <li>
            <RangeSlider
              label="Opacity"
              sliderWidth="3.75em"
              min={0}
              max={100}
              value={options[Option.POINTS_OPACITY] * 100}
              step={5}
              onChange={e => onOptionChanged(Option.POINTS_OPACITY, e.target.value / 100)}
            />
          </li> */}
        </ul>
      </div>

      <div className={classes.formGroup}>
        <RadioButton
          id="ellipsesRadioButton"
          label="Error&nbsp;Ellipses"
          group="error"
          checked={options[Option.ELLIPSES]}
          onChecked={e => {
            onOptionChanged(Option.ELLIPSES, true);
            onOptionChanged(Option.ERROR_BARS, false);
          }}
        />
        <ul className={classes.controlList}>
          <li>
            <LeftLabelledInput
              id="ellipsesColorInput"
              label="Fill"
              type="color"
              value={options[Option.ELLIPSES_FILL]}
              onChange={e =>
                onOptionChanged(Option.ELLIPSES_FILL, e.target.value)
              }
            />
          </li>
          {/* <li>
            <RangeSlider
              label="Opacity"
              sliderWidth="3.75em"
              min={0}
              max={100}
              value={options[Option.ELLIPSES_OPACITY] * 100}
              step={5}
              onChange={e => onOptionChanged(Option.ELLIPSES_OPACITY, e.target.value / 100)}
            />
          </li> */}
        </ul>

        <RadioButton
          id="errorBarsRadioButton"
          label="Error&nbsp;Bars"
          group="error"
          checked={options[Option.ERROR_BARS]}
          onChecked={e => {
            onOptionChanged(Option.ERROR_BARS, true);
            onOptionChanged(Option.ELLIPSES, false);
          }}
        />
        <ul className={classes.controlList}>
          <li>
            <LeftLabelledInput
              id="errorBarsColorInput"
              label="Fill"
              type="color"
              value={options[Option.ERROR_BARS_FILL]}
              onChange={e =>
                onOptionChanged(Option.ERROR_BARS_FILL, e.target.value)
              }
            />
          </li>
          {/* <li>
            <RangeSlider
              label="Opacity"
              sliderWidth="3.75em"
              min={0}
              max={100}
              value={options[Option.ERROR_BARS_OPACITY] * 100}
              step={5}
              onChange={e => onOptionChanged(Option.ERROR_BARS_OPACITY, e.target.value / 100)}
            />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

const PlotFeaturesPanel = ({
  options,
  onOptionChanged,
  snapToWetherillConcordia
}) => {
  let systemControls = "";
  switch (options[Option.ISOTOPE_SYSTEM]) {
    case "Uranium Lead":
      systemControls = UPbFeatures(
        options,
        onOptionChanged,
        snapToWetherillConcordia
      );
      break;
    case "Uranium Thorium":
      systemControls = UThFeatures(options, onOptionChanged);
      break;
  }

  return <div className={classes.subpanel}>{systemControls}</div>;
};

const UPbFeatures = (options, onOptionChanged, snapToWetherillConcordia) => {
  const concordiaType = options[Option.CONCORDIA_TYPE];

  return (
    <React.Fragment>
      <div className={classes.formGroup}>
        <CheckBox
          id="concordiaCheckBox"
          label="Concordia"
          checked={options[Option.CONCORDIA_LINE]}
          onChange={e =>
            onOptionChanged(Option.CONCORDIA_LINE, e.target.checked)
          }
        />
        <ul className={classes.controlList}>
          <li>
            <CheckBox
              id="concordiaEnvelopeCheckBox"
              label="Error&nbsp;Envelope"
              checked={options[Option.CONCORDIA_ENVELOPE]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE, e.target.checked)
              }
            />
          </li>
          <li>
            <RadioButton
              id="wetherillRadioButton"
              label="Wetherill"
              group="concordia-type"
              checked={concordiaType === "wetherill"}
              onChecked={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "wetherill");
              }}
            />
            <ul className={classes.controlList}>
              <li>
                <button 
                  className="btn btn-sm btn-outline-topsoil rounded-pill mx-auto"
                  onClick={snapToWetherillConcordia}
                  disabled={options[Option.CONCORDIA_LINE] && concordiaType !== "wetherill"}
                >
                  Snap to Corners
                </button>
              </li>
            </ul>
          </li>
          <li>
            <RadioButton
              id="teraWasserburgRadioButton"
              label="Tera-Wasserburg"
              group="concordia-type"
              checked={options[Option.CONCORDIA_TYPE] === "tera-wasserburg"}
              onChecked={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "tera-wasserburg");
              }}
            />
          </li>
          <li>
            <LeftLabelledInput
              id="concordiaLineColorInput"
              label="Line&nbsp;Fill"
              type="color"
              value={options[Option.CONCORDIA_LINE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_LINE_FILL, e.target.value)
              }
            />
          </li>
          <li>
            <LeftLabelledInput
              id="concordiaEnvelopeColorInput"
              label="Envelope&nbsp;Fill"
              type="color"
              value={options[Option.CONCORDIA_ENVELOPE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE_FILL, e.target.value)
              }
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

const UThFeatures = (options, onOptionChanged) => {
  return (
    <React.Fragment>
      <div className={classes.formGroup}>
        <CheckBox
          id="evolutionCheckBox"
          label="Evolution&nbsp;Matrix"
          checked={options[Option.EVOLUTION]}
          onChange={e => onOptionChanged(Option.EVOLUTION, e.target.checked)}
        />
      </div>
    </React.Fragment>
  );
};

const ConstantsPanel = ({ options, onOptionChanged }) => {
  return (
    <div className={classes.subpanel}>
      <div className={classes.formGroup}>
        <LambdaInput
          id="lambda230Input"
          label="Lambda&nbsp;230:"
          defaultValue={options[Option.LAMBDA_230]}
          onSetValue={newValue => onOptionChanged(Option.LAMBDA_230, newValue)}
        />
      </div>
      <div className={classes.formGroup}>
        <LambdaInput
          id="lambda234Input"
          label="Lambda&nbsp;234:"
          defaultValue={options[Option.LAMBDA_234]}
          onSetValue={newValue => onOptionChanged(Option.LAMBDA_234, newValue)}
        />
      </div>
      <div className={classes.formGroup}>
        <LambdaInput
          id="lambda235Input"
          label="Lambda&nbsp;235:"
          defaultValue={options[Option.LAMBDA_235]}
          onSetValue={newValue => onOptionChanged(Option.LAMBDA_235, newValue)}
        />
      </div>
      <div className={classes.formGroup}>
        <LambdaInput
          id="lambda238Input"
          label="Lambda&nbsp;238:"
          defaultValue={options[Option.LAMBDA_238]}
          onSetValue={newValue => onOptionChanged(Option.LAMBDA_238, newValue)}
        />
      </div>
    </div>
  );
};
