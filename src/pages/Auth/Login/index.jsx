import { Grid } from "@mui/material";
import React from "react";
import { LoginForm } from "../Components/Forms/LoginForm";

import "./index.scss";

function Login() {
  return (
    <div>
      <head>
        <title>Login</title>
        <meta property="og:title" content="Login" key="login" />
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
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
