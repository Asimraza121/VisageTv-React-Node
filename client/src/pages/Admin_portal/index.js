import React, { Fragment } from "react";

//package import

import { Switch, Route, useParams, useLocation } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

//user import

import { Sidebar, Topbar } from "../../Components/Admin";
import { routes } from "./admin_routes";
import { layoutStyles } from "../../assets/styles/jss/admin";

//admin layout

function AdminPortal(props) {
  //hooks

  const classes = layoutStyles();
  const { match } = props;

  //render

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <Topbar />
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {routes?.map((route) => (
              <Route
                exact={route?.exact}
                path={match?.path + route?.route}
                component={route?.component}
              />
            ))}
          </Switch>
        </main>
      </div>
    </Fragment>
  );
}

export default AdminPortal;
