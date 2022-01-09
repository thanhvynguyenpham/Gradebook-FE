import { UploadFile } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteAuth, getAuth, patchAuth, postAuth } from "Utils/httpHelpers";
import ExportGradeForm from "./ExportGradeForm";
import UploadGradeForm from "./UploadGradeForm";
const Marks = ({
  hidden,
  assignments,
  students,
  classDetails,
  setAlertMessage,
  setOpenAlertMessage,
  updateGradeStructure,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [oldValue, setOldValue] = useState();

  const getGradeBoard = () => {
    getAuth(`/class/${classDetails._id}/grades-board`)
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (classDetails._id !== undefined) {
      getGradeBoard();
    }
  }, [assignments, students, classDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBlur = (event, student, index, identity) => {
    if (event.target.value > 10 || event.target.value < 0) {
      event.target.value = oldValue;
    }
    if (event.target.value === oldValue) {
      return;
    }
    if (!updatePoint(event.target.value, student, index, identity)) {
      event.target.value = oldValue;
    }
  };
  const handleOnFocus = (event) => {
    setOldValue(event.target.value);
  };

  const updatePoint = (point, student, index, identity) => {
    const body = {
      studentId: student.studentId,
      identity: identity,
      point: parseInt(point),
    };
    patchAuth(`/class/${classDetails._id}/cell-grades-board`, body)
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return true;
  };

  const finalizeGrade = (index) => {
    postAuth(
      `/class/${classDetails._id}/grade-structure/${assignments[index].identity}`
    )
      .then((response) => {
        // let newArray = [...assignments];
        // newArray[index].finalized = true;
        updateGradeStructure(response.data.gradeStructure);
        setAlertMessage("Finalized this assignment.");
        setOpenAlertMessage(true);
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          setAlertMessage(error.response.data.message);
          setOpenAlertMessage(true);
        } else {
          setAlertMessage("Something went wrong. Please try again.");
          setOpenAlertMessage(true);
        }
      });
  };

  const unFinalizeGrade = (index) => {
    deleteAuth(
      `/class/${classDetails._id}/grade-structure/${assignments[index].identity}`
    )
      .then((response) => {
        // let newArray = [...assignments];
        // newArray[index].finalized = true;
        updateGradeStructure(response.data.gradeStructure);
        setAlertMessage("Finalized this assignment.");
        setOpenAlertMessage(true);
      })
      .catch((error) => {
        setAlertMessage(error.response.data.message);
        setOpenAlertMessage(true);
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
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
            <Grid container item spacing={2} width={"fit-content"}>
              <Grid item>
                <ExportGradeForm csvData={studentList} fileName="point" />
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<UploadFile />}
                  onClick={handleOpenDialog}
                >
                  Upload Marksheet
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={2} style={{ padding: "20px" }}>
          {studentList.length !== 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Student Account</TableCell>
                    {assignments.map((assignment, index) => (
                      <TableCell key={`header-${index}`}>
                        {assignment.name}
                      </TableCell>
                    ))}
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList.map((student, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        key={student.studentId}
                        component="th"
                        scope="row"
                      >
                        {student.studentId}
                      </TableCell>
                      {student.account ? (
                        <TableCell key={`name-${student.studentId}`}>
                          {student.account.name}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={`name-${student.studentId}`}
                          style={{ backgroundColor: "lightgrey" }}
                        ></TableCell>
                      )}

                      {student.grades.map((assignment, i) => (
                        <TableCell key={`point-${student.studentId}-${i}`}>
                          <div key={assignment.point}>
                            <Input
                              defaultValue={assignment.point}
                              style={{ width: "50px" }}
                              onBlur={(event) =>
                                handleBlur(
                                  event,
                                  student,
                                  index,
                                  assignment.identity
                                )
                              }
                              onFocus={handleOnFocus}
                              n
                              type="number"
                            />
                          </div>
                        </TableCell>
                      ))}
                      <TableCell
                        component="th"
                        scope="row"
                        key={`point-${student.studentId}-total`}
                      >
                        {student.total}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {assignments &&
                      assignments.map((assignment, index) => (
                        <TableCell key={assignment.name}>
                          {assignment.finalized ? (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => unFinalizeGrade(index)}
                            >
                              Unfinalize
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => finalizeGrade(index)}
                            >
                              Finalize
                            </Button>
                          )}
                        </TableCell>
                      ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Stack>
      <UploadGradeForm
        openDialog={openDialog}
        assignments={assignments}
        classDetails={classDetails}
        setAlertMessage={setAlertMessage}
        setOpenAlertMessage={setOpenAlertMessage}
        handleClose={handleCloseDialog}
        getGradeBoard={getGradeBoard}
      />
    </Grid>
  );
};

export default Marks;
