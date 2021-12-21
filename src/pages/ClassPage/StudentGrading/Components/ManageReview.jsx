import {
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
const ManageReview = ({ hidden }) => {
  return (
    <Grid item xs={12} sm={10} hidden={hidden}>
      <Stack spacing={3} width={"100%"}>
        <Paper elevation={3} className="top-panel">
          <Grid
            container
            item
            xs={12}
            padding="20px"
            spacing={2}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography variant="h5">Reviews</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={2} style={{ padding: "20px" }}></Paper>
      </Stack>
    </Grid>
  );
};

export default ManageReview;
