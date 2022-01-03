import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { post } from "../../../../Utils/httpHelpers";
import {
  setLocalAccessToken,
  setLocalRefreshToken,
  setLocalUser,
} from "../../../../Utils/localStorageGetSet";
import AlertDialog from "../../../../Components/Alert/AlertDialog";
import { useEffect } from "react";
import { TIME_LIMIT } from "../../../../enum";

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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailConfirmAlert, setShowEmailAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [seconds, setSeconds] = useState(TIME_LIMIT);
  const [disableResend, setDisableResend] = useState(false);

  useEffect(() => {
    if (alertMessage === "") {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (showEmailConfirmAlert) {
      setDisableResend(true);
      startCounter();
    }
  }, [showEmailConfirmAlert]);
  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }
  const navigate = () => {
    const lastLocation = JSON.parse(sessionStorage.getItem("lastLocation"));
    if (lastLocation) {
      sessionStorage.removeItem("lastLocation");
      history.push(lastLocation);
    } else {
      history.push("/");
    }
  };
  const onGoogleLoginSuccess = (response) => {
    showLoadingScreen();
    const body = {
      token: response.tokenId,
    };
    post("/auth/google", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        if (response.status === 200) {
          const user = {
            id: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          };
          setLocalAccessToken(response.data.accessToken);
          setLocalRefreshToken(response.data.refreshToken);
          setLocalUser(user);
          navigate();
        }
      })
      .catch((error) => {
        closeLoadingScreen();
        switch (error.response.status) {
          // login failed
          case 401:
            showFailedAlert();
            break;
          // account blocked
          case 402:
            setAlertMessage(
              "Your account has been blocked. Please contact admin to unblock your account."
            );
            break;
          default:
            setAlertMessage("Something when wrong, please try again.");
            break;
        }
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
    setEmail(values.email);
    post("/auth", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        if (response.status === 200) {
          const user = {
            id: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
          };
          setLocalAccessToken(response.data.accessToken);
          setLocalRefreshToken(response.data.refreshToken);
          setLocalUser(user);
          navigate();
        }
      })
      .catch((error) => {
        closeLoadingScreen();
        switch (error.response.status) {
          case 400:
            setErrorMsg(error.response.data.message);
            break;
          case 410:
            setAlertMessage(error.response.data.message);
            break;
          case 411:
            setShowEmailAlert(true);
            sendEmail(email);
            break;
          default:
            setAlertMessage("Something went wrong, please try again.");
            break;
        }
      });
  };

  const resendEmail = () => {
    setShowEmailAlert(false);
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
        setShowEmailAlert(true);
      })
      .catch((error) => {
        closeLoadingScreen();
        if (error.response.status === 400) {
          setErrorMsg(error.response.data.err);
        } else {
          setAlertMessage("Something went wrong, please try again.");
          console.log(error);
        }
      });
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

  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  const handleCloseConfirmEmail = () => {
    setShowEmailAlert(false);
  };
  const handleResend = () => {
    setShowEmailAlert(false);
  };
  return (
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
            <span>Login</span>
          </div>
          <TextField
            color="primary"
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
          <Link to="/changepassword">
            <div className="forgot-password-msg">Forgot password</div>
          </Link>
          <div className="error-msg">{errorMsg}</div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
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
                <b className="message">Sign Up</b>
              </Link>
            </span>
          </div>
        </form>
      </div>
      <AlertDialog
        title="Confirm Email"
        message="Your email hasn't been confirmed yet. Please check your email for confirmation link and login again."
        handleClose={handleCloseConfirmEmail}
        show={showEmailConfirmAlert}
        action={`Resend` + (seconds <= 0 ? `` : ` (${seconds}s)`)}
        disableAction={disableResend}
        handleAction={resendEmail}
      />
      <AlertDialog
        title="Error"
        message={alertMessage}
        handleClose={handleCloseAlert}
        show={showAlert}
      />
    </div>
  );
};
