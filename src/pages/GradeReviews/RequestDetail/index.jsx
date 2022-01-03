import { AccessTime, ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../../../Components/Header";

function RequestDetail() {
  return (
    <div>
      <Header isAtMainPage={false} />
      <Container sx={{ marginBlock: "20px" }}>
        <Grid container spacing={3}>
          <Grid container item>
            <Grid item xs={6}>
              <Card sx={{ minWidth: 275 }} color="secondary">
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <AccessTime style={{ fontSize: 14 }} /> 15-01-2021
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" sx={{ mb: 1.5 }} component="div">
                        REQUEST TO REVIEW
                      </Typography>
                    </Grid>
                  </Grid>
                  <Paper
                    style={{
                      backgroundColor: "orange",
                      minHeight: "50px",
                    }}
                  >
                    <Grid container justifyContent="space-between" padding={2}>
                      <Grid item>
                        <Typography variant="h6">
                          Introduction to AI{" "}
                          <Chip label="Midterm" color="primary" size="medium" />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained">Go to class</Button>
                      </Grid>
                    </Grid>
                  </Paper>
                  <br></br>
                  <Paper
                    style={{
                      backgroundColor: "lightyellow",
                      minHeight: "50px",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                          TV
                        </Avatar>
                      }
                      title={
                        <Typography variant="body2" color="text.secondary">
                          Requested by
                        </Typography>
                      }
                      subheader={
                        <Typography variant="h6">
                          18127258 | Nguyễn Phạm Thanh Vy
                        </Typography>
                      }
                    />
                    <Stack padding={2}>
                      <Grid container justifyContent="center">
                        <Grid item>
                          <Paper
                            style={{
                              backgroundColor: "aqua",
                              width: "fit-content",
                              padding: "5px",
                            }}
                          >
                            <Typography variant="body1">
                              Current Score : <b>8</b>
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item alignSelf="center">
                          <ChevronRight fontSize="2rem" />
                        </Grid>
                        <Grid item>
                          <Paper
                            style={{
                              backgroundColor: "aqua",
                              width: "fit-content",
                              padding: "5px",
                            }}
                          >
                            <Typography variant="body1">
                              Expected Score : <b>8</b>
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      <br></br>
                      <Typography variant="h6">Reason</Typography>
                      <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Magnam numquam, ipsa quaerat quos iste officiis
                        voluptate architecto, in ipsam blanditiis aspernatur.
                        Accusantium modi dolorum nemo facilis ad id facere
                        consequuntur.
                      </Typography>
                    </Stack>
                  </Paper>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default RequestDetail;
