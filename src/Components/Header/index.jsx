import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Add, Login, BorderColor } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Header({ onCreateClass }) {
  const [cookies, setCookie] = useCookies(["access_token", "refresh_token"]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(
    cookies.access_token ? true : false
  );

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
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
      <MenuItem onClick={handleCreateClass}>Create new class</MenuItem>
      <MenuItem onClick={handleMenuClose}>Join a class</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
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
      {loggedIn ? (
        <div>
          <MenuItem>
            <IconButton size="large" aria-label="Profile" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={handleAddMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Add />
            </IconButton>
            <p>Add</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <IconButton size="large" aria-label="Login" color="inherit">
              <Login />
            </IconButton>
            <p>Login</p>
          </MenuItem>
          <MenuItem onClick={handleAddMenuOpen}>
            <IconButton
              size="large"
              aria-label="register"
              aria-haspopup="true"
              color="inherit"
            >
              <BorderColor />
            </IconButton>
            <p>Register</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  const LoggedInButtons = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
      <IconButton size="large" aria-label="Account" color="inherit">
        <AccountCircle />
      </IconButton>
    </Box>
  );
  const NotLoggedInButtons = (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Link to="/login">
        <Button style={{ color: "white" }}>Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="contained" color="secondary">
          Register
        </Button>
      </Link>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Gradebook
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {loggedIn ? LoggedInButtons : NotLoggedInButtons}

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
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
