import {
  Container,
  Grid,
  Snackbar,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Grading/index.scss";
import StudentPoint from "./Components/StudentPoint";
import ManageReview from "./Components/ManageReview";
function StudentGrading({ hidden, classDetails }) {
  const [value, setValue] = useState(0);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div hidden={hidden}>
      <Container sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2} xs={12} justifyContent="center">
          <Grid item sm={2}>
            <Tabs
              orientation={smDown ? "horizontal" : "vertical"}
              aria-label="Vertical tabs"
              sx={{ borderRight: 1, borderColor: "divider" }}
              value={value}
              onChange={handleChange}
            >
              <Tab label="Marks" key="tab-1" />
              <Tab label="Reviews" key="tab-2" />
            </Tabs>
          </Grid>
          <StudentPoint hidden={value !== 0} />
          <ManageReview hidden={value !== 1} />
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

export default StudentGrading;
