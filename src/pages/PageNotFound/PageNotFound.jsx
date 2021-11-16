import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <Grid
          container
          xs={12}
          justifyContent="center"
          direction="column"
          alignContent="center"
        >
          <Grid item>
            <img src="/assets/img/pagenotfound.png" alt="page not found" />
          </Grid>
          <Grid item xs={12} alignSelf="center">
            <Link to="/">
              <Button variant="contained" size="large">
                Go to Home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default NotFoundPage;
