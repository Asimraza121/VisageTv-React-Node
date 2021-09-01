import React, { useState } from "react";

//package import

import { Formik } from "formik";
import { Alert } from "@material-ui/lab";
import { Snackbar, Backdrop, CircularProgress } from "@material-ui/core";

//user import

import "./contactUs.css";
import { validationSchema } from "../../Services/Validations/ContactUs";
import { simplePost } from "../../Services/API";
import { api_routes } from "../../Services/Routes/API";
import { contactusStyles } from "../../assets/styles/jss/contact_us";

//constants

const initialValues = { name: "", phone: "", email: "", message: "" };

//component

export default function ContactUs() {
  //hooks

  const classes = contactusStyles();

  //states

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loader, setLoader] = useState(false);

  //form handler

  const submitHandler = (values, { resetForm }) => {
    const data = {
      name: values?.name,
      phone: values?.phone,
      email: values?.email,
      message: values?.message,
    };

    setLoader(true);

    simplePost(api_routes?.contact_us, data)
      .then((res) => {
        if (res?.status === 200) {
          setAlertMsg(res?.data?.message);
          setAlertType("success");
          setAlert(true);
          resetForm();
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

  // main return

  return (
    <div className="contact_us">
      <h1 className="heading">Contact Us</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="inputcontainer">
              <div className="inputcontainer1">
                <div
                  className={
                    touched.name && Boolean(errors.name) ? "error" : ""
                  }
                >
                  <input
                    className="input-text1"
                    name="name"
                    type={"text"}
                    onChange={handleChange}
                    autoFocus
                    placeholder="Name"
                    value={values.name}
                  />
                  <div>{touched.name && errors.name}</div>
                </div>
                <div
                  className={
                    touched.email && Boolean(errors.email) ? "error" : ""
                  }
                >
                  <input
                    className="input-text1"
                    name="email"
                    type={"email"}
                    onChange={handleChange}
                    placeholder="Email"
                    value={values.email}
                  />
                  <div>{touched.email && errors.email}</div>
                </div>
                <div
                  className={
                    touched.phone && Boolean(errors.phone) ? "error" : ""
                  }
                >
                  <input
                    className="input-text1"
                    name="phone"
                    type={"text"}
                    onChange={handleChange}
                    placeholder="Phone"
                    value={values.phone}
                  />
                  <div>{touched.phone && errors.phone}</div>
                </div>
              </div>
              <div className="inputcontainer2">
                <div
                  className={
                    touched.message && Boolean(errors.message) ? "error" : ""
                  }
                >
                  <input
                    className="input-text2"
                    name="message"
                    type={"text"}
                    placeholder="Notes"
                    value={values.message}
                    onChange={handleChange}
                  />
                  <div>{touched.message && errors.message}</div>
                </div>
              </div>
              <div className="submit">
                <button type="submit" className="submit_btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
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
    </div>
  );
}
