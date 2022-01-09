import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import IDField from "./IDField";
import { DoDisturbOff, DoDisturbOn } from "@mui/icons-material";
import { useState } from "react";
import Title from "./Title";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import { filterList, getDateComparator } from "Utils/utils";
import TableSortedHead from "Components/TableCell.jsx/TableSortedHead";
const UsersList = ({
  isLoading,
  users,
  setUsers,
  isAdmin,
  handleBlock,
  handleUnblock,
  handleFailedMessage,
  handleSuccessMessage,
  handleOpenAdminCreateForm,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(users);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdAt");

  React.useEffect(() => {
    handleSearch(searchText);
  }, [users]); // eslint-disable-line

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    handleSearch(searchValue);
    setPage(0);
  };

  const handleSearch = (searchValue) => {
    const filteredRows = filterList(users, ["email", "name"], searchValue);
    setRows(filteredRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOnChange = (event) => requestSearch(event.target.value);

  const clearSearch = () => requestSearch("");
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
          <Grid item alignSelf="flex-end">
            <Button
              variant="contained"
              sx={{
                width: "150px",
              }}
              onClick={handleOpenAdminCreateForm}
            >
              Create Admin
            </Button>
          </Grid>
        )}
        <Grid item>
          <TextField
            variant="standard"
            value={searchText}
            onChange={handleOnChange}
            placeholder="Search by name or email…"
            InputProps={{
              startAdornment: <Search fontSize="small" />,
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Clear"
                  size="small"
                  style={{ visibility: searchText ? "visible" : "hidden" }}
                  onClick={clearSearch}
                >
                  <Clear fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{
              width: {
                xs: 1,
                sm: "auto",
              },
              m: (theme) => theme.spacing(1, 0.5, 1.5),
              "& .MuiSvgIcon-root": {
                mr: 0.5,
              },
              "& .MuiInput-underline:before": {
                borderBottom: 1,
                borderColor: "divider",
              },
            }}
          />
        </Grid>

        <Grid item>
          {isLoading ? (
            Array.from({ length: 7 }, (_, i) => (
              <Skeleton key={i} height={50} />
            ))
          ) : (
            <>
              <TableContainer>
                <Table
                  sx={{ minWidth: 800 }}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell width="250px">Email</TableCell>
                      <TableCell width="180px">First Name</TableCell>
                      <TableCell width="180px">Last Name</TableCell>
                      <TableSortedHead
                        label={"Created At"}
                        order={order}
                        orderBy={orderBy}
                        setOrder={setOrder}
                        setOrderBy={setOrderBy}
                      />
                      {!isAdmin && <TableCell>StudentID</TableCell>}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .sort(getDateComparator(order, orderBy))
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
                            <TableCell>{row.createdAt}</TableCell>
                            {!isAdmin && (
                              <TableCell>
                                {row.studentId ? (
                                  row.studentId
                                ) : (
                                  <IDField
                                    identity={row._id}
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
                                  onClick={() =>
                                    handleBlock(
                                      rowsPerPage * page + index,
                                      row._id,
                                      isAdmin
                                    )
                                  }
                                >
                                  Block
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  style={{ width: "120px" }}
                                  startIcon={<DoDisturbOff />}
                                  onClick={() =>
                                    handleUnblock(
                                      rowsPerPage * page + index,
                                      row._id,
                                      isAdmin
                                    )
                                  }
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
                count={rows.length}
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
