import {
  Container,
  Grid,
  Snackbar,
  Tabs,
  Tab,
  Box,
  Stack,
  Skeleton,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import ReviewsList from "./Components/ReviewsList";
import { getAuth } from "../../Utils/httpHelpers";

function GradeReviews({ hidden }) {
  const [value, setValue] = useState(0);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestedList, setRequestedList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  useEffect(() => {
    const getReviewList = () => {
      getAuth(`/request/?role=teacher`)
        .then((response) => {
          setReviewList(response.data);
          setIsLoadingReview(false);
        })
        .catch((error) => {
          setIsLoadingReview(false);
          if (error.response.status !== 500) {
            setAlertMessage(error.response.data.message);
          } else {
            setAlertMessage("Something went wrong, please try again.");
          }
        });
    };
    const getRequestList = () => {
      getAuth(`/request/?role=student`)
        .then((response) => {
          setRequestedList(response.data);
          setIsLoadingRequest(false);
        })
        .catch((error) => {
          setIsLoadingRequest(false);
          if (error.response.status !== 500) {
            setAlertMessage(error.response.data.message);
          } else {
            setAlertMessage("Something went wrong, please try again.");
          }
        });
    };
    getReviewList();
    getRequestList();
  }, []);

  useEffect(() => {
    if (alertMessage.length !== 0) {
      setOpenAlertMessage(true);
    } else {
      setOpenAlertMessage(false);
    }
  }, [alertMessage]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div hidden={hidden}>
      <Header isAtMainPage={false} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="To Review" key="tab-1" />
          <Tab label="Requested" key="tab-2" />
        </Tabs>
      </Box>
      <Container className="dashboard" sx={{ mt: 4 }}>
        <Grid container spacing={6} justifyContent="center">
          <Grid container item justifyContent="center">
            <Grid item xs={9} hidden={value !== 0}>
              {isLoadingReview ? (
                <Stack>
                  <Skeleton height="80px" />
                  <Skeleton height="80px" height="80px" />
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                </Stack>
              ) : (
                <ReviewsList
                  hidden={value !== 0}
                  isRequestedList={false}
                  list={reviewList}
                />
              )}
            </Grid>
            <Grid item xs={8} hidden={value !== 1}>
              {isLoadingRequest ? (
                <Stack>
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                  <Skeleton height="80px" />
                </Stack>
              ) : (
                <ReviewsList
                  hidden={value !== 1}
                  isRequestedList={true}
                  list={requestedList}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openAlertMessage}
        autoHideDuration={4000}
        onClose={() => setOpenAlertMessage(false)}
        message={alertMessage}
      />
    </div>
  );
}

export default GradeReviews;
