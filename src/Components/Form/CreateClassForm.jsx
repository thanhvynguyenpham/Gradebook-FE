import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  classname: yup
    .string("Enter a class name")
    .required("Class name is required"),
  description: yup
    .string("Enter your class description")
    .required("Password is required"),
});

export default function CreateClassForm() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      classname: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create A Class</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="classname"
              label="Class Name"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.classname}
              onChange={formik.handleChange}
              error={
                formik.touched.classname && Boolean(formik.errors.classname)
              }
              helperText={formik.touched.classname && formik.errors.classname}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
