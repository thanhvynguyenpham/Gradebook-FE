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
import { Link, useParams } from "react-router-dom";
import { getAuth } from "../../../../Utils/httpHelpers";
import { convertToLocalDate, nameToAvatar } from "../../../../Utils/converters";
import { useState } from "react";

const RequestCard = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadRequest = () => {
      setIsLoading(true);
      getAuth(`/request/${id}`).then((response) => {
        setRequest(response.data);
        setIsLoading(false);
      });
    };
    loadRequest();
  }, []);
  const FinalGradePanel = () => {
    if (request && request.role === "teacher") {
      return (
        <>
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
        </>
      );
    } else if (request && request.role === "student") {
      return (
        <>
          <Grid item marginRight={2} xs={3}>
            <Typography variant="h6">Final decision: </Typography>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              label="Final Score"
              color="primary"
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
                    color={request.status === "open" ? "success" : "default"}
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
                    <Link to={`class/${request.class._id}`}>
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
            <Grid container justifyContent="flex-end" padding={2}>
              {isLoading ? (
                <Skeleton width="100%" height="80px" />
              ) : (
                <FinalGradePanel />
              )}
            </Grid>
          </Paper>
        </CardActions>
      </Card>
    </div>
  );
};

export default RequestCard;
