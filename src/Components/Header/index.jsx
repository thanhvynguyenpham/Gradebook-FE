import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Add,
  AddCircleOutlined,
  AssignmentTurnedIn,
  AutoAwesomeMotion,
  Chat,
  FactCheck,
  Input,
  Logout,
  Notifications,
  Person,
  ViewList,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useHistory } from "react-router";
import {
  clearLocalStorage,
  getLocalUser,
} from "../../Utils/localStorageGetSet";
import { Link } from "react-router-dom";
import { nameToAvatar } from "../../Utils/converters";
import { getAuth } from "../../Utils/httpHelpers";

const NotificationIcons = {
  finalize: <AssignmentTurnedIn />,
  reply: <Chat />,
  decision: <FactCheck />,
  request: <AutoAwesomeMotion />,
};

export default function Header({ onCreateClass, onJoinClass, isAtMainPage }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);
  const [notificationsLoading, setNotificationsLoading] = React.useState(false);
  const user = getLocalUser();
  const openProfileMenu = Boolean(anchorElProfile);

  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const openNotificationMenu = Boolean(anchorElNotification);
  const handleClickNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  React.useEffect(() => {
    if (openNotificationMenu) {
      fetchNotifications();
    }
  }, [openNotificationMenu]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleAddMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCreateClass = () => {
    handleMenuClose();
    onCreateClass();
  };

  const handleJoinClass = () => {
    handleMenuClose();
    onJoinClass();
  };

  function handleLogout() {
    clearLocalStorage();
    history.push("/login");
  }

  function handleProfileClick() {
    history.push("/profile");
  }

  function handleGradeReviewClick() {
    history.push("/reviews");
  }

  function fetchNotifications() {
    setNotificationsLoading(true);
    getAuth(`/noti?limit=5`)
      .then((response) => {
        setNotificationsLoading(false);
        setNotifications(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setNotificationsLoading(false);
        console.log(error);
      });
  }

  const menuId = "primary-search-account-menu";
  const renderAddMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleCreateClass}>
        <ListItemIcon>
          <AddCircleOutlined fontSize="small" />
        </ListItemIcon>
        Create new class
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleJoinClass}>
        <ListItemIcon>
          <Input fontSize="small" />
        </ListItemIcon>
        Join a class
      </MenuItem>
    </Menu>
  );
  const renderProfileMenu = (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorEl={anchorElProfile}
      open={openProfileMenu}
      onClose={handleCloseProfile}
      onClick={handleCloseProfile}
    >
      <MenuItem onClick={handleProfileClick}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleGradeReviewClick}>
        <ListItemIcon>
          <ViewList fontSize="small" />
        </ListItemIcon>
        Grade Reviews List
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
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

  const renderNotificationMenu = (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorEl={anchorElNotification}
      open={openNotificationMenu}
      onClose={handleCloseNotification}
      onClick={handleCloseNotification}
    >
      {notificationsLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress
            color="primary"
            sx={{ width: "20px !important", height: "20px !important" }}
          ></CircularProgress>
        </div>
      )}
      {!notificationsLoading && notifications.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Typography variant="body1">There is no notification.</Typography>
        </div>
      )}
      <List sx={{ width: { xs: 250, md: 300 } }}>
        {notifications.map((value, index) => (
          <Link to={() => getNotificationLink(value)}>
            <ListItem button key={index}>
              <ListItemAvatar>
                <Avatar>{NotificationIcons[value.type]}</Avatar>
              </ListItemAvatar>
              <ListItemText secondary={value.message} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Link to="/notification">
        <div style={{ textAlign: "center", color: "black", fontSize: "14px" }}>
          View all
        </div>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <div>
        {isAtMainPage && (
          <div>
            <MenuItem onClick={handleCreateClass}>
              <ListItemIcon>
                <AddCircleOutlined />
              </ListItemIcon>
              Create new class
            </MenuItem>
            <MenuItem onClick={handleJoinClass}>
              <ListItemIcon>
                <Input />
              </ListItemIcon>
              Join a class
            </MenuItem>
            <Divider />
          </div>
        )}
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleGradeReviewClick}>
          <ListItemIcon>
            <ViewList fontSize="small" />
          </ListItemIcon>
          Grade Reviews List
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </div>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Gradebook
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAtMainPage && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleAddMenuOpen}
                color="inherit"
              >
                <Add />
              </IconButton>
            )}
            <IconButton
              onClick={handleClickNotification}
              size="large"
              aria-label="Notifications"
              color="inherit"
            >
              <Notifications />
            </IconButton>
            <IconButton
              onClick={handleClickProfile}
              size="large"
              aria-label="Account"
              color="inherit"
            >
              <Avatar aria-label="avatar">
                {user && nameToAvatar(user.name)}
              </Avatar>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              onClick={handleClickNotification}
              size="large"
              aria-label="Notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderNotificationMenu}
      {renderAddMenu}
      {renderMobileMenu}
    </Box>
  );
}
