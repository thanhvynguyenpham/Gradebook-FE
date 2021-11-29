import { Download } from "@mui/icons-material";
import {
  Button,
  Grid,
  Input,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import XLSX from "xlsx";
import { convertToJson } from "../../../../Utils/converters";
import { postAuth } from "../../../../Utils/httpHelpers";

const StudentList = ({
  hidden,
  students,
  setStudents,
  classDetails,
  setAlertMessage,
  setOpenAlertMessage,
}) => {
  const [studentLists, setStudentLists] = useState(students);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const handleFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      setStudentLists(convertToJson(data));
      console.log(convertToJson(data));
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };
  const onUpdateStudents = () => {
    setBtnDisabled(true);
    const body = {
      listStudents: JSON.stringify(studentLists),
    };
    postAuth(`/class/${classDetails.id}/list-students`, body)
      .then((response) => {
        setBtnDisabled(false);
        setStudents(response.data);
        setAlertMessage("Update student list successfully.");
        setOpenAlertMessage(true);
      })
      .catch((error) => {
        setBtnDisabled(false);
        setAlertMessage(error.response.error);
        setOpenAlertMessage(true);
      });
  };
  return (
    <Grid item xs={12} sm={10} hidden={hidden}>
      <Stack spacing={3} width={"100%"}>
        <Paper elevation={3} className="top-panel">
          <Grid
            container
            item
            xs={12}
            justifyContent="space-between"
            padding="20px"
          >
            <Grid item>
              <Input
                type="file"
                onChange={handleFile}
                style={{ color: "white" }}
              />
            </Grid>
            <Grid item>
              <Link
                to="/assets/templates/student-list-template.xlsx"
                target="_blank"
                download
              >
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Download />}
                >
                  Student Template
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={2} style={{ padding: "20px" }}>
          <Typography variant="h5">Preview</Typography>
          {studentLists.length !== 0 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Student Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentLists.map((student, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {student.studentId}
                        </TableCell>
                        <TableCell>{student.fullName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container xs={12} justifyContent="center" padding="10px">
                <Button
                  variant="outlined"
                  onClick={onUpdateStudents}
                  disabled={btnDisabled}
                >
                  Update Students List
                </Button>
              </Grid>
            </>
          ) : (
            <Typography variant="body1" textAlign="center">
              No file chosen
            </Typography>
          )}
        </Paper>
      </Stack>
    </Grid>
  );
};

export default StudentList;
