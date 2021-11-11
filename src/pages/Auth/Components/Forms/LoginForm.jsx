import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email.")
    .email("Enter a valid email.")
    .required("Email is required."),
  password: yup
    .string("Enter your password.")
    .required("Password is required."),
});

export const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // setBtnDisabled(true);
      // submitForm(values);
      // formik.resetForm();
    },
    validateOnChange: (value) => {},
  });
  const [showPassword, setShowPassword] = React.useState(false);
  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }
  return (
    <div className="authen-form">
      <div className="authen-section">
        <img src="assets/img/logo_white.png" alt="logo" className="logo"></img>
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <span>Login</span>
          </div>
          <TextField
            color="warning"
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
            color="warning"
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
            color="warning"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <div className="form-footer">
            <span>Haven't had an account yet?</span>
            <span style={{ float: "right" }}>
              <Link to="/register">
                <a style={{ color: "white", textDecoration: "none" }}>
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
