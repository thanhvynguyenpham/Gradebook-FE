import {
  Container,
  Grid,
  Snackbar,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GradeStructure from "./Components/GradeStructure";
import Marks from "./Components/Marks";
import StudentList from "./Components/StudentList";

import "./index.scss";
function Grading({
  hidden,
  gradeStructure,
  classDetails,
  updateGradeStructure,
}) {
  const [value, setValue] = useState(0);
  const [assignments, setAssignments] = useState(gradeStructure);
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [students, setStudents] = useState([]);
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
              orientation={smDown ? "horizontal" : "vertical"}
              aria-label="Vertical tabs"
              sx={{ borderRight: 1, borderColor: "divider" }}
              value={value}
              onChange={handleChange}
            >
              <Tab label="Grade Structure" key="tab-1" />
              <Tab label="Marks" key="tab-2" />
              <Tab label="Student List" key="tab-3" />
            </Tabs>
          </Grid>
          <GradeStructure
            hidden={value !== 0}
            assignments={assignments}
            updateAssignments={setAssignments}
            updateGradeStructure={updateGradeStructure}
            classDetails={classDetails}
            setAlertMessage={setAlertMessage}
            setOpenAlertMessage={setOpenAlertMessage}
          />
          <Marks
            hidden={value !== 1}
            assignments={gradeStructure}
            classDetails={classDetails}
            setAlertMessage={setAlertMessage}
            setOpenAlertMessage={setOpenAlertMessage}
          />
          <StudentList
            hidden={value !== 2}
            students={students}
            setStudents={setStudents}
            classDetails={classDetails}
            setAlertMessage={setAlertMessage}
            setOpenAlertMessage={setOpenAlertMessage}
          />
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
