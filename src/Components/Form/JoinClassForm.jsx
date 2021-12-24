import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import { postAuth } from "../../Utils/httpHelpers";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  code: yup
    .string("Enter a class code")
    .max(10, "Class code is no more than 10 characters")
    .required("Class code is required"),
});

const JoinClassForm = ({ isShow, handleClose, onJoinFailed }) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setBtnDisabled(true);
      submitForm(values);
      formik.resetForm();
    },
  });

  useEffect(() => {
    setBtnDisabled(false);
  }, [isShow]);

  function submitForm(values) {
    postAuth(`/classes/join?code=${values.code}`)
      .then((response) => {
        history.push(`/class/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
        onJoinFailed("Cannot join class");
        setBtnDisabled(false);
      });
  }

  function onClose() {
    handleClose();
    formik.resetForm();
  }

  return (
    <div>
      <Dialog open={isShow} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Join A Class</DialogTitle>
          <DialogContent>
            <TextField
              disabled={btnDisabled}
              autoFocus
              margin="dense"
              id="code"
              label="Class Code"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} disabled={btnDisabled}>
              Cancel
            </Button>
            <Button type="submit" disabled={btnDisabled}>
              Join class
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default JoinClassForm;
