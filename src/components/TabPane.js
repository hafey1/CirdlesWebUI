// @flow
import React, { Component } from "react";
import { Tab } from "./Tab";

type Props = {
  children: []
};

type State = {
  activeTab: string
};

export class TabPane extends Component<Props, State> {
  constructor(props) {
    super(props);

    const activeTab = props.children[0];

    this.state = {
      activeTab
    };
  }

  handleClickTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tab-pane">
        <ol className="tab-list">
          {children.map(tab => {
            const { label } = tab.props;
            return (
              <Tab
                key={label}
                isActive={activeTab.props.label === label}
                label={label}
                onClick={() => this.handleClickTab(tab)}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map(tab => {
            if (activeTab.props.label === tab.props.label) return tab.props.children;
            return undefined;
          })}
        </div>
      </div>
    );
  }
}
