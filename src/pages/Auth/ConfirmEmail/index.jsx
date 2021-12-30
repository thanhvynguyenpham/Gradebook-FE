import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../Login/index.scss";

function ConfirmEmail() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  useEffect(() => {
    setShowLoadingScreen(true);
  }, []);
  return (
    <div>
      <head>
        <title>Change Password</title>
        <meta property="og:title" content="SignUp" key="signup" />
      </head>
      <Grid container spacing={2} className="authen">
        <Grid item xs={11} md={5} flexDirection="row">
          <div className="authen-form" hidden={showLoadingScreen}>
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
              <Typography variant="h6">
                You have successfully confirm your email.
              </Typography>
              <Typography variant="h6">
                Please login to use our website.
              </Typography>
              <br></br>
              <br></br>
              <Button variant="contained">Go to login</Button>
            </div>
          </div>
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

export default ConfirmEmail;
