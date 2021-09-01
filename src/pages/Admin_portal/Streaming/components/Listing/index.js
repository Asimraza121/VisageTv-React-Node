import React, { useState, useEffect } from "react";

//package import

import {
  Table,
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

//user import

import { headersDel, headersGet } from "../../../../../Services/API";
import { admin_api_routes } from "../../../../../Services/Routes/API";
import { VideoPlayer } from "../../../../../Components/VideoPlayer";
import DeleteModal from "../../../../../Components/Admin/DeleteModal";
import { admin_routes, root_routes } from "../../../../../Services/Routes/APP";
import { listingMoviesStyles } from "../../../../../assets/styles/jss/admin/movies";

//page

const Listing = () => {
  //hooks

  const classes = listingMoviesStyles();
  const history = useHistory();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);
  const [Movies, setMovies] = useState([]);
  const [api, setApi] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  //listing api call

  const getMovies = () => {
    setApi(false);
    setLoader(true);
    headersGet(admin_api_routes?.get_streamings)
      .then((res) => {
        if (res?.status === 200) {
          setMovies(res.data);
        } else {
          setAlertMsg(res?.data?.message);
          setAlertType("warning");
          setAlert(true);
        }
        setLoader(false);
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 401) {
          localStorage.clear();
          history.push(root_routes?.root);
        } else {
          setAlertMsg(response?.data?.message);
          setAlertType("warning");
          setAlert(true);
        }
        setLoader(false);
      });
  };

  //calling movies listing

  useEffect(() => {
    getMovies();
  }, []);

  //close alert

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  //del movie

  const delProduct = (id) => {
    setLoader(true);
    headersDel(admin_api_routes?.del_streaming + id)
      .then((res) => {
        if (res?.status === 200) {
          setAlertMsg(res?.data?.message);
          setAlertType("success");
          setAlert(true);
          setApi(true);
        } else {
          setAlertMsg(res?.data?.message);
          setAlertType("warning");
          setAlert(true);
        }
        setLoader(false);
      })
      .catch((err) => {
        const { response } = err;
        if (response.status === 401) {
          localStorage.clear();
          history.push(root_routes?.root);
        } else {
          setAlertMsg(response?.data?.message);
          setAlertType("error");
          setAlert(true);
        }
        setLoader(false);
      });
  };

  //add movie route

  const addMovieHandler = () => {
    history.push(root_routes?.admin + admin_routes?.streaming_add);
  };

  //edit movie handler

  const editMovieHandler = (movie) => {
    history.push({
      pathname: root_routes?.admin + admin_routes?.streaming_edit,
      state: {
        movie: movie,
      },
    });
  };

  useEffect(() => {
    api && getMovies();
  }, [api]);

  const modalOpenHandler = (url) => {
    setSelectedUrl(url);
    setVideoPlayer(true);
  };

  const modalCloseHandler = () => {
    setVideoPlayer(false);
  };

  //render

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"} margin={4}>
        <Typography variant={"h4"}>Streaming Channel</Typography>
        <Box>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={addMovieHandler}
          >
            Add Streaming
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Default</TableCell>
              <TableCell align={"center"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Movies?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell>{row?.description}</TableCell>
                <TableCell>{row?.categories}</TableCell>
                <TableCell>{row?.stream_count}</TableCell>
                <TableCell>{row?.stream_location}</TableCell>
                <TableCell>{row?.featured ? "True" : "False"}</TableCell>
                <TableCell>{row?.default ? "True" : "False"}</TableCell>
                <TableCell>
                  <Box display={"flex"}>
                    <Box>
                      <IconButton onClick={() => editMovieHandler(row)}>
                        <Edit />
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton
                        color={"secondary"}
                        onClick={() => delProduct(row?._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                    <Box>
                      <Button
                        color={"primary"}
                        variant={"contained"}
                        onClick={() => modalOpenHandler(row?.stream_url)}
                      >
                        View Streaming
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* alert  */}

      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          elevation={6}
          severity={alertType}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      {/* loader */}

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="primary" />
      </Backdrop>

      {/* video modal */}

      <VideoPlayer
        open={videoPlayer}
        handleClose={modalCloseHandler}
        selected={selectedUrl}
      />

      {/* del streaming channel */}

      {/* <DeleteModal open={delModal} handleClose={delModalClose} text={"Streaming Channel"} id={} /> */}
    </Box>
  );
};

export default Listing;
