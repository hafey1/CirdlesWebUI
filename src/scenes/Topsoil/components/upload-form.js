import React, { Component } from 'react';

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px"
  }
}

type Props = {
  template: string,

  onSubmit: Function,
  onChangeTableFile: Function,
  onChangeTemplate: Function
}
class UploadForm extends Component<Props> {

  render() { 
    const { 
      template,
      onSubmit, 
      onChangeTableFile, 
      onChangeTemplate 
    } = this.props;
    return (
      <div style={styles.form}>
        <div>
          <label>Select a table file (.csv, .tsv): </label>
          <input type="file" name="tableFile" onChange={onChangeTableFile}></input>
        </div>
        <br />
        <div>
          <label>Data Template: </label>
          <select name="template" value={template} onChange={onChangeTemplate}>
            <option value="DEFAULT">Default</option>
            <option value="SQUID_3">Squid 3</option>
          </select>
        </div>
        <br />
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  }

}
 
export default UploadForm;