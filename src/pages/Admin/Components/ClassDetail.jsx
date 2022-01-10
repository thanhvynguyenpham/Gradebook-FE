import { Chip, Grid, Paper, Typography } from "@mui/material";
import InformationDialogs from "Components/Dialog/InformationDialog";
import React from "react";

const ClassDetail = ({ open, handleClose, activeClass }) => {
  return (
    <div>
      {activeClass && (
        <InformationDialogs
          open={open}
          handleClose={handleClose}
          title="Class Detail"
        >
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            spacing={2}
            padding={2}
            minWidth="500px"
          >
            <Grid item textAlign="center">
              <Typography variant="h4">{activeClass.name}</Typography>
              <Chip
                color={activeClass.status === "enable" ? "success" : "error"}
                label={activeClass.status.toUpperCase()}
                size="small"
              ></Chip>
            </Grid>
            <Grid item container justifyContent="center" columnSpacing={2}>
              <Grid item>
                <Paper
                  elevation={3}
                  sx={{
                    width: "120px",
                    height: "80px",
                    textAlign: "center",
                    bgcolor: "#e76f51",
                  }}
                >
                  <Typography variant="h6" color="white">
                    Teachers
                  </Typography>
                  <Typography variant="h5" color="white">
                    {activeClass.numOfTeachers}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper
                  elevation={3}
                  sx={{
                    width: "120px",
                    height: "80px",
                    textAlign: "center",
                    bgcolor: "#e76f51",
                  }}
                >
                  <Typography variant="h6" color="white">
                    Students
                  </Typography>
                  <Typography variant="h5" color="white">
                    {activeClass.numOfStudents}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>Owner:</b> {activeClass.createdUser.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>Description:</b> {activeClass.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>Created date:</b> {activeClass.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </InformationDialogs>
      )}
    </div>
  );
};

export default ClassDetail;
