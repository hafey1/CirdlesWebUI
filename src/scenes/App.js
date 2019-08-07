// @flow
import React, { Component } from "react";
import Radium from "radium";
import { Switch, Route, withRouter } from "react-router-dom";
import { Header } from "components";
import Home from "./Home";
import Squid from "./Squid";
import Ambapo from "./Ambapo";
import Topsoil from "./Topsoil";
import { HEADER_HEIGHT } from "constants";
import { colors } from "constants";

const routes = {
  "/": {
    title: "CIRDLES Web Services",
    exact: true,
    component: Home
  },
  "/ambapo": {
    title: "Ambapo",
    component: Ambapo
  },
  "/squid": {
    title: "Squid Ink: Squid's Reporting Service (Beta)",
    component: Squid
  },
  "/topsoil": {
    title: "Topsoil",
    component: Topsoil
  }
};

type Props = {
  history: any
};

type State = {
  title: string
};
class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { title: routes[props.history.location.pathname].title };
    const _this: any = this;
    _this.wrapperClicked = this.wrapperClicked.bind(this);
    props.history.listen(l =>
      this.setState({ title: routes[l.pathname].title })
    );
  }

  header;

  wrapperClicked(e: Event) {
    this.header && this.header.closeMenu();
  }

  render() {
    const { title } = this.state;
    let routeComponents = [];
    for (const route in routes) {
      const data = routes[route];
      routeComponents.push(
        <Route
          key={route}
          path={route}
          exact={data.exact}
          component={data.component}
        />
      );
    }
    return (
      <div style={styles.wrapper} onClick={this.wrapperClicked}>
        <Header ref={header => (this.header = header)} title={title} />
        <main style={styles.body}>
          <Switch>{routeComponents}</Switch>
        </main>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.primary
  },
  body: {
    padding: `${HEADER_HEIGHT + 10}px 10px 10px 10px`,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default withRouter(Radium(App));
