// @flow
import React, { Component } from "react";

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
      <div className="tab-container d-flex flex-column h-100">
        <ul className="nav nav-tabs mx-1 mt-1 rounded">
          {children.map(tab => {
            const { label, idPrefix } = tab.props,
                  isActive = (activeTab.props.label === label);
            return (
              <li key={`${idPrefix}Tab`} className="nav-item">
                <a className={`nav-link${isActive ? " active" : ""}`} id={`${idPrefix}Tab`} data-toggle="tab" onClick={() => this.handleClickTab(tab)} href="#" role="tab" aria-controls={idPrefix} aria-selected={isActive}>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="tab-content flex-grow-1 overflow-auto rounded">
          {children.map(tab => {
            const { label, idPrefix, children } = tab.props,
                  isActive = (activeTab.props.label === label);
            return (
              <div key={`${idPrefix}TabContent`} className={`tab-pane fade${isActive ? " show active" : ""}`} id={idPrefix} role="tabpanel" aria-labelledby={`${idPrefix}Tab`}>
                {children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

type TabProps = {
  label: string,
  idPrefix: string,
  children?: []
}

export class Tab extends Component<TabProps> {
  render() {
    throw new Error(
      "The 'Tab' component should only be used to pass child props to a 'TabPane', and should not be rendered.",
    );
  }
}