import React, { useState } from "react";
import { Button, Modal, Backdrop, Fade, Typography } from "@material-ui/core";

function SimpleMenu() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="nav-item">
      <Button
        style={{
          fontSize: "16px",
          textTransform: "none",
          color: "#007bff",
          marginTop: "2px"
        }}
        onClick={handleOpen}
      >
        About
      </Button>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              width: "50%",
              backgroundColor: "#f8f9fa",
              border: "2px solid #000"
            }}
          >
            <h2 id="transition-modal-title">MARS</h2>
            <h5>Middleware for Assisting the Registration of Samples</h5>
            <p id="transition-modal-description">
              MARS is being developed to explore the automation of registering
              legacy samples at SESAR (System for Earth Sample Registration)
              with pertinent metadata and a IGSN (International GeoSample
              Number). The initial targeted repository is the cores collection
              of Scripps Institution of Oceanography.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SimpleMenu;
