import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Search from "@mui/icons-material/Search";
import Clear from "@mui/icons-material/Clear";
import { filterList, getDateComparator } from "../../Utils/utils";
import {
  Button,
  Paper,
  Skeleton,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { DoDisturbOff, DoDisturbOn } from "@mui/icons-material";
import { deleteAuth, postAuth } from "../../Utils/httpHelpers";
import TableSortedHead from "../TableCell.jsx/TableSortedHead";

export default function Classes({ classes, setClasses, isLoading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchText, setSearchText] = React.useState("");
  const [rows, setRows] = React.useState(classes);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdAt");

  React.useEffect(() => {
    handleSearch(searchText);
  }, [classes]);
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    handleSearch(searchValue);
    setPage(0);
  };

  const handleSearch = (searchValue) => {
    const filteredRows = filterList(classes, ["name"], searchValue);
    setRows(filteredRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateStatus = (id, status) => {
    let newList = [...classes];
    newList.find((value) => value._id === id).status = status;
    setClasses(newList);
  };

  const handleBlock = (id) => {
    deleteAuth(`/admin/classes/${id}`)
      .then(() => {
        updateStatus(id, "unable");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnblock = (id) => {
    postAuth(`/admin/classes/${id}`)
      .then(() => {
        updateStatus(id, "enable");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleOnChange = (event) => requestSearch(event.target.value);

  const clearSearch = () => requestSearch("");

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container flexDirection={"column"} padding={2}>
        <Grid item>
          <Title>Classes</Title>
        </Grid>
        <Grid item>
          <TextField
            variant="standard"
            value={searchText}
            onChange={handleOnChange}
            placeholder="Search by name…"
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
      </Grid>
      {isLoading ? (
        Array.from({ length: 7 }, (_, i) => <Skeleton height={50} />)
      ) : (
        <>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Number of teachers</TableCell>
                  <TableCell>Number of students</TableCell>
                  <TableSortedHead
                    label={"Created Date"}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                  />
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .sort(getDateComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell width="270px">{row.name}</TableCell>
                        <TableCell width="200px">
                          {row.createdUser.name}
                        </TableCell>
                        <TableCell>{row.numOfTeachers}</TableCell>
                        <TableCell>{row.numOfStudents}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell align="right">
                          {row.status === "enable" ? (
                            <Button
                              variant="outlined"
                              style={{ width: "120px" }}
                              startIcon={<DoDisturbOn />}
                              onClick={() => handleBlock(row._id)}
                            >
                              Block
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              style={{ width: "120px" }}
                              startIcon={<DoDisturbOff />}
                              onClick={() => handleUnblock(row._id)}
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
    </Paper>
  );
}
