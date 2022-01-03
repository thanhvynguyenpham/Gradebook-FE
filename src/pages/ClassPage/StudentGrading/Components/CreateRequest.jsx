import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Grid,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CreateRequest({ open, handleClose, assignments }) {
  const [assignment, setAssignment] = React.useState("");

  const handleChange = (event) => {
    setAssignment(event.target.value);
    console.log(assignment);
  };
  const handleSubmit = (event) => {
    console.log(event);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <form onSubmit={handleSubmit}>
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
                  required
                  autoFocus
                  id="name"
                  label="Expected Point"
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required multiline fullWidth label="Reason" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Send Request</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
