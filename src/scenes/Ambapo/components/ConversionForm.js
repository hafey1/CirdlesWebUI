// @flow
import React, { Component } from 'react';

const CoordinateFormGroup = ({ 
  title, 
  idPrefix, 
  latitude,
  longitude,
  datum, 
  inputDisabled,
  onChange
}) => {
  return (
    <div className="form-group d-flex flex-column align-items-center">
      <h3>{title}</h3>
      <div className="container p-2">
        <div className="row m-2">
          <label htmlFor={`${idPrefix}-latitude`} className="col my-auto px-0">Latitude:</label>
          <input 
            id={`${idPrefix}-latitude`}
            data-prefix={idPrefix}
            data-value-name="latitude"
            className="form-control col ambapo-input" 
            placeholder={inputDisabled ? "" : "Latitude"}
            value={latitude || ""}
            onChange={onChange}
            disabled={inputDisabled || false}
          />
        </div>
        <div className="row m-2">
          <label htmlFor={`${idPrefix}-longitude`} className="col my-auto px-0">Longitude:</label>
          <input 
            id={`${idPrefix}-longitude`}
            data-prefix={idPrefix}
            data-value-name="longitude"
            className="form-control col" 
            placeholder={inputDisabled ? "" : "Longitude"}
            value={longitude || ""}
            onChange={onChange}
            disabled={inputDisabled || false}
          />
        </div>
        <div className="row m-2">
          <label htmlFor={`${idPrefix}-datum`} className="col my-auto px-0">Datum:</label>
          <select 
            id={`${idPrefix}-datum`}
            data-prefix={idPrefix}
            data-value-name="datum"
            className="form-control col" 
            value={datum || "WGS84"}
            onChange={onChange}
          >
            <option value="WGS84">WGS84</option>
            <option value="NAD83">NAD83</option>
          </select>
        </div>
      </div>
    </div>
  );
}

type Coordinates = {
  latitude: string,
  longitude: string,
  datum: string
}

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  latLongToLatLongData: any,
  convertLatlongToLatlong: Function,
  from: Coordinates,
  to: Coordinates,
  onValueChange: Function
};

class ConversionForm extends Component<Props> {

  render() { 

    const {
      from,
      to,
      handleSubmit,
      onValueChange
    } = this.props;

    return (
      <div className="ambapo container d-flex flex-column justify-content-center h-100">
        <div className="row p-3 justify-content-center border border-ambapo rounded">
          <div className="col-auto">
            <CoordinateFormGroup
              title="From"
              idPrefix="from"
              latitude={from.latitude}
              longitude={from.longitude}
              datum={from.datum}
              onChange={onValueChange}
            />
          </div>
          <div className="col-auto d-flex flex-column justify-content-center">
            <button onClick={handleSubmit} className="my-auto btn btn-outline-ambapo rounded-pill">Convert</button>
          </div>
          <div className="col-auto">
            <CoordinateFormGroup
              title="To"
              idPrefix="to"
              latitude={to.latitude}
              longitude={to.longitude}
              datum={to.datum}
              onChange={onValueChange}
              inputDisabled={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
 
export default ConversionForm;