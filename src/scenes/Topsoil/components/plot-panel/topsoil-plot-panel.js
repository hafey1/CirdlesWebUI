// @flow
import React, { Component } from "react";
import { Option } from "topsoil-js";
import { Input, Select, RadioButton, CheckBox, TabPane, Tab, Button, RangeSlider } from "components";
import AxisExtents from "./axis-extents";
import Lambda from "./lambda";
import { colors } from "constants";

const styles = {
  optionList: {
    margin: "5px",
    listStyle: "none"
  },
  optionListLabel: {
    display: "inline-block",
    margin: 0
  },
  subpanel: {
    display: "flex",
    flexFlow: "row wrap",
    // subtract padding from height
    maxHeight: "calc(100% - 1em)",
    padding: "0.5em"
  },
  controlBlock: {
    margin: "0.5em"
  }
};

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
      <div className="topsoil-plot-panel">
        <TabPane>
          <Tab label="Axis Styling">
            <AxisStylingPanel
              options={options}
              onOptionChanged={onOptionChanged}
              onSetExtents={this.handleSetExtents}
            />
          </Tab>
          <Tab label="Data Options">
            <DataOptionsPanel
              options={options}
              onOptionChanged={onOptionChanged}
            />
          </Tab>
          <Tab label="Plot Features">
            <PlotFeaturesPanel
              options={options}
              onOptionChanged={onOptionChanged}
              snapToWetherillConcordia={snapToWetherillConcordia}
            />
          </Tab>
          <Tab label="Constants">
            <ConstantsPanel options={options} onOptionChanged={onOptionChanged} />
          </Tab>
        </TabPane>
      </div>
      
    );
  }
}

const AxisStylingPanel = ({ options, onOptionChanged, onSetExtents }) => {
  return (
    <div style={styles.subpanel}>
      <Input
        value={options[Option.TITLE]}
        label="Title"
        onChange={e => onOptionChanged(Option.TITLE, e.target.value)}
        style={styles.controlBlock}
      />

      <div style={styles.controlBlock}>
        <Input
          label="X Axis"
          value={options[Option.X_AXIS]}
          onChange={e => onOptionChanged(Option.X_AXIS, e.target.value)}
        />
        <AxisExtents
          axisMin={options[Option.X_MIN]}
          axisMax={options[Option.X_MAX]}
          onSetExtents={(min, max) => onSetExtents(min, max, null, null)}
        />
      </div>

      <div style={styles.controlBlock}>
        <Input
          label="Y Axis"
          value={options[Option.Y_AXIS]}
          onChange={e => onOptionChanged(Option.Y_AXIS, e.target.value)}
        />
        <AxisExtents
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
    <div style={styles.subpanel}>
      <div style={styles.controlBlock}>
        <Select
          label="Isotope System"
          value={options[Option.ISOTOPE_SYSTEM]}
          onChange={e => onOptionChanged(Option.ISOTOPE_SYSTEM, e.target.value)}
        >
          <option value="Generic">Generic</option>
          <option value="Uranium Lead">U-Pb</option>
          <option value="Uranium Thorium">U-Th</option>
        </Select>
        <Select
          label="Uncertainty"
          value={options[Option.UNCERTAINTY]}
          onChange={e => onOptionChanged(Option.UNCERTAINTY, e.target.value)}
        >
          <option value={1.0}>1σ</option>
          <option value={2.0}>2σ</option>
        </Select>
      </div>

      <div style={styles.controlBlock}>
        <CheckBox
          label="Points"
          checked={options[Option.POINTS]}
          onChange={e => onOptionChanged(Option.POINTS, e.target.checked)}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.POINTS_FILL]}
              type="color"
              onChange={e =>
                onOptionChanged(Option.POINTS_FILL, e.target.value)
              }
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

      <div style={styles.controlBlock}>
        <RadioButton
          label="Error Ellipses"
          group="error"
          selected={options[Option.ELLIPSES]}
          onSelected={e => {
            onOptionChanged(Option.ELLIPSES, true);
            onOptionChanged(Option.ERROR_BARS, false);
          }}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.ELLIPSES_FILL]}
              type="color"
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
          label="Error Bars"
          group="error"
          selected={options[Option.ERROR_BARS]}
          onSelected={e => {
            onOptionChanged(Option.ERROR_BARS, true);
            onOptionChanged(Option.ELLIPSES, false)
          }}
        />
        <ul style={styles.optionList}>
          <li>
            <Input
              label="Fill"
              value={options[Option.ERROR_BARS_FILL]}
              type="color"
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

