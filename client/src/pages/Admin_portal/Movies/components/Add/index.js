import React, { Fragment, useState } from "react";

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
import { useHistory } from "react-router-dom";

//user import

import { headersPost } from "../../../../../Services/API";
import { ToFormData } from "../../../../../utils";
import { admin_api_routes } from "../../../../../Services/Routes/API";
import { addMovieSchema } from "../../../../../Services/Validations/Admin";
import { addMoviestyles } from "../../../../../assets/styles/jss/admin/movies";
import { categories } from "../../../../../common";

//constants

const initialValues = {
  name: "",
  description: "",
  default: false,
  featured: true,
  stream_url: "",
  thumbnail: "",
  categories: "",
};

//component

const Update = () => {
  //hooks

  const classes = addMoviestyles();
  const theme = useTheme();
  const history = useHistory();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);

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
    };

    const formData = ToFormData(data);

    setLoader(true);

    headersPost(admin_api_routes?.create_movie, formData)
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

  //render

  return (
    <Fragment>
      <Box>
        <Box margin={1}>
          <Typography variant={"h4"}>Add Movie</Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={addMovieSchema}
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
                    label="Movie Name"
                    fullWidth
                    value={values.name}
                    name="name"
                    placeholder="Enter your movie name"
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
                    label="Movie Description"
                    fullWidth
                    value={values.description}
                    multiline={true}
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    placeholder="Enter your movie description"
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
                    label="Select Movie Category"
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
                      Select movie Category
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
                    label="Movie Image"
                    fullWidth
                    name="thumbnail"
                    onChange={(e) => {
                      setFieldValue("thumbnail", e.target.files[0]);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Select movie image"
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
                    label="Stream URL"
                    fullWidth
                    value={values.stream_url}
                    name="stream_url"
                    placeholder="Enter your movie Stream URL"
                    onChange={handleChange}
                    helperText={touched.stream_url && errors.stream_url}
                    error={touched.stream_url && Boolean(errors.stream_url)}
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
                      label="Is this movie default?"
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
                      label="Is this movie featured?"
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
                      Add Movie
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
