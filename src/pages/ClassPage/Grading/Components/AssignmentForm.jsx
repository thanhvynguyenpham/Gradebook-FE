import { Button, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

const MAX_SCORE = 10;
const validationSchema = yup.object({
  name: yup
    .string("Enter an assignment name")
    .required("Enter an assignment name"),
  point: yup
    .number()
    .moreThan(0)
    .max(MAX_SCORE, "Point must below 10")
    .required("Point is required"),
});
const AssignmentForm = ({
  index,
  name,
  point,
  onFocus,
  onRemove,
  setValues,
}) => {
  const formik = useFormik({
    initialValues: {
      name: name,
      point: point,
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      setValues(index, values.name, values.point);
    },
    validateOnBlur: true,
  });

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <div>
      <Paper elevation={3}>
        <form onBlur={formik.handleSubmit}>
          <Grid
            container
            padding={2}
            minHeight={80}
            columnSpacing={3}
            rowSpacing={2}
            justifyContent="space-between"
          >
            <Grid item xs={9}>
              <TextField
                id="name"
                label="Assignment"
                fullWidth
                variant="standard"
                required
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Point"
                id="point"
                fullWidth
                variant="outlined"
                size="small"
                required
                type="number"
                value={formik.values.point}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.point && Boolean(formik.errors.point)}
                helperText={formik.touched.point && formik.errors.point}
              />
            </Grid>
            {onFocus && (
              <Grid item xs={12} textAlign="end">
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={handleRemove}
                >
                  Delete
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AssignmentForm;
