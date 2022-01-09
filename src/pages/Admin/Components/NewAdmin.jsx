import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { InputAdornment, TextField, Grid, Stack, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { postAuth } from "Utils/httpHelpers";
import AlertDialog from "Components/Alert/AlertDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function NewAdmin({ open, handleClose, showFailedScreen }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
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
      submitForm(values);
    },
  });

  function handleClickShowPassword() {
    const newStatus = !showPassword;
    setShowPassword(newStatus);
  }

  function handleClickShowPasswordConfirm() {
    const newStatus = !showPasswordConfirm;
    setShowPasswordConfirm(newStatus);
  }
  const submitForm = (values) => {
    const body = {
      email: values.email,
      password: values.password,
      firstName: values.firstname,
      lastName: values.lastname,
    };
    setBtnDisabled(true);
    postAuth("/admin/admins", JSON.stringify(body))
      .then((response) => {
        setSuccessAlert(true);
      })
      .catch((error) => {
        setBtnDisabled(false);
        if (error.response.status === 400) {
          showFailedScreen(error.response.data.err);
        } else {
          showFailedScreen();
          console.log(error);
        }
      });
  };

  const onCloseSuccessScreen = () => {
    setSuccessAlert(false);
    formik.handleReset();
    setBtnDisabled(false);
    handleClose();
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <form onSubmit={formik.handleSubmit}>
          <Stack alignItems="center" justifyContent="center" height="100vh">
            <Grid
              container
              xs={12}
              md={6}
              lg={4}
              rowSpacing={2}
              justifyContent="center"
            >
              <Paper sx={{ p: 4 }}>
                <Typography sx={{ mb: 4 }} variant="h4" color="primary">
                  Create Account
                </Typography>
                <Grid container item spacing={2}>
                  <Grid item xs={4}>
                    <TextField
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
                        formik.touched.firstname &&
                        Boolean(formik.errors.firstname)
                      }
                      helperText={
                        formik.touched.firstname && formik.errors.firstname
                      }
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      margin="dense"
                      id="lastname"
                      label="Lastname"
                      type="lastname"
                      fullWidth
                      variant="standard"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
                      }
                      helperText={
                        formik.touched.lastname && formik.errors.lastname
                      }
                    />
                  </Grid>
                </Grid>
                <TextField
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
                  margin="dense"
                  fullWidth
                  variant="standard"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
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
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  disabled={btnDisabled}
                >
                  Create Account
                </Button>
              </Paper>
            </Grid>
          </Stack>
        </form>
      </Dialog>
      <AlertDialog
        title="Success"
        message="You have successfully create new admin account!"
        handleClose={onCloseSuccessScreen}
        show={showSuccessAlert}
      />
    </div>
  );
}
