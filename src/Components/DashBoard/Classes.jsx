import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import {
  Button,
  Paper,
  Skeleton,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { DoDisturbOff, DoDisturbOn } from "@mui/icons-material";
import { deleteAuth, postAuth } from "../../Utils/httpHelpers";

export default function Classes({ classes, setClasses, isLoading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateStatus = (index, status) => {
    let newList = [...classes];
    newList[index].status = status;
    setClasses(newList);
  };

  const handleBlock = (index, id) => {
    deleteAuth(`/admin/classes/${id}`)
      .then(() => {
        updateStatus(index, "unable");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnblock = (index, id) => {
    postAuth(`/admin/classes/${id}`)
      .then(() => {
        updateStatus(index, "enable");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <Title>Classes</Title>
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.createdUser.name}</TableCell>
                        <TableCell>{row.numOfTeachers}</TableCell>
                        <TableCell>{row.numOfStudents}</TableCell>
                        <TableCell align="right">
                          {row.status === "enable" ? (
                            <Button
                              variant="outlined"
                              style={{ width: "120px" }}
                              startIcon={<DoDisturbOn />}
                              onClick={() =>
                                handleBlock(rowsPerPage * page + index, row._id)
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
                                  row._id
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
            count={classes.length}
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
