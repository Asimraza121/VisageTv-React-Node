import React, { Fragment } from "react";

//package import

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

//user import

import { drawer_routes } from "./routes";
import { root_routes } from "../../../Services/Routes/APP";

//component

const Drawer = () => {
  //hooks

  const history = useHistory();
  const { pathname } = useLocation();

  //render

  return (
    <Fragment>
      <Toolbar />
      <List>
        {drawer_routes?.map((text, index) => (
          <ListItem
            button
            key={`${index + text.text}`}
            onClick={() => history.push(root_routes?.admin + text?.route)}
            selected={pathname === root_routes?.admin + text?.route}
          >
            <ListItemIcon>{text?.icon}</ListItemIcon>
            <ListItemText primary={text?.text} />
          </ListItem>
        ))}
      </List>{" "}
    </Fragment>
  );
};

export default Drawer;
