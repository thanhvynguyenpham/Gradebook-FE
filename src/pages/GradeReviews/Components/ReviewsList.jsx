import * as React from "react";
import { Pagination, Stack } from "@mui/material";
import ReviewListItem from "./ReviewListItem";
import { useState } from "react";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 5;

export default function ReviewsList({ hidden, list, isRequestedList }) {
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(0);
  const [presentList, setPresentList] = useState(list);

  useEffect(() => {
    const num = Math.ceil(list.length / ITEMS_PER_PAGE);
    setNumOfPage(num);
    setPresentList(list);
    setPage(1);
    changeList(0);
  }, [list]);
  const changeList = (page) => {
    const newList = list.slice(
      page * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE + 5
    );
    setPresentList(newList);
  };
  const onChangePage = (event, value) => {
    setPage(value);
    changeList(value - 1);
  };
  return (
    <div hidden={hidden}>
      <Stack spacing={2}>
        {presentList.map((item) => (
          <ReviewListItem request={item} requestedList={isRequestedList} />
        ))}
        <br></br>
        <Pagination
          count={numOfPage}
          page={page}
          onChange={onChangePage}
          color="primary"
          style={{ alignSelf: "center" }}
        />
      </Stack>
    </div>
  );
}
