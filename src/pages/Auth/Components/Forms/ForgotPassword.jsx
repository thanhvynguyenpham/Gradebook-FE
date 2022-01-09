import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";
import { useState } from "react";
import { post } from "../../../../Utils/httpHelpers";
import AlertDialog from "../../../../Components/Alert/AlertDialog";
import { useEffect } from "react";
import { setInterval } from "core-js";
import { TIME_LIMIT } from "../../../../enum";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter your email."),
});

export const ForgotPassword = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [disableResend, setDisableResend] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (alertMessage.length !== 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (showNotify) {
      setDisableResend(true);
      startCounter();
    }
  }, [showNotify]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setShowLoadingScreen(true);
      setEmail(values.email);
      submitForm(values.email);
    },
  });

  const submitForm = (email) => {
    const body = {
      email: email,
    };
    post(`/auth/reset-pw/send`, body)
      .then((response) => {
        setShowLoadingScreen(false);
        setShowNotify(true);
      })
      .catch((error) => {
        setShowLoadingScreen(false);
        setAlertMessage(error.response.data.message);
      });
  };
  const handleCloseAlert = () => {
    setAlertMessage("");
  };
  const handleCloseNotify = () => {
    setShowNotify(false);
  };
  const startCounter = () => {
    setDisableResend(true);
    setSeconds(TIME_LIMIT);
    let count = TIME_LIMIT;
    const interval = setInterval(() => {
      count = count - 1;
      setSeconds(count);
      if (count <= 0) {
        clearInterval(interval);
        setDisableResend(false);
      }
    }, 1000);
  };
  const resendEmail = () => {
    setShowNotify(false);
    setShowLoadingScreen(true);
    submitForm(email);
  };
  return (
    <div>
      <Grid container spacing={2} className="authen">
        <Grid item xs={11} md={5} flexDirection="row">
          <div className="authen-form">
            <div className="authen-section">
              <Link to="/">
                <img
                  src="assets/img/gradebook_bg.png"
                  alt="logo"
                  width="150px"
                  height="150px"
                  className="logo"
                ></img>
              </Link>
              <form onSubmit={formik.handleSubmit}>
                <div className="title">
                  <span>Change password</span>
                </div>
                <TextField
                  color="primary"
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Your email"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  disabled={disableResend}
                >
                  {"Change Password " + (seconds <= 0 ? `` : ` (${seconds}s)`)}
                </Button>
              </form>
              <Link to="/login">
                <Button>Back To Login</Button>
              </Link>
            </div>
          </div>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AlertDialog
        title="Error"
        message={alertMessage}
        handleClose={handleCloseAlert}
        show={showAlert}
      />
      <AlertDialog
        title="Verify your email"
        message="Please check your email for confirmation link."
        handleClose={handleCloseNotify}
        show={showNotify}
        action={`Resend` + (seconds <= 0 ? `` : ` (${seconds}s)`)}
        disableAction={disableResend}
        handleAction={resendEmail}
      />
    </div>
  );
};
