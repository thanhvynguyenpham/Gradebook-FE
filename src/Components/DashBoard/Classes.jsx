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

// Generate Student Data
function createData(name, owner, numOfTeachers, numOfStudents, status) {
  return { name, owner, numOfTeachers, numOfStudents, status };
}

export default function Classes() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      const rows = [
        createData("PTUDWNC", "Elton John", 1, 10, true),
        createData("PTUDWNC", "Elton John", 1, 10, true),
        createData("PTUDWNC", "Elton John", 1, 10, false),
        createData("PTUDWNC", "Elton John", 1, 10, true),
        createData("PTUDWNC", "Elton John", 1, 10, false),
        createData("PTUDWNC", "Elton John", 1, 10, false),
      ];
      setData(rows);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.owner}</TableCell>
                        <TableCell>{row.numOfTeachers}</TableCell>
                        <TableCell>{row.numOfStudents}</TableCell>
                        <TableCell align="right">
                          {row.status ? (
                            <Button
                              variant="outlined"
                              style={{ width: "120px" }}
                              startIcon={<DoDisturbOn />}
                            >
                              Block
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              style={{ width: "120px" }}
                              startIcon={<DoDisturbOff />}
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
            count={data.length}
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
