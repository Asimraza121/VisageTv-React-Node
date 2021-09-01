import React, { useContext, useState } from "react";

//package import

import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Snackbar, Backdrop, CircularProgress } from "@material-ui/core";

//user import

import AppContext from "../../context/AppContext";
import "./Header.css";
import { root_routes } from "../../Services/Routes/APP";
import { simplePost } from "../../Services/API";
import { api_routes } from "../../Services/Routes/API";
import { loginStyles } from "../../assets/styles/jss/login";

//constants

//component

function Header() {
  //context hook

  const {
    currentState,
    setCurrentState,
    setActiveSideBar,
    activeSideBar,
    setStreamingData,
  } = useContext(AppContext);

  //hooks

  const classes = loginStyles();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState("");

  //form submit handler

  const formHandler = () => {
    const data = {
      search_text: searchText,
      streaming_type: currentState,
    };

    setLoader(true);

    simplePost(api_routes?.search, data)
      .then((res) => {
        if (res?.status === 200) {
          setStreamingData(res?.data?.data);
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

  //close alert

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  //render

  return (
    <div className="Navbar">
      {/* SideBarButton */}
      <div className="d-inline d-md-none">
        <div
          onClick={() => setActiveSideBar((prev) => !prev)}
          className={
            activeSideBar
              ? " dashboardNavaBarButton activeSideBar "
              : "dashboardNavaBarButton"
          }
        >
          <div className="dashboardNavBarLine dashboardNavBarLine1"></div>
          <div className="dashboardNavBarLine dashboardNavBarLine2"></div>
          <div className="dashboardNavBarLine dashboardNavBarLine3"></div>
        </div>
      </div>
      {/* SideBarButton ends */}
      <div className="logo">
        <img src="/img/visage.svg" />
      </div>
      <div className="search_bar d-none d-md-flex">
        <input
          className="input-text"
          id="search_text"
          name="search_text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          type="text"
        />
        <img
          className="searchimg pointer"
          onClick={formHandler}
          src="/img/search.svg"
        />
      </div>
      <Link to={root_routes?.root}>
        <div className="twobtn d-none d-md-flex">
          <button
            onClick={() => setCurrentState("tv")}
            className={
              currentState === "tv"
                ? "headerButton tv headerButtonActive"
                : "headerButton tv"
            }
          >
            Live Tv
          </button>
          <button
            onClick={() => setCurrentState("movie")}
            className={
              currentState === "movie"
                ? "headerButton  headerButtonActive"
                : "headerButton"
            }
          >
            Movies
          </button>
        </div>
      </Link>
      <div className="contactnoti">
        <Link to={root_routes?.contact_us}>
          <button className="headerButton d-none d-md-block">Contact</button>
        </Link>

        <img
          src="/img/notification.svg"
          alt="notiIcon"
          className="pointer"
        ></img>
      </div>
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
      s
    </div>
  );
}

export default Header;
