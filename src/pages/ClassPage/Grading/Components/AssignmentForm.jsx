import { Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";

const AssignmentForm = ({ index, name, point, onFocus, onRemove }) => {
  const handleRemove = () => {
    onRemove(index);
  };
  return (
    <div>
      <Paper elevation={3}>
        <Grid
          container
          xs={12}
          padding={2}
          minHeight={80}
          columnSpacing={3}
          rowSpacing={2}
          justifyContent="space-between"
        >
          <Grid item xs={9}>
            <TextField
              placeholder="Assignment"
              fullWidth
              variant="standard"
              defaultValue={name}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              placeholder="Point"
              fullWidth
              variant="outlined"
              size="small"
              defaultValue={point}
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
      </Paper>
    </div>
  );
};

export default AssignmentForm;
