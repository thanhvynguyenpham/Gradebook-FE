import React from "react";
import { Send } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { nameToAvatar } from "../../../../Utils/converters";
const listComments = [
  {
    name: "Vy Nguyen",
    firstName: "Vy",
    lastName: "Nguyen",
    postDate: "26/10/2021",
    postContent: "Hello everyone, nice to meet you all",
  },
  {
    name: "Linh Nguyen",
    firstName: "Linh",
    lastName: "Nguyen",
    postDate: "25/10/2021",
    postContent: "Welcome to our class!",
  },
];

const loading = false;
const ListComments = () => {
  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h6">COMMENTS</Typography>
        {listComments &&
          listComments.map((value, key) => (
            <Card>
              <CardHeader
                avatar={
                  loading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                      {nameToAvatar(value.name)}
                    </Avatar>
                  )
                }
                title={loading ? <Skeleton variant="text" /> : value.name}
                subheader={
                  loading ? <Skeleton variant="text" /> : value.postDate
                }
              />
              <CardContent>
                <Typography variant="body1">
                  {loading ? <Skeleton variant="text" /> : value.postContent}
                </Typography>
              </CardContent>
            </Card>
          ))}
        <Card>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1.5}>
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                  TV
                </Avatar>
              </Grid>
              <Grid item xs={9.5}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  placeholder="Leave a comment"
                ></TextField>
              </Grid>
              <Grid item xs={1}>
                <IconButton>
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
