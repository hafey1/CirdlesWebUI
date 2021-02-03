// @flow
import React from "react";
import Radium from "radium";
import { ProjectCard } from "components";
import {
  SQUID,
  AMBAPO,
  TOPSOIL,
  MARS,
  MARSMAPMAKER,
  SQUIDINK
} from "constants";

type Props = {
  history: any
};

const HomePage = ({ history }: Props) => {
  return (
    <div style={styles.home}>
      <div style={styles.cardWrapper}>
        <ProjectCard
          description={SQUID.description}
          logo={require("img/logos/Squid.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/squid")}
          style={{ margin: 40 }}
        />
        {/*Temporarily unavailable
          uncomment ambapo references in App.js as well
          <ProjectCard
          description={AMBAPO.description}
          logo={require("img/logos/Ambapo.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/ambapo")}
          style={{ margin: 40 }}
        />*/}
        <ProjectCard
          description={TOPSOIL.description}
          logo={require("img/logos/Topsoil.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/topsoil")}
          style={{ margin: 40 }}
        />
        <ProjectCard
          description={MARS.description}
          logo={require("img/logos/Mars.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/mars")}
          style={{ margin: 40 }}
        />
        <ProjectCard
          description={MARSMAPMAKER.description}
          logo={require("img/logos/MarsMapMaker.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/marsMapMaker")}
          style={{ margin: 40 }}
        />
        <ProjectCard
          description={SQUIDINK.description}
          logo={require("img/logos/SquidInk.svg")}
          width={300}
          height={300}
          onClick={() => history.push("/squidink")}
          style={{ margin: 40 }}
        />
      </div>
    </div>
  );
};

const styles = {
  home: {
    height: "100%"
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default Radium(HomePage);
