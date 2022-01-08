import { Favorite } from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAuth } from "../../../Utils/httpHelpers";
import "./index.scss";

const DashBoard = ({ classDetails, user, listPosts, hidden, loading }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [studentID, setStudentID] = useState(null);
  useEffect(() => {
    const getStudentID = () => {
      getAuth(`/user/studentid`)
        .then((response) => {
          if (response.status === 200) {
            setStudentID(response.data.studentId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (classDetails.role === "student") {
      getStudentID();
    }
  }, [classDetails._id, classDetails.role]);

  const copyToClipBoard = (value, type) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setMessage("Copied " + type + " to clipboard!");
        setOpenMessage(true);
      })
      .catch(() => {
        setMessage(
          "Cannot copy " + type + ". Please try again or copy manually."
        );
        setOpenMessage(true);
      });
  };
  const copyCodeToClipBoard = () => {
    copyToClipBoard(classDetails.key, "code");
  };
  const copyLinkToClipBoard = () => {
    const link =
      window.location.host +
      `/class/join/${classDetails._id}?cjc=${classDetails.key}`;
    copyToClipBoard(link, "link");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={copyCodeToClipBoard}>Copy code</MenuItem>
      <MenuItem onClick={copyLinkToClipBoard}>Create invite link</MenuItem>
    </Menu>
  );

  const renderClassCodeBar = (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        }
        title="Class code"
      />
      {renderMenu}
      <CardContent>
        <Typography variant="h5" component="div">
          <b>{classDetails.key}</b>
        </Typography>
      </CardContent>
    </Card>
  );
  const renderSkeleton = (
    <Card>
      <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
    </Card>
  );
  const renderStudentIDBar = (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Student ID
        </Typography>
        <br />
        {studentID ? (
          <Typography variant="h5" component="div">
            <b>{studentID}</b>
          </Typography>
        ) : (
          <Typography variant="body1" component="div">
            Please update your student ID in Profile page.
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  // function showAlert(message) {
  //   setMessage(message);
  //   setOpenMessage(true);
  // }
  return (
    <div hidden={hidden}>
      <Container className="dashboard">
        <Grid container spacing={3}>
          <Grid container item>
            <Grid item xs={12}>
              <Card style={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="https://gstatic.com/classroom/themes/img_breakfast.jpg"
                  alt="green iguana"
                />
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  className="title"
                >
                  {classDetails.name}
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={4}>
            <Stack spacing={2} width={"100%"}>
              {loading && renderSkeleton}
              {(classDetails.role === "teacher" ||
                classDetails.role === "owner") &&
                renderClassCodeBar}
              {classDetails.role === "student" && renderStudentIDBar}
              <Card>
                <CardContent>
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    <Typography variant="h6" component="div">
                      Description
                    </Typography>
                  )}
                  <br />
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {classDetails.description}
                    </Typography>
                  )}
                  {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    10:00 PM – Midterm project
                  </Typography> */}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid container item xs={12} sm={8}>
            <Stack width={"100%"} spacing={2}>
              {listPosts &&
                listPosts.map((value, key) => (
                  <Card>
                    <CardHeader
                      avatar={
                        loading ? (
                          <Skeleton variant="circular" width={40} height={40} />
                        ) : (
                          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            {value.firstName.slice(0, 1) +
                              value.lastName.slice(0, 1)}
                          </Avatar>
                        )
                      }
                      action={
                        !loading && (
                          <IconButton aria-label="settings">
                            <MoreVert />
                          </IconButton>
                        )
                      }
                      title={loading ? <Skeleton variant="text" /> : value.name}
                      subheader={
                        loading ? <Skeleton variant="text" /> : value.postDate
                      }
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {loading ? (
                          <Skeleton variant="text" />
                        ) : (
                          value.postContent
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      {!loading && (
                        <IconButton aria-label="add to favorites">
                          <Favorite />
                        </IconButton>
                      )}
                    </CardActions>
                  </Card>
                ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={openMessage}
        autoHideDuration={4000}
        onClose={() => setOpenMessage(false)}
        message={message}
      />
    </div>
  );
};
export default DashBoard;