const PlotFeaturesPanel = ({ options, onOptionChanged, snapToWetherillConcordia }) => {
  let systemControls = "";
  switch (options[Option.ISOTOPE_SYSTEM]) {
    case "Uranium Lead":
      systemControls = UPbFeatures(options, onOptionChanged, snapToWetherillConcordia);
      break;
    case "Uranium Thorium":
      systemControls = UThFeatures(options, onOptionChanged);
      break;
  }

  return <div style={styles.subpanel}>{systemControls}</div>;
};

const UPbFeatures = (options, onOptionChanged, snapToWetherillConcordia) => {

  const concordiaType = options[Option.CONCORDIA_TYPE];

  return (
    <React.Fragment>
      <div style={styles.controlBlock}>
        <CheckBox
          label="Concordia"
          checked={options[Option.CONCORDIA_LINE]}
          onChange={e =>
            onOptionChanged(Option.CONCORDIA_LINE, e.target.checked)
          }
        />
        <ul style={styles.optionList}>
          <li>
            <CheckBox
              label="Error Envelope"
              checked={options[Option.CONCORDIA_ENVELOPE]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_ENVELOPE, e.target.checked)
              }
            />
          </li>
          <li>
            <RadioButton
              label="Wetherill"
              group="concordia-type"
              selected={concordiaType === "wetherill"}
              onSelected={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "wetherill");
              }}
            />
            <ul style={styles.optionList}>
              <li>
                <Button
                  size={12}
                  color={colors.topsoilDark}
                  disabled={options[Option.CONCORDIA_LINE] && concordiaType !== "wetherill"}
                  onClick={snapToWetherillConcordia}
                >
                  Snap to Corners
                </Button>
              </li>
            </ul>
          </li>
          <li>
            <RadioButton
              label="Tera-Wasserburg"
              group="concordia-type"
              selected={options[Option.CONCORDIA_TYPE] === "tera-wasserburg"}
              onSelected={e => {
                onOptionChanged(Option.CONCORDIA_TYPE, "tera-wasserburg");
              }}
            />
          </li>
          <li>
            <Input
              label="Line Fill"
              type="color"
              value={options[Option.CONCORDIA_LINE_FILL]}
              onChange={e =>
                onOptionChanged(Option.CONCORDIA_LINE_FILL, e.target.value)
              }
            />
          </li>
          <li>
            <Input
              label="Envelope Fill"
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
      <div style={styles.controlBlock}>
        <CheckBox
          label="Evolution Matrix"
          checked={options[Option.EVOLUTION]}
          onChange={e => onOptionChanged(Option.EVOLUTION, e.target.checked)}
        />
      </div>
    </React.Fragment>
  );
};

const ConstantsPanel = ({ options, onOptionChanged }) => {
  return (
    <div style={styles.subpanel}>
      <Lambda
        label="Lambda 230"
        defaultValue={options[Option.LAMBDA_230]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_230, newValue)}
        style={styles.controlBlock}
      />
      <Lambda
        label="Lambda 234"
        defaultValue={options[Option.LAMBDA_234]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_234, newValue)}
        style={styles.controlBlock}
      />
      <Lambda
        label="Lambda 235"
        defaultValue={options[Option.LAMBDA_235]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_235, newValue)}
        style={styles.controlBlock}
      />
      <Lambda
        label="Lambda 238"
        defaultValue={options[Option.LAMBDA_238]}
        onSetValue={newValue => onOptionChanged(Option.LAMBDA_238, newValue)}
        style={styles.controlBlock}
      />
    </div>
  );
};
