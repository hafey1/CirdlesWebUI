// @flow
import React, { Component } from "react";
import ConversionForm from "./components/ConversionForm";

import "styles/ambapo.scss";
import axios from "axios";
import { AMBAPO_ENDPOINT } from "constants";

type Props = {
  convertLatlongToLatlong: Function
};

const initialState = {
  from: {
    latitude: "",
    longitude: "",
    datum: "NAD83"
  },
  to: {
    latitude: "",
    longitude: "",
    datum: "WGS84"
  }
}

type State = Readonly<typeof initialState>;

class AmbapoPage extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = initialState;

    const _this: any = this;
    _this.latLongToLatLongSubmit = this.latLongToLatLongSubmit.bind(this);
    _this.handleValueChange = this.handleValueChange.bind(this);
  }

  latLongToLatLongSubmit() {
    const { latitude, longitude, datum: fromDatum } = this.state.from,
          toDatum = this.state.to.datum;
    if (latitude && longitude && fromDatum && toDatum) {
      const data = { latitude, longitude, fromDatum, toDatum };
      axios.post(AMBAPO_ENDPOINT + "/latlong/latlong", data)
        .then(response => {
          const to = { ...this.state.to };
          to.latitude = response.data.latitude;
          to.longitude = response.data.longitude;
          this.setState({ to });
        });
    }
  }
  handleValueChange(event) {
    const prefix = event.target.dataset.prefix,
          valueName = event.target.dataset.valueName;

    const state = { ...this.state };
    state[prefix][valueName] = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <ConversionForm 
        from={this.state.from}
        to={this.state.to}
        handleSubmit={this.latLongToLatLongSubmit}
        onValueChange={this.handleValueChange}
      />
    );
  }
}

export default AmbapoPage;
