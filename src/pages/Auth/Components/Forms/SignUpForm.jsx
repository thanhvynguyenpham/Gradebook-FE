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

export const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
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
      // setBtnDisabled(true);
      // submitForm(values);
      // formik.resetForm();
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
  return (
    <div className="authen-form">
      <div className="authen-section">
        <img src="assets/img/logo_white.png" alt="logo" className="logo"></img>
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
                helperText={formik.touched.firstname && formik.errors.firstname}
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
          <div className="form-footer">
            <span>Already have an account?</span>
            <span style={{ float: "right" }}>
              <Link to="/login">
                <a style={{ color: "white", textDecoration: "none" }}>
                  <b>Login</b>
                </a>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
