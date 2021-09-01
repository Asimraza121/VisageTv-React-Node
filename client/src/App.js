import React, { Fragment } from "react";

//package import

import { Route, Switch } from "react-router-dom";

//user import

import "./App.css";

import ContextWrapper from "./context/ContextWrapper";
import { root_routes } from "./Services/Routes/APP";
import PrivateRoute from "./Services/Routes/APP/PrivateRoute";
import { AdminLayout, UserLayout, Login } from "./pages";

//component

export default function App() {
  //render

  return (
    <Fragment>
      <ContextWrapper>
        <Switch>
          <PrivateRoute path={root_routes?.admin} component={AdminLayout} />
          <Route exact path={root_routes?.login} component={Login} />
          <Route path={root_routes?.root} component={UserLayout} />
        </Switch>
      </ContextWrapper>
    </Fragment>
  );
}
