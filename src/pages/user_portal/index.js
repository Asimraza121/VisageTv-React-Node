import { Fragment, useContext } from "react";

//package import

import { Route, useLocation } from "react-router-dom";
import { Box } from "@material-ui/core";
import ReactPlayer from "react-player";

//user import

import Header from "../../Components/Header/Header";
import LandingPage from "../landingPage/LandingPage";
import ContactUs from "../contactUs/ContactUs";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { root_routes } from "../../Services/Routes/APP";
import AppContext from "../../context/AppContext";

//user layout

const UserRoutes = () => {
  //hooks

  const { pathname } = useLocation();

  //context

  const { selectedUrl } = useContext(AppContext);

  // render

  return (
    <Fragment>
      <Header />
      {pathname === root_routes?.root && (
        <Box margin={4}>
          <ReactPlayer
            url={selectedUrl}
            controls
            width={"100%"}
            style={{
              borderRadius: 20,
              overflow: "hidden",
            }}
            height={"450px"}
          />
        </Box>
      )}
      <div className="mainDiv">
        <Sidebar />
        <div className="contentDiv">
          <Route path={root_routes?.root} exact component={LandingPage} />
          <Route path={root_routes?.contact_us} exact component={ContactUs} />
        </div>
      </div>
    </Fragment>
  );
};

export default UserRoutes;
