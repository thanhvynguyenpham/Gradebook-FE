import { Grid } from "@mui/material";
import React from "react";
import { SignUpForm } from "../Components/Forms/SignUpForm";

import "../Login/index.scss";

function SignUp() {
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
          <SignUpForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
