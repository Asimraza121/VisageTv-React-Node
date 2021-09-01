import React from "react";

//package import

import { Redirect, Route } from "react-router-dom";

//user import

import { StorageKeys } from "../../Storage";
import { root_routes } from "./index";

//component

const AppRoutes = ({ component: Component, path, ...rest }) => {
  const token = localStorage.getItem(StorageKeys?.token);
  return (
    <Route
      path={path}
      render={(props) =>
        Boolean(token) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: root_routes?.root,
              state: { from: props.location },
            }}
          />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
