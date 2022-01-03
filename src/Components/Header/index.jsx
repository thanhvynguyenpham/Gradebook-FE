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
  Input,
  Logout,
  Person,
  ViewList,
} from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon } from "@mui/material";
import { useHistory } from "react-router";
import {
  clearLocalStorage,
  getLocalUser,
} from "../../Utils/localStorageGetSet";
import { Link } from "react-router-dom";
import { nameToAvatar } from "../../Utils/converters";

export default function Header({ onCreateClass, onJoinClass, isAtMainPage }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const user = getLocalUser();
  const openProfileMenu = Boolean(anchorElProfile);
  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

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
              onClick={handleClickProfile}
              size="large"
              aria-label="Account"
              color="inherit"
            >
              <Avatar aria-label="recipe">
                {user && nameToAvatar(user.name)}
              </Avatar>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
      {renderAddMenu}
      {renderMobileMenu}
    </Box>
  );
}
