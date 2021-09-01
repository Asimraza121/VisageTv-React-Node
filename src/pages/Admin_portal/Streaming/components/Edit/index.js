import React, { Fragment, useState, useEffect } from "react";

//package import

import {
  Typography,
  Grid,
  TextField,
  Snackbar,
  CircularProgress,
  Backdrop,
  Button,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";

//user import

import { headersUpdate } from "../../../../../Services/API";
import { ToFormData } from "../../../../../utils";
import { admin_api_routes } from "../../../../../Services/Routes/API";
import { updateStreamingSchema } from "../../../../../Services/Validations/Admin";
import { addMoviestyles } from "../../../../../assets/styles/jss/admin/movies";
import { categories } from "../../../../../common";

//constants

const initialValues = {
  _id: "",
  name: "",
  description: "",
  default: false,
  featured: true,
  stream_url: "",
  stream_count: "",
  stream_location: "",
  thumbnail: "",
  categories: "",
};

//component

const Update = () => {
  //hooks

  const classes = addMoviestyles();
  const theme = useTheme();
  const history = useHistory();
  const {
    state: { movie },
  } = useLocation();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  //form submit

  const submitHandler = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      default: values.default,
      featured: values.featured,
      stream_url: values.stream_url,
      thumbnail: values.thumbnail,
      categories: values.categories,
      stream_count: values?.stream_count,
      stream_location: values?.stream_location,
    };

    const formData = ToFormData(data);

    setLoader(true);

    headersUpdate(admin_api_routes?.update_streaming + values?._id, formData)
      .then((res) => {
        if (res?.status === 200) {
          setAlertMsg(res?.data?.message);
          setAlertType("success");
          setAlert(true);
          history.goBack();
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

  useEffect(() => {
    JSON.stringify(movie) && formValuesHandler();
  }, [movie]);

  //form values

  const formValuesHandler = () => {
    setFormValues((prev) => ({ ...prev, ...movie }));
  };

  //render

  return (
    <Fragment>
      <Box>
        <Box margin={1}>
          <Typography variant={"h4"}>Update Streaming Channel</Typography>
        </Box>

        <Formik
          initialValues={formValues}
          onSubmit={submitHandler}
          validationSchema={updateStreamingSchema}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Streaming Channel Name"
                    fullWidth
                    value={values.name}
                    name="name"
                    placeholder="Enter your Streaming channel name"
                    onChange={handleChange}
                    helperText={touched.name && errors.name}
                    error={touched.name && Boolean(errors.name)}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Streaming Channel Description"
                    fullWidth
                    value={values.description}
                    multiline={true}
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter your Streaming description"
                    helperText={touched.description && errors.description}
                    error={touched.description && Boolean(errors.description)}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Select Streaming Category"
                    fullWidth
                    value={values.categories}
                    name="categories"
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    select
                    helperText={touched.categories && errors.categories}
                    error={touched.categories && Boolean(errors.categories)}
                  >
                    <MenuItem value={""} disabled>
                      Select Streaming Channel Category
                    </MenuItem>
                    {categories?.map((cat, index) => (
                      <MenuItem value={cat} key={`${index * Math.random()}`}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="file"
                    label="Streaming Channel Image"
                    fullWidth
                    name="thumbnail"
                    onChange={(e) => {
                      setFieldValue("thumbnail", e.target.files[0]);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Select Streaming image"
                    helperText={touched.thumbnail && errors.thumbnail}
                    error={touched.thumbnail && Boolean(errors.thumbnail)}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Streaming Channel URL"
                    fullWidth
                    value={values.stream_url}
                    name="stream_url"
                    placeholder="Enter your  Streaming URL"
                    onChange={handleChange}
                    helperText={touched.stream_url && errors.stream_url}
                    error={touched.stream_url && Boolean(errors.stream_url)}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Stream Location"
                    fullWidth
                    value={values.stream_location}
                    name="stream_location"
                    placeholder="Enter Stream Location"
                    onChange={handleChange}
                    helperText={
                      touched.stream_location && errors.stream_location
                    }
                    error={
                      touched.stream_location && Boolean(errors.stream_location)
                    }
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Stream Count"
                    fullWidth
                    value={values.stream_count}
                    name="stream_count"
                    placeholder="Enter Stream Count"
                    onChange={handleChange}
                    helperText={touched.stream_count && errors.stream_count}
                    error={touched.stream_count && Boolean(errors.stream_count)}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.inputField}
                >
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values?.default}
                          onChange={handleChange}
                          name="default"
                        />
                      }
                      label="Is this Streaming default?"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={classes.inputField}
                >
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values?.featured}
                          onChange={handleChange}
                          name="featured"
                        />
                      }
                      label="Is this Streaming featured?"
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.inputField}
                >
                  <Box display={"flex"}>
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      type={"submit"}
                    >
                      Update Streaming
                    </Button>

                    <Box marginLeft={1}>
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={() => history.goBack()}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
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
    </Fragment>
  );
};

export default Update;
