import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import AlertDialog from "Components/Alert/AlertDialog";
import { useEffect } from "react";
import { useQuery } from "Utils/utils";
import { post } from "Utils/httpHelpers";

const passwordValidationSchema = yup.object({
  password: yup.string().required("Please enter new password."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter your password"),
});

export const ChangePasswordForm = ({
  showLoadingScreen,
  closeLoadingScreen,
}) => {
  const query = useQuery();
  const token = query.get("token");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  useEffect(() => {
    if (alertMessage.length !== 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [alertMessage]);

  // Password form
  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      showLoadingScreen();
      submitPasswordForm(values);
    },
  });

  const submitPasswordForm = (values) => {
    const body = {
      newPass: values.password,
      token: token,
    };
    post("/auth/reset-pw/confirm", JSON.stringify(body))
      .then((response) => {
        closeLoadingScreen();
        passwordFormik.resetForm();
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        closeLoadingScreen();
        passwordFormik.resetForm();
      });
  };
  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  const handleClickShowPassword = () => {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  };
  const handleClickShowConfirmPassword = () => {
    const newStatus = !showConfirmPassword;
    setShowConfirmPassword(newStatus);
  };

  const handleCloseSuccessAlert = () => {
    history.push("/login");
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
        <form onSubmit={passwordFormik.handleSubmit}>
          <div className="title">
            <span>Change password</span>
          </div>
          <TextField
            color="primary"
            autoFocus
            margin="dense"
            id="password"
            label="New password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="standard"
            value={passwordFormik.values.password}
            onChange={passwordFormik.handleChange}
            error={
              passwordFormik.touched.password &&
              Boolean(passwordFormik.errors.password)
            }
            helperText={
              passwordFormik.touched.password && passwordFormik.errors.password
            }
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
          />
          <TextField
            color="primary"
            margin="dense"
            fullWidth
            variant="standard"
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={passwordFormik.values.confirmPassword}
            onChange={passwordFormik.handleChange}
            error={
              passwordFormik.touched.confirmPassword &&
              Boolean(passwordFormik.errors.confirmPassword)
            }
            helperText={
              passwordFormik.touched.confirmPassword &&
              passwordFormik.errors.confirmPassword
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Change Password
          </Button>
        </form>
      </div>
      <AlertDialog
        title="Error"
        message={alertMessage}
        handleClose={handleCloseAlert}
        show={showAlert}
      />
      <AlertDialog
        title="Success"
        message="You have successfully change your password. Please login to continue."
        handleClose={handleCloseSuccessAlert}
        show={showSuccessAlert}
      />
    </div>
  );
};
