import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "Components/Alert/AlertDialog";
import { SignUpForm } from "../Components/Forms/SignUpForm";

import "../Login/index.scss";

function SignUp() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const showFailedAlert = (message) => {
    if (!message) {
      setAlertMessage(
        "Sorry, we cannot complete your request at the moment. Please try again later."
      );
      setShowAlert(true);
      return;
    }
    setAlertMessage(message);
    setShowAlert(true);
  };
  return (
    <div>
      <head>
        <title>Sign Up</title>
        <meta property="og:title" content="SignUp" key="signup" />
      </head>
      <Grid container className="authen">
        <Grid item xs={11} md={5} flexDirection="row">
          <SignUpForm
            showFailedAlert={showFailedAlert}
            showLoadingScreen={() => setShowLoadingScreen(true)}
            closeLoadingScreen={() => setShowLoadingScreen(false)}
          />
        </Grid>
      </Grid>
      <AlertDialog
        title="Oops!"
        message={alertMessage}
        handleClose={() => setShowAlert(false)}
        show={showAlert}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SignUp;
