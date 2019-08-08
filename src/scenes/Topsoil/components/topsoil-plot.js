// @flow
import React, { Component } from "react";
import { ScatterPlot, Feature, Option } from "topsoil-js";
import { svgElementToBlob } from "actions";
import { colors } from "constants";
import { Button } from "components";

const styles = {
  container: {
    width: "100%",
    height: "100%"
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // subtract padding from width
    width: "calc(100% - 1em)",
    height: "2em",
    padding: "0.5em",
    backgroundColor: colors.whiteGray,
    border: "solid " + colors.topsoilDark,
    borderWidth: "0 0 1px 0"
  },
  button: {
    margin: "0.25em"
  },
  root: {
    width: "100%",
    // subtract buttonBar from height
    height: "calc(100% - 3em)",
    backgroundColor: colors.white
  }
}

type Props = {
  plot: {},
  onZoomEnd: Function
};

class TopsoilPlot extends Component<Props> {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();

    this.instance = null;
    this.resizeHandler = () => {
      if (this.instance) this.instance.update();
    }
    
    this.handleResetView = this.handleResetView.bind(this);
    this.handleExportSVG = this.handleExportSVG.bind(this);
  }

  componentDidMount() {
    this.rootRef.current.addEventListener("resize", this.resizeHandler);
    window.addEventListener("resize", this.resizeHandler);

    if (this.shouldCreatePlot()) {
      this.createPlot();
    }
  }

  componentWillUnmount() {
    this.rootRef.current.removeEventListener("resize", this.resizeHandler);
    window.removeEventListener("resize", this.resizeHandler);
  }

  componentDidUpdate() {

    if (this.shouldCreatePlot()) {
      this.createPlot();
      return;
    }

    if (this.instance) {
      if (this.shouldDestroyPlot()) {
        this.destroyPlot();
        return;
      }

      this.instance.data = this.props.plot.data;
      this.instance.options = this.props.plot.options;
    }
  }

  handleResetView() {
    if (!this.instance) return;
    this.instance.resetView();
  }

  handleExportSVG() {
    if (!this.instance) return;

    const blob = svgElementToBlob(this.instance.svg.node()),
      url = URL.createObjectURL(blob),
      link = document.createElement("a");

    link.href = url;
    link.download = this.options[Option.TITLE] || "download";

    const onClick = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        link.removeEventListener("click", onClick);
      }, 150);
    };
    link.addEventListener("click", onClick);
    link.click();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.buttonBar}>
          {this.renderButton("Reset View", this.handleResetView)}
          {this.renderButton("Download SVG", this.handleExportSVG)}
        </div>
        <div ref={this.rootRef} style={styles.root} />
      </div>
    );
  }

  renderButton(label, onClick) {
    return (
      <Button
        onClick={onClick}
        size={14}
        color={colors.topsoilDark}
        margin="0.25em"
        disabled={! this.instance}
      >
        {label}
      </Button>
    );
  }

  shouldCreatePlot() {
    return dataPresent(this.props.plot.data) && !this.instance;
  }

  createPlot() {
    const layers = [Feature.POINTS, [Feature.ELLIPSES, Feature.ERROR_BARS], [Feature.CONCORDIA, Feature.EVOLUTION]];
    this.instance = new ScatterPlot(
      this.rootRef.current,
      this.props.plot.data,
      this.props.plot.options,
      layers
    );
    this.instance.onZoomEnd = this.props.onZoomEnd;

    // add cursor styles to draggable area
    const draggableArea = this.instance.displayContainer.node();
    draggableArea.classList.add("draggable");
    draggableArea.addEventListener("mousedown", () => draggableArea.classList.add("mouseHold"));
    draggableArea.addEventListener("mouseup", () => draggableArea.classList.remove("mouseHold"));

    this.forceUpdate();
  }

  shouldDestroyPlot() {
    return !dataPresent(this.props.plot.data) && this.instance;
  }

  destroyPlot() {
    this.rootRef.current.innerHTML = "";
    this.instance = null;
    this.forceUpdate();
  }
}

function dataPresent(arr) {
  return arr && arr.length > 0;
}

export default TopsoilPlot;
