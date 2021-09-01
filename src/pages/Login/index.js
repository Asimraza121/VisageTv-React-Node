import React, { useState } from "react";

//package import

import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";

import { Formik } from "formik";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";

//user import

import { simplePost } from "../../Services/API";
import { admin_api_routes } from "../../Services/Routes/API";
import { root_routes } from "../../Services/Routes/APP";
import { StorageKeys } from "../../Services/Storage";
import { validationSchema } from "../../Services/Validations/Login";
import { loginStyles } from "../../assets/styles/jss/login";

//constants

const initialValues = {
  email: "",
  password: "",
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        visage tv
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//component

export default function SignIn() {
  //hooks

  const classes = loginStyles();
  const history = useHistory();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);

  //form handler

  const submitHandler = (values) => {
    const data = {
      email: values?.email,
      password: values?.password,
    };

    setLoader(true);

    simplePost(admin_api_routes?.login, data)
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem(StorageKeys?.token, res?.data?.token);
          history.push(root_routes?.admin);
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
          setAlertMsg(response?.data?.message);
          setAlertType("warning");
          setAlert(true);
        } else {
          setAlertMsg(response?.data?.message);
          setAlertType("warning");
          setAlert(true);
        }
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={values?.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={values?.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

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
    </Container>
  );
}
