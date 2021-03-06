import * as React from "react";
import { Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import ReviewListItem from "./ReviewListItem";
import { useState } from "react";
import { useEffect } from "react";
import { REQUEST_ITEMS_PER_PAGE } from "enum";
import { Link } from "react-router-dom";

export default function ReviewsList({ hidden, list, isRequestedList }) {
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(0);
  const [presentList, setPresentList] = useState(list);

  useEffect(() => {
    const num = Math.ceil(list.length / REQUEST_ITEMS_PER_PAGE);
    setNumOfPage(num);
    setPresentList(list);
    setPage(1);
    changeList(0);
  }, [list]); // eslint-disable-line
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const changeList = (page) => {
    const newList = list.slice(
      page * REQUEST_ITEMS_PER_PAGE,
      page * REQUEST_ITEMS_PER_PAGE + 5
    );
    setPresentList(newList);
  };
  const onChangePage = (event, value) => {
    setPage(value);
    changeList(value - 1);
  };
  return (
    <div hidden={hidden}>
      <Stack spacing={smDown ? 4 : 2}>
        {presentList.map((item) => (
          <Link to={`/reviews/${item._id}`}>
            <ReviewListItem request={item} requestedList={isRequestedList} />
          </Link>
        ))}
        <br></br>
        {list.length === 0 ? (
          <Typography variant="h5" style={{ alignSelf: "center" }}>
            No request yet.
          </Typography>
        ) : (
          <Pagination
            count={numOfPage}
            page={page}
            onChange={onChangePage}
            color="primary"
            style={{ alignSelf: "center" }}
          />
        )}
      </Stack>
    </div>
  );
}
