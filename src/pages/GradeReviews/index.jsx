import { Container, Grid, Snackbar, Tabs, Tab, Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import ReviewsList from "./Components/ReviewsList";

const requestedListData = [
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "close",
  },
  {
    class: "Database",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "close",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    time: "26-11-2021",
    status: "open",
  },
];
const reviewListData = [
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    student: "Thanh Vy",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    student: "Thanh Vy",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    student: "Thanh Vy",
    time: "26-11-2021",
    status: "open",
  },
  {
    class: "Introducing to AI",
    assignment: "Midterm",
    student: "Thanh Vy",
    time: "26-11-2021",
    status: "open",
  },
];

function GradeReviews({ hidden }) {
  const [value, setValue] = useState(0);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestedList, setRequestedList] = useState(requestedListData);
  const [reviewList, setReviewList] = useState(reviewListData);

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
            <Grid item xs={9}>
              <ReviewsList
                hidden={value !== 0}
                isRequestedList={false}
                list={reviewList}
              />
            </Grid>
            <Grid item xs={8}>
              <ReviewsList
                hidden={value !== 1}
                isRequestedList={true}
                list={requestedList}
              />
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
