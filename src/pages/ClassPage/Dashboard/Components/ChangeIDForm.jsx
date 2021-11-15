import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { patchAuth } from "../../../../Utils/httpHelpers";
const validationSchema = yup.object({
  studentID: yup
    .string()
    .required("Enter your studentID.")
    .matches(
      /^[aA-zZ0-9\s]+$/,
      "Student ID must only contains alphabets and numbers"
    ),
});
export const ChangeIDForm = ({
  classDetails,
  setStudentID,
  showAlertMessage,
}) => {
  const [disable, setDisable] = useState(false);
  const formik = useFormik({
    initialValues: {
      studentID: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setDisable(true);
      submitForm(values);
    },
    validateOnChange: (value) => {},
  });

  function submitForm(values) {
    const body = {
      studentId: values.studentID,
    };
    patchAuth(`/class/${classDetails._id}/studentid`, body)
      .then((response) => {
        setStudentID(values.studentID);
      })
      .catch((error) => {
        console.log(error);
        showAlertMessage();
        setDisable(false);
      });
  }
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="studentID"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.studentID}
              onChange={formik.handleChange}
              error={
                formik.touched.studentID && Boolean(formik.errors.studentID)
              }
              helperText={formik.touched.studentID && formik.errors.studentID}
              disabled={disable}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" type="submit" disabled={disable}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
