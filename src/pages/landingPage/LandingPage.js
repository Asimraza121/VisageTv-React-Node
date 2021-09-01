import React, { useContext, useState, useEffect } from "react";

//package import

import { Snackbar, Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

//user import

import "./landingPage.css";
import LiveTv from "../../Components/Livetv/Livetv";
import Movies from "../../Components/Movies/Movies";
import AppContext from "../../context/AppContext";
import { api_routes } from "../../Services/Routes/API";
import { simpleGet } from "../../Services/API";
import { landingStyles } from "../../assets/styles/jss/user";

//component

export default function LandingPage(props) {
  //hooks

  const classes = landingStyles();

  //context

  const {
    currentState,
    keyValue,
    setSelectedUrl,
    setStreamingData,
    streamingData,
  } = useContext(AppContext);

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);

  //life cycle

  useEffect(() => {
    keyValue && currentState && getStreamingData();
  }, [keyValue, currentState]);

  //get streaming data

  const getStreamingData = () => {
    let url =
      currentState === "tv"
        ? api_routes?.get_all_streaming
        : api_routes?.get_all_movies;
    setLoader(true);

    simpleGet(`${url}?category=${keyValue !== "all" ? keyValue : ""}`)
      .then((res) => {
        if (res?.status === 200) {
          setStreamingData(res?.data);
        } else {
          setAlertMsg(res?.data?.message);
          setAlertType("warning");
          setAlert(true);
        }
        setLoader(false);
      })
      .catch((err) => {
        const { response } = err;
        setAlertMsg(response?.data?.message);
        setAlertType("warning");
        setAlert(true);
        setLoader(false);
      });
  };

  useEffect(() => {
    streamingData?.length > 0
      ? setSelectedUrl(streamingData[0]?.stream_url)
      : setSelectedUrl("https://youtu.be/p3GVmp7uzrQ");
  }, [streamingData]);

  //close alert

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  // main return

  return (
    <div>
      {currentState === "tv" ? <LiveTv /> : <Movies {...props} />}
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
    </div>
  );
}
