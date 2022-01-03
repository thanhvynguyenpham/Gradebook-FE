import { Backdrop, CircularProgress, Grid } from "@mui/material";
import React, { useState } from "react";
import { ChangePasswordForm } from "../Components/Forms/ChangePasswordForm";

import "../Login/index.scss";

function ChangePassword() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  return (
    <div>
      <head>
        <title>Change Password</title>
        <meta property="og:title" content="SignUp" key="signup" />
      </head>
      <Grid container spacing={2} className="authen">
        <Grid item xs={11} md={5} flexDirection="row">
          <ChangePasswordForm
            showLoadingScreen={() => setShowLoadingScreen(true)}
            closeLoadingScreen={() => setShowLoadingScreen(false)}
          />
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoadingScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ChangePassword;
