import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { post } from "../../../../utils/httpHelpers";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email.")
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string("Enter your password.")
    .required("Password is required."),
});

export const LoginForm = ({
  showFailedAlert,
  showLoadingScreen,
  closeLoadingScreen,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setErrorMsg("");
      submitForm(values);
    },
    validateOnChange: (value) => {},
  });
  const [showPassword, setShowPassword] = React.useState(false);
  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
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
          Cookies.set("access_token", response.data.accessToken, {
            expires: 1,
          });
          Cookies.set("refresh_token", response.data.refreshToken, {
            expires: 1,
          });
          history.goBack();
        }
      })
      .catch((error) => {
        closeLoadingScreen();
        showFailedAlert();
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
    };
    post("/auth", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        if (response.status === 200) {
          Cookies.set("access_token", response.data.accessToken, {
            expires: 1,
          });
          Cookies.set("refresh_token", response.data.refreshToken, {
            expires: 1,
          });
          history.goBack();
        }
      })
      .catch((error) => {
        closeLoadingScreen();
        setErrorMsg("Invalid email or password");
        console.log(error);
      });
  };

  return (
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
            <span>Login</span>
          </div>
          <TextField
            color="secondary"
            autoFocus
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
            color="secondary"
            margin="dense"
            fullWidth
            variant="standard"
            id="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
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
          <div className="error-msg">{errorMsg}</div>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <div className="social-login-block">
            <div className="message" style={{ textAlign: "center" }}>
              or login with
            </div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
            <span>Haven't had an account yet?</span>
            <span style={{ float: "right" }}>
              <Link to="/register">
                <a style={{ color: "white" }}>
                  <b>Sign Up</b>
                </a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
