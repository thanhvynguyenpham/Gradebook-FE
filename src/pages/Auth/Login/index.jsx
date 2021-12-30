import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import AlertDialog from "../../../Components/Alert/AlertDialog";
import { LoginForm } from "../Components/Forms/LoginForm";

import "./index.scss";

function Login() {
  const [showGGLoginFailed, setShowGGLoginFailed] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  return (
    <div>
      <head>
        <title>Login</title>
        <meta property="og:title" content="Login" key="login" />
      </head>
      <Grid container spacing={2} className="authen">
        <Grid item xs={11} md={5} flexDirection="row">
          <LoginForm
            showFailedAlert={() => setShowGGLoginFailed(true)}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
