import React, { useState } from "react";

//package import

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Menu as MenuIcon, AccountCircle } from "@material-ui/icons";

//user import

import { topbarStyles } from "../../../assets/styles/jss/admin";
import { root_routes } from "../../../Services/Routes/APP";

//component

const Topbar = () => {
  //hooks

  const classes = topbarStyles();
  const history = useHistory();

  //states

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //functions

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    localStorage.clear();
    history.push(root_routes?.login);
  };

  //render

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Visage Tv
        </Typography>
        <Box ml={"auto"}>
          <IconButton onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
