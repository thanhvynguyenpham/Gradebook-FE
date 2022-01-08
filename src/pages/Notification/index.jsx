import {
  AssignmentTurnedIn,
  AutoAwesomeMotion,
  Chat,
  FactCheck,
} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import { NOTIFICATION_ITEMS_PER_PAGE } from "../../enum";
import { getAuth, postAuth } from "../../Utils/httpHelpers";
const NotificationIcons = {
  finalize: <AssignmentTurnedIn />,
  reply: <Chat color="primary" />,
  decision: <FactCheck />,
  request: <AutoAwesomeMotion />,
};

const Notification = () => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfPage, setNumOfPage] = useState(0);
  const [presentList, setPresentList] = useState([]);

  useEffect(() => {
    const num = Math.ceil(notifications.length / NOTIFICATION_ITEMS_PER_PAGE);
    setNumOfPage(num);
    setPresentList(notifications);
    setPage(1);
    changeList(0);
  }, [notifications]); // eslint-disable-line
  const changeList = (page) => {
    const newList = notifications.slice(
      page * NOTIFICATION_ITEMS_PER_PAGE,
      page * NOTIFICATION_ITEMS_PER_PAGE + NOTIFICATION_ITEMS_PER_PAGE
    );
    setPresentList(newList);
  };
  const onChangePage = (event, value) => {
    setPage(value);
    changeList(value - 1);
  };
  useEffect(() => {
    function fetchNotifications() {
      setNotificationsLoading(true);
      getAuth(`/noti`)
        .then((response) => {
          setNotificationsLoading(false);
          let list = response.data.notis;
          setNotifications(list);
        })
        .catch((error) => {
          setNotificationsLoading(false);
          console.log(error);
        });
    }
    fetchNotifications();
  }, []);
  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case "finalize":
        return `/class/${notification.classId}`;
      case "reply":
        return `/reviews/${notification.requestId}`;
      case "decision":
        return `/reviews/${notification.requestId}`;
      case "request":
        return `/reviews`;
      default:
        return `/`;
    }
  };
  async function handleSeenNoti(value) {
    setToSeen(value._id);
    const link = getNotificationLink(value);
    history.push(link);
  }

  const setToSeen = (id) => {
    postAuth(`/noti/${id}/seen`).catch((error) => {
      console.log(error);
    });
  };
  return (
    <div>
      <Header isAtMainPage={false} />
      <Container>
        <Grid
          container
          spacing={2}
          xs={12}
          justifyContent="center"
          marginTop="30px"
        >
          <Grid item xs={12} sm={10} md={8}>
            <Typography variant="h4">Notifications</Typography>
            <List sx={{ width: "100%", mt: "10px" }}>
              {!notificationsLoading && notifications.length === 0 && (
                <Typography variant="h5" textAlign="center">
                  There is no notification.
                </Typography>
              )}
              {notificationsLoading && (
                <>
                  <ListItem>
                    <Skeleton height="60px" width="100%" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="60px" width="100%" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="60px" width="100%" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="60px" width="100%" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="60px" width="100%" />
                  </ListItem>
                </>
              )}
              {presentList.map((value, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleSeenNoti(value)}
                >
                  <ListItemAvatar>
                    <Avatar>{NotificationIcons[value.type]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <Typography color={"black"}>
                        {value.message}{" "}
                        {!value.seen && (
                          <Chip size="small" label="New" color="success" />
                        )}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          {notifications.length !== 0 && (
            <Grid xs={12} container item justifyContent="center">
              <Grid item>
                <Pagination
                  count={numOfPage}
                  page={page}
                  onChange={onChangePage}
                  color="primary"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Notification;
