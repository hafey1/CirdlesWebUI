import React, { Component } from 'react';

const styles = {
  body: {
    maxHeight: "18em"
  }
}

type Props = {
  id?: string,
  label: string,
  collapsed: boolean,
  onClick: Function,
  children?: []
};

class Collapse extends Component {
  render() {
    const { id, label, collapsed, onClick, children } = this.props;
    return (
      <div>
        <a
          onClick={onClick}
          data-toggle="collapse"
          href={`#${id}`}
          role="button"
          aria-expanded={!collapsed}
          aria-controls={id}
        >
          <span>{collapsed ? "+ " : "- "}</span>
          {label}
        </a>
        <div
          id={id}
          className={`collapse${collapsed ? "" : " show"}`}
        >
          <div className="card card-body overflow-auto" style={styles.body}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
 
export default Collapse;