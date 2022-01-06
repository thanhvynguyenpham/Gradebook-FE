import { TableCell, TableSortLabel } from "@mui/material";

function TableSortedHead({ orderBy, order, setOrderBy, setOrder, label }) {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <TableCell
      width="200px"
      sortDirection={orderBy === "createdAt" ? order : false}
    >
      <TableSortLabel
        active={orderBy === "createdAt"}
        direction={orderBy === "createdAt" ? order : "asc"}
        onClick={createSortHandler("createdAt")}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
}

export default TableSortedHead;
