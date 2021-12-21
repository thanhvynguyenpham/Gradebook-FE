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
const StudentPoint = ({ hidden }) => {
  const assignments = {
    grades: [
      {
        name: "Midterm",
        identity: "61c1552716b7be06d3e63b87",
        point: 10,
        pointStructure: "3",
      },
      {
        name: "Final",
        identity: "61c193b0ad9a5cc05a67b896",
        point: null,
        pointStructure: "7",
      },
    ],
    total: 9.3,
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
          </Grid>
        </Paper>
        <Paper elevation={2} style={{ padding: "20px" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {assignments &&
                    assignments.grades.map((assignment) => (
                      <TableCell>{assignment.name}</TableCell>
                    ))}
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Grade Structure
                  </TableCell>
                  {assignments &&
                    assignments.grades.map((assignment, i) => (
                      <TableCell key={`grade-structure-${i}`}>
                        {assignment.pointStructure}
                      </TableCell>
                    ))}
                  <TableCell
                    component="th"
                    scope="row"
                    key={`grade-structure-total`}
                  >
                    10
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    Score
                  </TableCell>
                  {assignments &&
                    assignments.grades.map((assignment, i) => (
                      <TableCell key={`point-${i}`}>
                        {assignment.point ?? ""}
                      </TableCell>
                    ))}
                  <TableCell component="th" scope="row" key={`total`}>
                    {assignments.total ?? ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  {assignments &&
                    assignments.grades.map((assignment, index) => (
                      <TableCell key={assignment.name}>
                        <Button size="small" variant="outlined">
                          Request a review
                        </Button>
                      </TableCell>
                    ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </Grid>
  );
};

export default StudentPoint;
