import React, { Fragment } from "react";

//package import

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";

//component

const DeleteModal = ({ handleClose, open, text }) => {
  //render

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure ? you Want to Delete this {}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant={"contained"}>
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" variant={"contained"}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteModal;
