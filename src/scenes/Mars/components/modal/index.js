import React, { Component } from "react";
import "../../../../styles/mars.scss";

class Modal extends Component {
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  };

  constructor(props) {
    super(props);

    this.state = { isOpen: this.props.show };
  }

  render() {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div styleName="backdrop">
        <div styleName="modal">
          {this.props.children}
          <div>
            <button
              onClick={e => this.setState({ isOpen: !this.state.isOpen })}
            ></button>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
