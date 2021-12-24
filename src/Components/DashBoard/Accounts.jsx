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

export default function Accounts({ users, setUsers, isLoading }) {
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
    let newList = [...users];
    newList[index].status = status;
    setUsers(newList);
  };

  const handleBlock = (index, id) => {
    deleteAuth(`/admin/users/${id}`)
      .then(() => {
        updateStatus(index, "unable");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnblock = (index, id) => {
    postAuth(`/admin/users/${id}`)
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
      <Title>Accounts</Title>
      {isLoading ? (
        Array.from({ length: 7 }, (_, i) => <Skeleton key={i} height={50} />)
      ) : (
        <>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>StudentID</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.studentId}</TableCell>
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
    </Paper>
  );
}
