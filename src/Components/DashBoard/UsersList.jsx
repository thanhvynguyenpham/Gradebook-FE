import React from "react";
import {
  Button,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import IDField from "./IDField";
import { DoDisturbOff, DoDisturbOn } from "@mui/icons-material";
import { useState } from "react";
import Title from "./Title";
const UsersList = ({
  isLoading,
  users,
  setUsers,
  isAdmin,
  handleBlock,
  handleUnblock,
  handleFailedMessage,
  handleSuccessMessage,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Grid container flexDirection={"column"} padding={2}>
        <Grid item>
          <Title>{isAdmin ? "Admins" : "Members"}</Title>
        </Grid>
        {isAdmin && (
          <Grid item>
            <Button
              variant="contained"
              sx={{
                width: "150px",
              }}
              color="secondary"
            >
              Create Admin
            </Button>
          </Grid>
        )}

        <Grid item>
          {isLoading ? (
            Array.from({ length: 7 }, (_, i) => (
              <Skeleton key={i} height={50} />
            ))
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      {!isAdmin && <TableCell>StudentID</TableCell>}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            {!isAdmin && (
                              <TableCell>
                                {row.studentId ? (
                                  row.studentId
                                ) : (
                                  <IDField
                                    identity={row._id}
                                    index={index}
                                    users={users}
                                    setUsers={setUsers}
                                    showSuccessfulAlert={handleSuccessMessage}
                                    showFailedAlert={handleFailedMessage}
                                  />
                                )}
                              </TableCell>
                            )}
                            <TableCell align="right">
                              {row.status === "enable" ? (
                                <Button
                                  variant="outlined"
                                  style={{ width: "120px" }}
                                  startIcon={<DoDisturbOn />}
                                  onClick={() => handleBlock(index, row._id)}
                                >
                                  Block
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  style={{ width: "120px" }}
                                  startIcon={<DoDisturbOff />}
                                  onClick={() => handleUnblock(index, row._id)}
                                >
                                  Unblock
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UsersList;
