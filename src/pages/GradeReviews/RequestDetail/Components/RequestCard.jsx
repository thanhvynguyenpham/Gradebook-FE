import React from "react";
import { AccessTime, ChevronRight, Send } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./index.scss";
const RequestCard = () => {
  return (
    <div>
      <Card className="request-card">
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                className="request-card-date"
                color="text.secondary"
                gutterBottom
              >
                <AccessTime className="request-card-date" /> 15-01-2021
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                className="request-card-title"
                component="div"
              >
                REQUEST TO REVIEW{" "}
                <Chip label="Open" color="success" size="small" />
              </Typography>
            </Grid>
          </Grid>
          <Paper className="request-card-class-panel">
            <Grid container justifyContent="space-between" padding={2}>
              <Grid item>
                <Typography variant="h6" color="white">
                  Introduction to AI{" "}
                  <Chip label="Midterm" color="secondary" size="medium" />
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Go to class
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <br></br>
          <Paper className="request-card-review-panel">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="avatar">
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
                  <Paper className="request-card-review-panel-point-before">
                    <Typography variant="body1">
                      Current Score : <b>8</b>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item alignSelf="center">
                  <ChevronRight fontSize="2rem" />
                </Grid>
                <Grid item>
                  <Paper className="request-card-review-panel-point-after">
                    <Typography variant="body1">
                      Expected Score : <b>8</b>
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <br></br>
              <Typography variant="h6">Reason</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
                numquam, ipsa quaerat quos iste officiis voluptate architecto,
                in ipsam blanditiis aspernatur. Accusantium modi dolorum nemo
                facilis ad id facere consequuntur.
              </Typography>
            </Stack>
          </Paper>
        </CardContent>
        <CardActions sx={{ paddingInline: "1rem" }}>
          <Paper className="request-card-submit-panel">
            <Grid container justifyContent="flex-end" padding={2}>
              <Grid item marginRight={2} xs={3}>
                <TextField
                  type="text"
                  variant="outlined"
                  size="small"
                  label="Final Score"
                  color="primary"
                ></TextField>
              </Grid>
              <Grid item>
                <Button variant="contained">Submit & Close Review</Button>
              </Grid>
            </Grid>
          </Paper>
        </CardActions>
      </Card>
    </div>
  );
};

export default RequestCard;
