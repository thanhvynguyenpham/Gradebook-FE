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
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { post } from "../../../../Utils/httpHelpers";
import AlertDialog from "../../../../Components/Alert/AlertDialog";

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
  showGGFailedAlert,
  showLoadingScreen,
  closeLoadingScreen,
  showFailedScreen,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [showSignUpSuccessAlert, setShowSignUpSuccessAlert] = useState(false);
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
      submitForm(values);
      console.log("submit");
    },
    validateOnChange: (value) => {},
  });

  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }

  function handleClickShowPasswordConfirm() {
    const newStatus = !showPasswordConfirm;
    setShowPasswordConfirm(newStatus);
  }

  const onGoogleLoginSuccess = (response) => {
    showLoadingScreen();
    const body = {
      token: response.tokenId,
    };
    post("/auth/google", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        if (response.status === 200) {
          Cookies.set("access_token", response.data.accessToken);
          Cookies.set("refresh_token", response.data.refreshToken);
          history.goBack();
        }
      })
      .catch((error) => {
        closeLoadingScreen();
        showGGFailedAlert();
        console.log(error);
      });
  };
  const onGoogleLoginFailure = (response) => {
    console.log(response);
  };

  const submitForm = (values) => {
    showLoadingScreen();
    const body = {
      email: values.email,
      password: values.password,
      firstName: values.firstname,
      lastName: values.lastname,
    };
    post("/api/user", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        setShowSignUpSuccessAlert(true);
      })
      .catch((error) => {
        closeLoadingScreen();
        if (error.response.status === 400) {
          setErrorMsg(error.response.data.err);
        } else {
          showFailedScreen();
          console.log(error);
        }
      });
  };

  const onCloseSuccessScreen = () => {
    setShowSignUpSuccessAlert(false);
    history.replace("/login");
  };

  return (
    <>
      <div className="authen-form">
        <div className="authen-section">
          <Link to="/">
            <img
              src="assets/img/logo_white.png"
              alt="logo"
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
                  color="warning"
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
                  color="warning"
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
              color="warning"
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
              color="warning"
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
              color="warning"
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
              color="warning"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Sign Up
            </Button>
            <div className="social-login-block">
              <div className="message" style={{ textAlign: "center" }}>
                or login with
              </div>
              <GoogleLogin
                clientId="989952992245-j12fvr7j1aeegfm7o1p5ltg3i94adku6.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    className="gg-login-btn"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img
                      data-test="icon"
                      src="assets/icons/google-icon.svg"
                      alt="google"
                      width="36"
                      height="36"
                      className="button__icon"
                    />
                  </Button>
                )}
                buttonText="Login"
                onSuccess={onGoogleLoginSuccess}
                onFailure={onGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="form-footer">
              <span>Already have an account?</span>
              <span style={{ float: "right" }}>
                <Link to="/login" replace>
                  <a style={{ color: "white", textDecoration: "none" }}>
                    <b>Login</b>
                  </a>
                </Link>
              </span>
            </div>
          </form>
        </div>
        <AlertDialog
          title="Sign Up Successfully"
          message="You have successfully sign up with your email. Login now to use Gradebook's features."
          handleClose={onCloseSuccessScreen}
          show={showSignUpSuccessAlert}
        />
      </div>
    </>
  );
};
