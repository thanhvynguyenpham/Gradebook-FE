import React, { useEffect } from "react";
import { Send } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { nameToAvatar } from "../../../../Utils/converters";
import { useState } from "react";
import { getAuth, postAuth } from "../../../../Utils/httpHelpers";
import { getLocalUser } from "../../../../Utils/localStorageGetSet";
import { useParams } from "react-router-dom";

const ListComments = ({ showAlert, status }) => {
  const [listComments, setListComments] = useState([]);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [disableComment, setDisableComment] = useState(false);
  const user = getLocalUser();
  useEffect(() => {
    const loadComments = () => {
      getAuth(`/request/${id}/comments`).then((response) => {
        setListComments(response.data);
      });
    };
    loadComments();
  }, [id]);
  const handleComment = (event) => {
    setComment(event.target.value);
  };
  const submitForm = () => {
    if (comment.length === 0) {
      return;
    } else {
      const body = {
        content: comment,
      };
      setDisableComment(true);
      postAuth(`/request/${id}/comments`, body)
        .then((response) => {
          let newList = [...listComments];
          newList.push(response.data);
          setListComments(newList);
          setDisableComment(false);
          setComment("");
        })
        .catch((error) => {
          setDisableComment(false);
          if (error.response.status !== 500) {
            showAlert(error.response.data.message);
          } else {
            showAlert("Something went wrong, please try again!");
          }
        });
    }
  };
  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h6">COMMENTS</Typography>
        {listComments &&
          listComments.map((comment, key) => (
            <Card key={key}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {nameToAvatar(comment.user.name)}
                  </Avatar>
                }
                title={comment.user.name}
                subheader={comment.createdAt}
              />
              <CardContent>
                <Typography variant="body1">{comment.content}</Typography>
              </CardContent>
            </Card>
          ))}
        <Card hidden={status === "close"}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1.5}>
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  {(user.firstName && user.firstName.slice(0, 1)) +
                    (user.lastName && user.lastName.slice(0, 1))}
                </Avatar>
              </Grid>
              <Grid item xs={9.5}>
                <TextField
                  disabled={disableComment}
                  fullWidth
                  type="text"
                  variant="outlined"
                  placeholder="Leave a comment"
                  onChange={handleComment}
                  value={comment}
                ></TextField>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={submitForm} disabled={disableComment}>
                  <Send />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};

export default ListComments;
