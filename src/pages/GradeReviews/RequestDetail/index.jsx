import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../../../Components/Header";
import ListComments from "./Components/ListComments";
import RequestCard from "./Components/RequestCard";

function RequestDetail() {
  return (
    <div>
      <Header isAtMainPage={false} />
      <Container sx={{ marginBlock: "20px" }}>
        <Grid container spacing={3}>
          <Grid container item spacing={3}>
            <Grid item xs={12} md={6}>
              <RequestCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <ListComments />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RequestDetail;
