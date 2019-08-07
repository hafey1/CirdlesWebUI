import { Option } from "topsoil-js";

const DefaultOptions = {};
DefaultOptions[Option.TITLE] = "New Plot";
DefaultOptions[Option.UNCERTAINTY] = 1.0;
DefaultOptions[Option.ISOTOPE_SYSTEM] = "Uranium Lead";

DefaultOptions[Option.X_AXIS] = "X Axis";
DefaultOptions[Option.X_MIN] = 0.0;
DefaultOptions[Option.X_MAX] = 1.0;

DefaultOptions[Option.Y_AXIS] = "Y Axis";
DefaultOptions[Option.Y_MIN] = 0.0;
DefaultOptions[Option.Y_MAX] = 1.0;

DefaultOptions[Option.POINTS] = true;
DefaultOptions[Option.POINTS_FILL] = "#4682b4";
DefaultOptions[Option.POINTS_OPACITY] = 1.0;
DefaultOptions[Option.ELLIPSES] = true;
DefaultOptions[Option.ELLIPSES_FILL] = "#ff0000";
DefaultOptions[Option.ELLIPSES_OPACITY] = 1.0
DefaultOptions[Option.ERROR_BARS] = false;
DefaultOptions[Option.ERROR_BARS_FILL] = "#000000";
DefaultOptions[Option.ERROR_BARS_OPACITY] = 1.0;

DefaultOptions[Option.CONCORDIA_TYPE] = "wetherill";
DefaultOptions[Option.CONCORDIA_LINE] = true;
DefaultOptions[Option.CONCORDIA_LINE_FILL] = "#0000ff";
DefaultOptions[Option.CONCORDIA_LINE_OPACITY] = 1.0;
DefaultOptions[Option.CONCORDIA_ENVELOPE] = true;
DefaultOptions[Option.CONCORDIA_ENVELOPE_FILL] = "#d3d3d3";
DefaultOptions[Option.CONCORDIA_ENVELOPE_OPACITY] = 1.0;

DefaultOptions[Option.EVOLUTION] = false;

DefaultOptions[Option.LAMBDA_230] = 9.1705E-6;
DefaultOptions[Option.LAMBDA_234] = 2.82206E-6;
DefaultOptions[Option.LAMBDA_235] = 9.8485e-10;
DefaultOptions[Option.LAMBDA_238] = 1.55125e-10;
DefaultOptions[Option.R238_235S] = 137.88;

export {
  DefaultOptions
};