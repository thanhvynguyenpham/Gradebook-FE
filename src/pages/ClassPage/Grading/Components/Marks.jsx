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
import React, { useState } from "react";
import UploadGradeForm from "./UploadGradeForm";
const data = [
  {
    studentId: "18127127",
    account: null,
    grades: [
      {
        name: "Midterm",
        identity: "718786868",
        point: 10,
      },
      {
        name: "Final",
        identity: "718786868",
        point: 10,
      },
    ],
    total: 5,
  },
];
const Marks = ({
  hidden,
  assignments,
  classDetails,
  setAlertMessage,
  setOpenAlertMessage,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [studentList, setStudentList] = useState(data);
  const [oldValue, setOldValue] = useState("");

  const handleBlur = (event, student, index) => {
    if (event.target.value > 10 || event.target.value < 0) {
      event.target.value = oldValue;
    }
    if (event.target.value === oldValue) {
      return;
    }
    updatePoint(event.target.value, student, index);
  };
  const handleOnFocus = (event) => {
    setOldValue(event.target.value);
  };

  const updatePoint = (point, student, index) => {};

  const updateStudent = (student, index) => {
    let newList = studentList;
    if (newList[index]) {
      newList[index] = student;
      setStudentList(newList);
    }
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
        </Paper>
        <Paper elevation={2} style={{ padding: "20px" }}>
          {data.length !== 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Student Name</TableCell>
                    {data[0].grades.map((assignment, index) => (
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

                      {studentList[0].grades.map((assignment, i) => (
                        <TableCell key={`point-${i}`}>
                          <Input
                            defaultValue={assignment.point}
                            style={{ width: "50px" }}
                            onBlur={(event) =>
                              handleBlur(event, student, index)
                            }
                            onFocus={handleOnFocus}
                            type="number"
                          />
                        </TableCell>
                      ))}
                      <TableCell component="th" scope="row">
                        {student.total}
                      </TableCell>
                    </TableRow>
                  ))}
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
      />
    </Grid>
  );
};

export default Marks;
