import React from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const filterList = (list, cols, searchValue) => {
  if (list.length === 0) return;
  const normalizedSearchText = searchValue.toString();
  // .normalize("NFD")
  // .replace(/[\u0300-\u036f]/g, "");
  const searchRegex = new RegExp(escapeRegExp(normalizedSearchText), "i");
  const filteredRows = list.filter((row) => {
    return cols.some((field) => {
      return searchRegex.test(
        row[field] &&
          row[field]
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
      );
    });
  });
  return filteredRows;
};

export function getDateComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingDateComparator(a, b, orderBy)
    : (a, b) => -descendingDateComparator(a, b, orderBy);
}

export function descendingDateComparator(a, b, orderBy) {
  var d1 = new Date(a[orderBy]);
  var d2 = new Date(b[orderBy]);
  if (d2 < d1) {
    return -1;
  }
  if (d2 > d1) {
    return 1;
  }
  return 0;
}
