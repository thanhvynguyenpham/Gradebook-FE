import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import "./index.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Class name is required"),
  password: yup
    .string("Enter your class description")
    .required("Description is required"),
});

export const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("Invalid email or password");
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
        <img
          src="assets/img/logo.png"
          alt="logo"
          style={{ position: "absolute", top: "100px" }}
        ></img>
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
            style={{ marginTop: "30px" }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
