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
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./index.scss";

const DashBoard = ({ classDetails, user, listPosts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(classDetails.key)
      .then(() => {
        setMessage("Copied code to clipboard!");
        setOpenMessage(true);
      })
      .catch(() => {
        setMessage("Cannot copy code. Please try again or copy manually.");
        setOpenMessage(true);
      });
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
      <MenuItem onClick={copyToClipBoard}>Copy code</MenuItem>
      <MenuItem onClick={handleMenuClose}>Create invite link</MenuItem>
    </Menu>
  );
  return (
    <div>
      <Container>
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
              {classDetails.role === "teacher" ? (
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={handleMenuOpen}
                      >
                        <MoreVert />
                      </IconButton>
                    }
                    title="Class code"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      <b>{classDetails.key}</b>
                    </Typography>
                  </CardContent>
                  {renderMenu}
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Student ID
                    </Typography>
                    <br />
                    <Typography variant="h5" component="div">
                      <b>12345678</b>
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
                </Card>
              )}
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Description
                  </Typography>
                  <br />
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {classDetails.description}
                  </Typography>
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
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                          {value.firstName.slice(0, 1) +
                            value.lastName.slice(0, 1)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVert />
                        </IconButton>
                      }
                      title={value.name}
                      subheader={value.postDate}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {value.postContent}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <Favorite />
                      </IconButton>
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
