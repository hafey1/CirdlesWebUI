import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorPop, setAnchorPop] = React.useState(null);

  const handleClickPop = event => {
    setAnchorPop(event.currentTarget);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePop = () => {
    setAnchorPop(null);
  };

  const handleHelp = () => {
    window.open("http://cirdles.org/projects/mars/");
  };
  const open = Boolean(anchorPop);
  const id = open ? "popover" : undefined;

  return (
    <div className="nav-item">
      <Button
        style={{
          fontSize: "16px",
          textTransform: "none",
          color: "#007bff",
          marginTop: "2px"
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        About
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem aria-describedby={id} onClick={handleClickPop}>
          About
        </MenuItem>
        <Popover
          style={{ width: "80%" }}
          id={id}
          open={open}
          anchorEl={anchorPop}
          onClose={handleClosePop}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left"
          }}
        >
          <div>
            <Typography variant="h5">MARS</Typography>
            <Typography variant="subtitle1">
              Middleware for Assisting the Registration of Samples
            </Typography>
            <Typography variant="body1">
              MARS is being developed to explore the automation of registering
              legacy samples at SESAR (System for Earth Sample Registration)
              with pertinent metadata and a IGSN (International GeoSample
              Number). The initial targeted repository is the cores collection
              of Scripps Institution of Oceanography.
            </Typography>
          </div>
        </Popover>
        <MenuItem onClick={handleHelp}>Help</MenuItem>
      </Menu>
    </div>
  );
}
