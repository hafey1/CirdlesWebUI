import React, { Component } from "react";
import { Link as RouterLink, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import "../../../styles/squidink.scss";


class Landing extends Component {
    render() {
        return (
            <div style={{ height: "100%", marginTop: "5rem" }} className="landingSquid">
                <div className="row">
                    <div className="col s12 center-align">
                        <h2 style={{ color: "black" }}>
                            Welcome
                        </h2>
                        <br />
                        <Grid
                            container
                            justify="center"
                            alignItems="baseline"
                            spacing={5}
                        >
                            <Grid item xs={6}>
                                <div className="col s6" style={{ display: "inline-block" }}>
                                    <Button variant="outlined" color="gray" component={RouterLink} to="/squidink/register">
                                        Register
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="col s6" style={{ display: "inline-block" }}>
                                    <Button variant="outlined" color="gray" component={RouterLink} to="/squidink/login">
                                        Log In
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
