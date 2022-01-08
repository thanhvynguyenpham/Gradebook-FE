import { Chip, Grid, Paper, useMediaQuery } from "@mui/material";
import React from "react";
import { convertToLocalDate } from "../../../Utils/converters";
import "./index.scss";

function ReviewListItem({ requestedList, request }) {
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <div>
      <Paper sx={{ borderRadius: "10px" }}>
        <Grid container className="list-container" rowSpacing={smDown ? 2 : 0}>
          <Grid
            item
            xs={12}
            sm={requestedList ? 4 : 3.5}
            alignSelf="center"
            paddingLeft={smDown ? 0 : 4}
            textAlign={smDown ? "center" : "left"}
          >
            {smDown && (
              <Chip
                label={request.status.toUpperCase()}
                className={`list-container-status-${request.status}`}
                style={{ fontWeight: "bold" }}
              ></Chip>
            )}
            <span className="list-container-item">
              <b>
                {request.class.name.toUpperCase()}
                {"  "}
              </b>
            </span>
          </Grid>
          <Grid
            item
            className="list-container-item"
            xs={12}
            sm={requestedList ? 4 : 3.5}
            alignSelf="center"
            textAlign="center"
          >
            <span>
              <b>Assignment:</b> {request.gradeComposition.name}
            </span>
          </Grid>
          {!requestedList && (
            <Grid
              item
              className="list-container-item"
              xs={12}
              sm={2.5}
              alignSelf="center"
              textAlign="center"
            >
              <span>
                <b>Student:</b> {request.student.name}
              </span>
            </Grid>
          )}
          <Grid
            item
            className="list-container-item"
            xs={12}
            sm={requestedList ? 3.5 : 2}
            alignSelf="center"
            textAlign="center"
            marginBottom={smDown ? 3 : 0}
          >
            <span>{convertToLocalDate(request.createdAt)}</span>
          </Grid>
          {!smDown && (
            <Grid
              container
              item
              xs={12}
              sm={0.5}
              alignSelf="center"
              className={`list-container-status list-container-status-${request.status}`}
            >
              <span>{request.status.toUpperCase()}</span>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
}

export default ReviewListItem;
