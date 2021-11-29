import { UploadFile } from "@mui/icons-material";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const Marks = ({ hidden }) => {
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
              <Typography variant="h5">Class Mark</Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                startIcon={<UploadFile />}
              >
                Upload Marksheet
              </Button>
            </Grid>
            {/* <Link
              to="/assets/templates/point-template.xlsx"
              target="_blank"
              download
            >
              <Button size="small" variant="contained" startIcon={<Download />}>
                Point Template
              </Button>
            </Link> */}
          </Grid>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default Marks;
