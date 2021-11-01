import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import { post } from "../../Utils/httpHelpers";

const validationSchema = yup.object({
  classname: yup
    .string("Enter a class name")
    .required("Class name is required"),
  description: yup
    .string("Enter your class description")
    .required("Description is required"),
});

const CreateClassForm = ({ isShow, reloadFucntion, handleClose }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      classname: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setBtnDisabled(true);
      submitForm(values);
    },
  });

  useEffect(() => {
    return () => {
      setBtnDisabled(false);
      formik.resetForm();
    };
  }, [isShow]);

  function submitForm(values) {
    const body = {
      name: values.classname,
      description: values.description,
      ownerID: 1,
    };
    post("class", body)
      .then((response) => {
        if (response.status === 200) {
          reloadFucntion();
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Dialog open={isShow} onClose={handleClose}>
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
            <Button onClick={handleClose} disabled={btnDisabled}>
              Cancel
            </Button>
            <Button type="submit" disabled={btnDisabled}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateClassForm;
