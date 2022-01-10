import { Chip, Grid, Typography } from "@mui/material";
import InformationDialogs from "Components/Dialog/InformationDialog";
import React from "react";

export const AccountDetail = ({ open, handleClose, activeAccount }) => {
  return (
    <div>
      {activeAccount && (
        <InformationDialogs
          open={open}
          handleClose={handleClose}
          title="Account Detail"
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
              <Typography variant="h4">{activeAccount.name}</Typography>
              <Chip
                color={activeAccount.status === "enable" ? "success" : "error"}
                label={activeAccount.status.toUpperCase()}
                size="small"
              ></Chip>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>Role:</b> {activeAccount.role.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="20px" textOverflow="ellipsis">
                <b>Email:</b> {activeAccount.email}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>StudentID:</b>{" "}
                {activeAccount.studentId
                  ? activeAccount.studentId
                  : "Not updated yet"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="20px">
                <b>Created date:</b> {activeAccount.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </InformationDialogs>
      )}
    </div>
  );
};
