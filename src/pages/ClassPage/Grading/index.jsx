import { Container, Grid, Snackbar, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import GradeStructure from "./Components/GradeStructure";
import Marks from "./Components/Marks";

import "./index.scss";
function Grading({ hidden, gradeStructure, classDetails }) {
  const [value, setValue] = useState(1);
  const [assignments, setAssignments] = useState(gradeStructure);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setAssignments(gradeStructure);
  }, [gradeStructure]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div hidden={hidden}>
      <Container sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2} xs={12} justifyContent="center">
          <Grid item sm={2}>
            <Tabs
              orientation="vertical"
              aria-label="Vertical tabs"
              sx={{ borderRight: 1, borderColor: "divider" }}
              value={value}
              onChange={handleChange}
            >
              <Tab label="Grade Structure" key="tab-1" />
              <Tab label="Marks" key="tab-2" />
            </Tabs>
          </Grid>
          <GradeStructure
            hidden={value !== 0}
            assignments={assignments}
            updateAssignments={setAssignments}
            classDetails={classDetails}
            setAlertMessage={setAlertMessage}
            setOpenAlertMessage={setOpenAlertMessage}
          />
          <Marks hidden={value !== 1} />
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

export default Grading;
