import React, { useEffect, useState, memo } from "react";

//package import

import {
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  Button,
} from "@material-ui/core";
import ReactPlayer from "react-player";

//user import

//component

export const VideoPlayer = memo(({ open, handleClose, selected }) => {
  //hooks

  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    selected && setSelectedUrl(selected);
  }, [selected]);

  //render

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={"lg"}
    >
      <DialogTitle>Video Player</DialogTitle>
      <Box margin={4}>
        <ReactPlayer url={selectedUrl} controls />
      </Box>
      <DialogActions>
        <Box margin={4}>
          <Button
            onClick={handleClose}
            variant={"contained"}
            color={"secondary"}
          >
            Close{" "}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
});
