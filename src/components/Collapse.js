// @flow
import React, { Component } from "react";
import { UID } from "react-uid";

const styles = {
  labelGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer"
  },
  icon: {
    width: "1.5em",
    height: "1.5em",
    textAlign: "center"
  },
  label: {
    cursor: "pointer"
  },
  content: {
    marginLeft: "2em",
    display: "block",
    overflow: "auto"
  },
  contentCollapsed: {
    display: "none",
    overflow: "auto"
  }
};

type Props = {
  collapsed: boolean,
  label: string,
  onClick: Function,
  style?: {}
};

export class Collapse extends Component<Props> {

  render() {
    const { collapsed, label, onClick, style, children } = this.props;
    return (
      <UID name={id => `Collapse_${id}`}>
        {id =>
          <div style={style}>
            <div 
              onClick={onClick}
              style={styles.labelGroup}
            >
              <span style={styles.icon}>{collapsed ? "+" : "-"}</span>
              <label htmlFor={id} style={styles.label}>{label}</label>
            </div>
            <div id={id} style={collapsed ? styles.contentCollapsed : styles.content}>
              {children}
            </div>
          </div>
        }
      </UID>
    );
  }

}
