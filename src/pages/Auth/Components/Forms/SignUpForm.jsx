import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router";
import { post } from "../../../../Utils/httpHelpers";
import AlertDialog from "../../../../Components/Alert/AlertDialog";
import { setInterval } from "core-js";
import { useEffect } from "react";
import { TIME_LIMIT } from "../../../../enum";

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastname: yup.string("Enter your lastname").required("Lastname is required"),
  email: yup
    .string("Enter your email.")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Please enter password.")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter your password"),
});

export const SignUpForm = ({
  showFailedAlert,
  showLoadingScreen,
  closeLoadingScreen,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [showSignUpSuccessAlert, setShowSignUpSuccessAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [seconds, setSeconds] = useState(TIME_LIMIT);
  const [disableResend, setDisableResend] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      setEmail(values.email);
      submitForm(values);
    },
    validateOnChange: (value) => {},
  });

  useEffect(() => {
    if (showSignUpSuccessAlert) {
      setDisableResend(true);
      startCounter();
    }
  }, [showSignUpSuccessAlert]);

  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }

  function handleClickShowPasswordConfirm() {
    const newStatus = !showPasswordConfirm;
    setShowPasswordConfirm(newStatus);
  }

  const submitForm = (values) => {
    showLoadingScreen();
    const body = {
      email: values.email,
      password: values.password,
      firstName: values.firstname,
      lastName: values.lastname,
    };
    post("/register/", JSON.stringify(body))
      .then((response) => {
        sendEmail(values.email);
      })
      .catch((error) => {
        closeLoadingScreen();
        if (error.response.status !== 500) {
          setErrorMsg(error.response.data.message);
        } else {
          showFailedAlert("Something went wrong. Please try again later.");
        }
      });
  };

  const resendEmail = () => {
    setShowSignUpSuccessAlert(false);
    showLoadingScreen();
    sendEmail(email);
  };

  const sendEmail = (email) => {
    const body = {
      email: email,
    };
    post(`/auth/verify-email/send`, body)
      .then((response) => {
        closeLoadingScreen();
        setShowSignUpSuccessAlert(true);
      })
      .catch((error) => {
        closeLoadingScreen();
        if (error.response.status !== 400) {
          showFailedAlert(error.response.message);
        } else {
          showFailedAlert("Something went wrong. Please try again later.");
        }
      });
  };

  const onCloseSuccessScreen = () => {
    setShowSignUpSuccessAlert(false);
    history.replace("/login");
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

  return (
    <>
      <div className="authen-form">
        <div className="authen-section">
          <Link to="/">
            <img
              src="assets/img/gradebook_bg.png"
              alt="logo"
              width="100px"
              height="100px"
              className="logo"
            ></img>
          </Link>
          <form onSubmit={formik.handleSubmit}>
            <div className="title">
              <span>Sign Up</span>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  color="primary"
                  autoFocus
                  margin="dense"
                  id="firstname"
                  label="Firstname"
                  type="firstname"
                  fullWidth
                  variant="standard"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  color="primary"
                  margin="dense"
                  id="lastname"
                  label="Lastname"
                  type="lastname"
                  fullWidth
                  variant="standard"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
            </Grid>
            <TextField
              color="primary"
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              color="primary"
              margin="dense"
              fullWidth
              variant="standard"
              id="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <TextField
              color="primary"
              margin="dense"
              fullWidth
              variant="standard"
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    edge="end"
                  >
                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            <div className="error-msg">{errorMsg}</div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Sign Up
            </Button>
            <br></br>
            <br></br>
            <div className="form-footer">
              <span>Already have an account?</span>
              <span style={{ float: "right" }}>
                <Link to="/login" replace>
                  <b className="message">Login</b>
                </Link>
              </span>
            </div>
          </form>
        </div>
        <AlertDialog
          title="Verify your email"
          message="Please check your email for confirmation link."
          handleClose={onCloseSuccessScreen}
          action={`Resend` + (seconds <= 0 ? `` : ` (${seconds}s)`)}
          disableAction={disableResend}
          handleAction={resendEmail}
          show={showSignUpSuccessAlert}
        />
      </div>
    </>
  );
};
