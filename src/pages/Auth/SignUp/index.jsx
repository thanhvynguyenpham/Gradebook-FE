import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "../../../Components/Alert/AlertDialog";
import { SignUpForm } from "../Components/Forms/SignUpForm";

import "../Login/index.scss";

function SignUp() {
  const [showGGLoginFailed, setShowGGLoginFailed] = useState(false);
  const [showRegisterFailed, setShowRegisterFailed] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  return (
    <div>
      <head>
        <title>Sign Up</title>
        <meta property="og:title" content="SignUp" key="signup" />
      </head>
      <Grid
        container
        spacing={2}
        className="authen"
        style={{
          backgroundImage: "url(assets/img/background_login.jpg)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={11} md={5} flexDirection="row">
          <SignUpForm
            showGGFailedAlert={() => setShowGGLoginFailed(true)}
            showFailedScreen={() => setShowRegisterFailed(true)}
            showLoadingScreen={() => setShowLoadingScreen(true)}
            closeLoadingScreen={() => setShowLoadingScreen(false)}
          />
        </Grid>
      </Grid>
      <AlertDialog
        title="Failed"
        message="Cannot login with your Google Account. Please try again!"
        handleClose={() => setShowGGLoginFailed(false)}
        show={showGGLoginFailed}
      />
      <AlertDialog
        title="Something went wrong"
        message="Sorry. We cannot complete your request now. Please try again later."
        handleClose={() => setShowRegisterFailed(false)}
        show={showRegisterFailed}
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
