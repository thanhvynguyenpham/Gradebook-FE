import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Grid,
} from "@mui/material";
import { postAuth } from "Utils/httpHelpers";
import { useState } from "react";
const validationSchema = yup.object({
  point: yup
    .number()
    .moreThan(0)
    .max(10, "Point must below 10")
    .required("Point is required"),
  explanation: yup.string().required("explanation is required"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CreateRequest({
  open,
  handleClose,
  assignments,
  classDetails,
  showAlert,
}) {
  const [assignment, setAssignment] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      point: "",
      explanation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setBtnDisabled(true);
      submitForm(values);
      formik.resetForm();
    },
  });
  const handleChange = (event) => {
    setAssignment(event.target.value);
  };
  function submitForm(values) {
    const body = {
      class: classDetails._id,
      gradeIdentity: assignment,
      expectedGrade: values.point,
      explanation: values.explanation,
    };
    postAuth("/request", body)
      .then((response) => {
        showAlert("Send request successfully");
        setBtnDisabled(false);
        handleClose();
      })
      .catch((error) => {
        setBtnDisabled(false);
        if (error.response.status !== 500) {
          showAlert(error.response.data.message);
        } else {
          showAlert("Something went wrong. Please try again.");
        }
      });
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Request A Review</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Send your expected point and reason for reviewing to your
                  teachers.
                </DialogContentText>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Assignment
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Assignment"
                    onChange={handleChange}
                  >
                    {assignments.grades &&
                      assignments.grades.map((item) => (
                        <MenuItem key={item.identity} value={item.identity}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoFocus
                  required
                  id="point"
                  label="Expected Point"
                  type="number"
                  fullWidth
                  value={formik.values.point}
                  onChange={formik.handleChange}
                  error={formik.touched.point && Boolean(formik.errors.point)}
                  helperText={formik.touched.point && formik.errors.point}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  label="Explanation"
                  id="explanation"
                  value={formik.values.explanation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.explanation &&
                    Boolean(formik.errors.explanation)
                  }
                  helperText={
                    formik.touchedexplanation && formik.errors.explanation
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={btnDisabled} type="submit">
              Send Request
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
