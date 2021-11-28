import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Marks = ({ hidden }) => {
  return (
    <Grid item xs={12} sm={10} hidden={hidden}>
      <Grid container item xs={12} justifyContent="flex-end">
        <Grid item xs={4}>
          <Link
            to="/assets/templates/student-list-template.xlsx"
            target="_blank"
            download
          >
            <Button size="small" variant="contained">
              Student Template
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link
            to="/assets/templates/point-template.xlsx"
            target="_blank"
            download
          >
            <Button size="small" variant="outlined">
              Point Template
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Marks;
