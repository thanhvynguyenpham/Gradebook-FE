import React, { useEffect } from "react";
import { AccessTime, ChevronRight } from "@mui/icons-material";
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
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./index.scss";
import { Link } from "react-router-dom";
import { patchAuth } from "../../../../Utils/httpHelpers";
import { convertToLocalDate, nameToAvatar } from "../../../../Utils/converters";
import { useState } from "react";

const RequestCard = ({ showAlert, id, request, setRequest, isLoading }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = +event.target[0].value;
    if (value === "") {
      setErrorMessage("Please enter score");
      return;
    } else if (!/^-?\d+$/.test(value)) {
      setErrorMessage("Invalid score");
      return;
    } else if (value < 0 || value > 10) {
      setErrorMessage("Score must be between 0 and 10");
      return;
    } else {
      setErrorMessage("");
    }
    const body = {
      finalGrade: value,
    };
    patchAuth(`/request/${id}`, body)
      .then((response) => {
        let newRequest = request;
        newRequest.status = "close";
        newRequest.finalGrade = value;
        setRequest(newRequest);
        showAlert(response.data.message);
      })
      .catch((error) => {
        event.target[0].value = "";
        if (error.response.status !== 500) {
          showAlert(error.response.data.message);
        } else {
          showAlert("Something went wrong, please try again!");
        }
      });
  };
  const FinalGradePanel = () => {
    if (request && request.role === "teacher") {
      return (
        <>
          <Grid item marginRight={2} xs={3}>
            <TextField
              disabled={request.status !== "open"}
              error={errorMessage.length !== 0}
              type="number"
              variant="outlined"
              size="small"
              label="Final Score"
              color="primary"
              helperText={errorMessage}
              defaultValue={request ? request.finalGrade : ""}
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              disabled={request.status !== "open"}
            >
              Submit & Close Review
            </Button>
          </Grid>
        </>
      );
    } else if (request && request.role === "student") {
      return (
        <>
          <Grid item marginRight={2}>
            <Typography variant="h6">Final decision: </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Final Score"
              color="primary"
              defaultValue={request ? request.finalGrade : ""}
              disabled
            ></TextField>
          </Grid>
        </>
      );
    }
  };
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
                {isLoading ? (
                  <Skeleton width="50px" />
                ) : (
                  <>
                    <AccessTime className="request-card-date" />{" "}
                    {convertToLocalDate(request.createdAt)}
                  </>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                className="request-card-title"
                component="div"
              >
                REQUEST TO REVIEW{" "}
                {request && (
                  <Chip
                    label={request.status}
                    color={request.status === "open" ? "success" : "error"}
                    size="small"
                  />
                )}
              </Typography>
            </Grid>
          </Grid>
          <Paper className="request-card-class-panel">
            <Grid container justifyContent="space-between" padding={2}>
              {isLoading ? (
                <Skeleton width="100%" height="80px" />
              ) : (
                <>
                  <Grid item>
                    <Typography variant="h6" color="white">
                      {request.class.name}{" "}
                      <Chip
                        label={request.gradeComposition.name}
                        color="secondary"
                        size="medium"
                      />
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link to={`/class/${request.class._id}`}>
                      <Button variant="contained" color="secondary">
                        Go to class
                      </Button>
                    </Link>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
          <br></br>
          <Paper className="request-card-review-panel">
            {isLoading ? (
              <Skeleton height="200px" sx={{ marginInline: "15px" }} />
            ) : (
              <>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red" }} aria-label="avatar">
                      {nameToAvatar(request.student.name)}
                    </Avatar>
                  }
                  title={
                    <Typography variant="body2" color="text.secondary">
                      Requested by
                    </Typography>
                  }
                  subheader={
                    <Typography variant="h6">
                      {request.student.studentId} | {request.student.name}
                    </Typography>
                  }
                />
                <Stack padding={2}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Paper className="request-card-review-panel-point-before">
                        <Typography variant="body1">
                          Current Score : <b>{request.curGrade}</b>
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item alignSelf="center">
                      <ChevronRight fontSize="2rem" />
                    </Grid>
                    <Grid item>
                      <Paper className="request-card-review-panel-point-after">
                        <Typography variant="body1">
                          Expected Score : <b>{request.expectedGrade}</b>
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Typography variant="h6">Reason</Typography>
                  <Typography variant="body1">{request.explanation}</Typography>
                </Stack>
              </>
            )}
          </Paper>
        </CardContent>
        <CardActions sx={{ paddingInline: "1rem" }}>
          <Paper className="request-card-submit-panel">
            <form onSubmit={handleSubmit}>
              <Grid container justifyContent="flex-end" padding={2}>
                {isLoading ? (
                  <Skeleton width="100%" height="80px" />
                ) : (
                  <FinalGradePanel />
                )}
              </Grid>
            </form>
          </Paper>
        </CardActions>
      </Card>
    </div>
  );
};

export default RequestCard;
