// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { HamburgerButton } from 'components';
import { colors, MENU_TRANSITION_TIME_SEC } from 'constants';

type Props = {};

type State = {
  active: boolean,
  showProjects: boolean
};

class BaseNav extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      active: false,
      showProjects: false
    };
    const body = document.body;
    if (body) {
      body.onclick = e => {
        // console.log(this.nav.clientLeft);
        // this.state.active && this.setState({ active: false });
      };
    }
    const _this: any = this;
    _this.hamburgerClicked = this.hamburgerClicked.bind(this);
    _this.projectsClicked = this.projectsClicked.bind(this);
    _this.resetMenu = this.resetMenu.bind(this);
  }

  nav;

  hamburgerClicked(e: Event) {
    e && e.stopPropagation();
    this.setState({ active: !this.state.active });
    setTimeout(
      () => this.setState({ showProjects: false }),
      MENU_TRANSITION_TIME_SEC * 1000
    );
  }

  projectsClicked(e: Event) {
    e && e.stopPropagation();
    this.setState({ showProjects: !this.state.showProjects });
  }

  resetMenu() {
    this.setState({ active: false });
    setTimeout(
      () => this.setState({ showProjects: false }),
      MENU_TRANSITION_TIME_SEC * 1000
    );
  }

  render() {
    const { active, showProjects } = this.state;
    return (
      <nav style={styles.wrapper} ref={nav => (this.nav = nav)}>
        <HamburgerButton
          active={active}
          size={18}
          onClick={this.hamburgerClicked}
          style={styles.hamburger}
        />
        <div
          style={[
            styles.menuWrapper,
            active && {
              visibility: 'visible',
              opacity: 1,
              backgroundColor: colors.dark
            }
          ]}
        >
          <Link to="/" style={styles.link} onClick={this.resetMenu}>
            Home
          </Link>
          <div style={styles.link} onClick={this.projectsClicked}>
            Projects
          </div>
          {showProjects && (
            <div style={styles.projectsWrapper}>
              <Link to="/squid" style={styles.link} onClick={this.resetMenu}>
                Squid
              </Link>
              <Link to="/ambapo" style={styles.link} onClick={this.resetMenu}>
                Ambapo
              </Link>
              <Link to="/topsoil" style={styles.link} onClick={this.resetMenu}>
                Topsoil
              </Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  hamburger: {
    zIndex: 1000,
    margin: 7
  },
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    paddingTop: 35,
    borderRadius: 5,
    opacity: 0,
    visibility: 'hidden',
    transition: `all ${MENU_TRANSITION_TIME_SEC}s ease`
  },
  projectsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10
  },
  link: {
    cursor: 'pointer',
    color: colors.white,
    padding: '0px 25px 15px 15px',
    textDecoration: 'none',
    fontSize: '1.2em',
    userSelect: 'none'
  }
};

export const Nav = Radium(BaseNav);
