import {
  Container,
  Grid,
  Button,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAuth } from "Utils/httpHelpers";
import "../Grading/index.scss";
import CreateRequest from "./Components/CreateRequest";
function StudentGrading({ hidden, classDetails }) {
  const [openAlertMessage, setOpenAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      getAuth(`/class/${classDetails._id}/student/grades-board`)
        .then((response) => {
          setAssignments(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [classDetails]);

  const openCreateRequestDialog = () => {
    setOpenForm(true);
  };
  const closeCreateRequestDialog = () => {
    setOpenForm(false);
  };
  const showAlert = (message) => {
    setAlertMessage(message);
    setOpenAlertMessage(true);
  };
  return (
    <div hidden={hidden}>
      <Container sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2} xs={12} justifyContent="center">
          <Grid item xs={12} sm={10} hidden={hidden}>
            <Stack spacing={3} width={"100%"}>
              <Paper elevation={3} className="top-panel">
                <Grid
                  container
                  item
                  xs={12}
                  padding="20px"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h5">Class Mark</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={openCreateRequestDialog}
                    >
                      Request a review
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              {isLoading ? (
                <Paper elevation={2} style={{ padding: "20px" }}>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </Paper>
              ) : (
                <Paper elevation={2} style={{ padding: "20px" }}>
                  {assignments.grades && assignments.grades.length !== 0 ? (
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            {assignments.grades.map((assignment) => (
                              <TableCell>{assignment.name}</TableCell>
                            ))}
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Grade Structure
                            </TableCell>
                            {assignments.grades.map((assignment, i) => (
                              <TableCell key={`grade-structure-${i}`}>
                                {assignment.pointStructure}
                              </TableCell>
                            ))}
                            <TableCell
                              component="th"
                              scope="row"
                              key={`grade-structure-total`}
                            >
                              10
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              Score
                            </TableCell>
                            {assignments.grades.map((assignment, i) => (
                              <TableCell key={`point-${i}`}>
                                {assignment.point ?? ""}
                              </TableCell>
                            ))}
                            <TableCell component="th" scope="row" key={`total`}>
                              {assignments.total ? assignments.total : ""}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography variant="body1" textAlign="center">
                      No final grade yet.
                    </Typography>
                  )}
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <CreateRequest
        open={openForm}
        handleClose={closeCreateRequestDialog}
        assignments={assignments}
        classDetails={classDetails}
        showAlert={showAlert}
      />
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
