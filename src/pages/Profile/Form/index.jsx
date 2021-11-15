import {
  Alert,
  Button,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { patchAuth } from "../../../Utils/httpHelpers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { setLocalUserName } from "../../../Utils/localStorageGetSet";

const nameValidationSchema = yup.object({
  firstname: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastname: yup
    .string("Enter your last name")
    .required("Last name is required"),
});
const passwordValidationSchema = yup.object({
  oldPassword: yup.string().required("Please enter your old password."),
  password: yup.string().required("Please enter new password."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-enter your password"),
});
export const ProfileForm = ({
  showSuccessAlert,
  showFailedAlert,
  userProfile,
}) => {
  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const nameFormik = useFormik({
    initialValues: {
      firstname: userProfile.firstName,
      lastname: userProfile.lastName,
    },
    validationSchema: nameValidationSchema,
    onSubmit: (values) => {
      setDisabledBtn(true);
      submitNameForm(values);
    },
    validateOnChange: (value) => {},
  });
  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      setDisabledBtn(true);
      submitPasswordForm(values);
    },
    validateOnChange: (value) => {},
  });
  const submitNameForm = (values) => {
    const body = {
      firstName: values.firstname,
      lastName: values.lastname,
    };
    patchAuth("/user/profile", JSON.stringify(body))
      .then((response) => {
        setLocalUserName(response.data);
        showSuccessAlert();
        setDisabledBtn(false);
      })
      .catch((error) => {
        console.log(error);
        showFailedAlert();
        setDisabledBtn(false);
      });
  };
  const submitPasswordForm = (values) => {
    const body = {
      curPass: values.oldPassword,
      newPass: values.password,
    };
    patchAuth("/user/password", JSON.stringify(body))
      .then((response) => {
        setChangePassword(false);
        showSuccessAlert();
        setDisabledBtn(false);
        passwordFormik.resetForm();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          showAlert();
        } else {
          showFailedAlert();
        }
        setDisabledBtn(false);
        passwordFormik.resetForm();
      });
  };
  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }
  function handleClickShowOldPassword() {
    const newStatus = !showOldPassword;
    setShowOldPassword(newStatus);
  }
  function handleClickShowConfirmPassword() {
    const newStatus = !showConfirmPassword;
    setShowConfirmPassword(newStatus);
  }

  function showAlert() {
    setWrongPassword(true);
    setTimeout(function () {
      setWrongPassword(false);
    }, 2000);
  }
  return (
    <div>
      <Paper style={{ padding: "20px" }}>
        <form id="name-form" onSubmit={nameFormik.handleSubmit}>
          <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="div">
                Profile
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                Personal Infomation
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="firstname"
                label="First name"
                type="text"
                value={nameFormik.values.firstname}
                onChange={nameFormik.handleChange}
                error={
                  nameFormik.touched.firstname &&
                  Boolean(nameFormik.errors.firstname)
                }
                helperText={
                  nameFormik.touched.firstname && nameFormik.errors.firstname
                }
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                id="lastname"
                label="Last name"
                fullWidth
                value={nameFormik.values.lastname}
                onChange={nameFormik.handleChange}
                error={
                  nameFormik.touched.lastname &&
                  Boolean(nameFormik.errors.lastname)
                }
                helperText={
                  nameFormik.touched.lastname && nameFormik.errors.lastname
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="email"
                label="Email"
                value={userProfile.email}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={disabledBtn}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <form id="password-form" onSubmit={passwordFormik.handleSubmit}>
          <Grid container xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                Password
              </Typography>
            </Grid>
            <Grid item>
              {!changePassword && (
                <Button
                  variant="outlined"
                  onClick={() => setChangePassword(!changePassword)}
                >
                  Change Password
                </Button>
              )}
            </Grid>
            {changePassword && (
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="oldPassword"
                    label="Old Password"
                    fullWidth
                    type={showOldPassword ? "text" : "password"}
                    value={passwordFormik.values.oldPassword}
                    onChange={passwordFormik.handleChange}
                    error={
                      passwordFormik.touched.oldPassword &&
                      Boolean(passwordFormik.errors.oldPassword)
                    }
                    helperText={
                      passwordFormik.touched.oldPassword &&
                      passwordFormik.errors.oldPassword
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={wrongPassword}>
                    <Alert variant="filled" severity="error">
                      Wrong password
                    </Alert>
                  </Collapse>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    label="New Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    error={
                      passwordFormik.touched.password &&
                      Boolean(passwordFormik.errors.password)
                    }
                    helperText={
                      passwordFormik.touched.password &&
                      passwordFormik.errors.password
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
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="confirmPassword"
                    label="Confirm Password"
                    fullWidth
                    type={showConfirmPassword ? "text" : "password"}
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
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent="flex-end"
                  columnSpacing={2}
                >
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => setChangePassword(false)}
                      disabled={disabledBtn}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={disabledBtn}
                      variant="contained"
                      type="submit"
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
