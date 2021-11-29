import { Download, UploadFile } from "@mui/icons-material";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadGradeForm from "./UploadGradeForm";

const Marks = ({
  hidden,
  students,
  assignments,
  classDetails,
  setAlertMessage,
  setOpenAlertMessage,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
                onClick={handleOpenDialog}
              >
                Upload Marksheet
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Stack>
      <UploadGradeForm
        openDialog={openDialog}
        assignments={assignments}
        classDetails={classDetails}
        setAlertMessage={setAlertMessage}
        setOpenAlertMessage={setOpenAlertMessage}
        handleClose={handleCloseDialog}
      />
    </Grid>
  );
};

export default Marks;
