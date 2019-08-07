// @flow
import React, { Component } from 'react';
import logo from "img/logos/Topsoil.svg";
import { colors } from 'constants';
import { Button } from 'components';

const styles = {
  toolbar: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    maxWidth: "7.75em",
    padding: "0.25em",
    height: "calc(100% - 0.5em)"
  },
  toolbarTail: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0.25em",
    width: "calc(100% - 1em)"
  },
  logo: {
    backgroundImage: `url(${logo})`,
    width: "5em",
    height: "5em",
    margin: "0.25em"
  },
  toolbarItem: {
    margin: "0.25em"
  },
  tailLink: {
    textAlign: "center",
    margin: "0.25em 0"
  },
  separator: {
    height: "0.2em",
    margin: "0.25em",
    backgroundColor: colors.darkGray
  }
}

type Props = {
  style?: {},
  children: []
}

export class Toolbar extends Component<Props> {

  render() { 

    return (
      <div style={styles.toolbar}>
        
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child);
        })}

        <div style={styles.toolbarTail}>
          <div style={styles.logo} />
          <a
            href="http://cirdles.org/projects/topsoil/"
            target="_blank"
            style={styles.tailLink}
          >
            CIRDLES.org
          </a>
          <a
            href="https://github.com/CIRDLES/Topsoil"
            target="_blank"
            style={styles.tailLink}
          >
            GitHub
          </a>
          <a
            href="https://github.com/CIRDLES/CirdlesWebUI/issues/new"
            target="_blank"
            style={styles.tailLink}
          >
            Report Issue
          </a>
        </div>
      </div>
    );
  }
}

export const ToolbarSeparator = () => {
  return (
    <div style={styles.separator} />
  );
}

export const ToolbarButton = ({ onClick, text, ...rest }) => {
  return (
    <Button onClick={onClick} size={14} color={colors.topsoilDark} {...rest}>{text}</Button>
  );
}