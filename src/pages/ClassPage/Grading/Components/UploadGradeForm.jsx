import { Download } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import XLSX from "xlsx";
import { convertToJson } from "../../../../Utils/converters";
import { postAuth } from "../../../../Utils/httpHelpers";

const UploadGradeForm = ({
  openDialog,
  handleClose,
  assignments,
  classDetails,
  setAlertMessage,
  setOpenAlertMessage,
  getGradeBoard,
}) => {
  const [gradeList, setGradeList] = useState([]);
  const [assignment, setAssignment] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleFile = (e) => {
    setGradeList([]);
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
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      setGradeList(convertToJson(data, ["studentId", "grade"]));
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleChangeAssignment = (event) => {
    setAssignment(event.target.value);
  };

  const uploadAssignmentGrade = () => {
    setBtnDisabled(true);
    if (assignment === "") {
      setAlertMessage("Please choose an assignment.");
      setOpenAlertMessage(true);
      setBtnDisabled(false);
      return;
    }
    if (gradeList.length === 0) {
      setAlertMessage("Please a file to upload.");
      setOpenAlertMessage(true);
      setBtnDisabled(false);
      return;
    }
    const body = {
      identity: assignment,
      grades: gradeList,
    };
    postAuth(`/class/${classDetails._id}/student-grades`, body)
      .then((response) => {
        setBtnDisabled(false);
        getGradeBoard();
        setAlertMessage("Update grade successfully.");
        setOpenAlertMessage(true);
        handleClose();
        setGradeList([]);
        setAssignment("");
      })
      .catch((error) => {
        setBtnDisabled(false);
        if (error.response.data.err) {
          setAlertMessage(error.response.data.err);
        } else {
          setAlertMessage("Cannot update right now. Please try again!");
        }
        setOpenAlertMessage(true);
      });
  };
  return (
    <Dialog
      fullWidth
      open={openDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Upload Marksheet</DialogTitle>
      <DialogContent>
        <Grid container xs={12} justifyContent="space-evenly" spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="standard" size="small">
              <InputLabel id="demo-simple-select-label">Assignment</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={assignment}
                label="Assignment"
                onChange={handleChangeAssignment}
              >
                {assignments.map((item) => (
                  <MenuItem value={item.identity} key={item.identity}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="outlined" component="label">
              Upload File
              <input type="file" hidden onChange={handleFile} />
            </Button>
          </Grid>

          <Grid item>
            <Link
              to="/assets/templates/point-template.xlsx"
              target="_blank"
              download
            >
              <Button variant="contained" startIcon={<Download />}>
                Point Template
              </Button>
            </Link>
          </Grid>
          {gradeList.length !== 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gradeList.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.studentId}
                      </TableCell>
                      <TableCell>{item.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          onClick={uploadAssignmentGrade}
          autoFocus
          disabled={btnDisabled}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadGradeForm;
