// @flow
import React, { Component } from 'react';

const styles = {
  toolbarTail: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.25em",
    width: "calc(100% - 1em)"
  }
}

type Props = {
  children?: []
}

export class Toolbar extends Component<Props> {

  render() { 
    return (
      <div className="position-relative">
        
        <ul className="nav flex-column align-items-stretch p-2">
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child);
          })}
        </ul>

        <div style={styles.toolbarTail}>
          <a
            href="https://cirdles.org/projects/topsoil/"
            target="_blank"
            className="text-center my-2"
          >
            CIRDLES.org
          </a>
          <a
            href="https://github.com/CIRDLES/Topsoil"
            target="_blank"
            className="text-center my-2"
          >
            GitHub
          </a>
          <a
            href="https://github.com/CIRDLES/CirdlesWebUI/issues/new"
            target="_blank"
            className="text-center my-2"
          >
            Report Issue
          </a>
          <a
            href="https://github.com/CIRDLES/CirdlesWebUI/wiki/Topsoil"
            target="_blank"
            className="text-center my-2"
          >
            Help
          </a>
        </div>
      </div>
    );
  }
}

export const ToolbarSpacer = () => {
  return (
    <li className="nav-item m-2" />
  );
}

export const ToolbarButton = ({ text, ...rest }) => {
  return (
    <li className="nav-item m-2">
      <button
        className="btn btn-sm btn-outline-topsoil rounded-pill w-100"
        {...rest}
      >
        {text}
      </button>
    </li>
  );
}