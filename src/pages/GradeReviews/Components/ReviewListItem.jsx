import { Grid, Paper } from "@mui/material";
import React from "react";
import "./index.scss";

function ReviewListItem({ requestedList, request }) {
  return (
    <div>
      <Paper sx={{ borderRadius: "10px" }}>
        <Grid container className="list-container">
          <Grid
            item
            xs={requestedList ? 4 : 3.5}
            alignSelf="center"
            className="list-container-item"
            paddingLeft={4}
          >
            <span>
              <b>{request.class.toUpperCase()}</b>
            </span>
          </Grid>
          <Grid
            item
            className="list-container-item"
            xs={requestedList ? 4 : 3.5}
            alignSelf="center"
            textAlign="center"
          >
            <span>
              <b>Assignment:</b> {request.assignment}
            </span>
          </Grid>
          {!requestedList && (
            <Grid
              item
              className="list-container-item"
              xs={2.5}
              alignSelf="center"
              textAlign="center"
            >
              <span>
                <b>Student:</b> {request.student}
              </span>
            </Grid>
          )}
          <Grid
            item
            className="list-container-item"
            xs={requestedList ? 3.5 : 2}
            alignSelf="center"
            textAlign="center"
          >
            <span>{request.time}</span>
          </Grid>
          <Grid
            container
            item
            xs={0.5}
            alignSelf="center"
            className={`list-container-status list-container-status-${request.status}`}
          >
            <span>{request.status.toUpperCase()}</span>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ReviewListItem;
