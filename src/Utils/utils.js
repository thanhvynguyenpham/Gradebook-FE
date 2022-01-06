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
  const normalizedSearchText = searchValue.toString();
  // .normalize("NFD")
  // .replace(/[\u0300-\u036f]/g, "");
  const searchRegex = new RegExp(escapeRegExp(normalizedSearchText), "i");
  const filteredRows = list.filter((row) => {
    return cols.some((field) => {
      return searchRegex.test(
        row[field]
          .toString()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );
    });
  });
  return filteredRows;
};
