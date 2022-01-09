import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import Accounts from "./Components/Accounts";
import { ListItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import { useHistory } from "react-router-dom";
import { clearLocalStorage } from "Utils/localStorageGetSet";
import { getAuth } from "Utils/httpHelpers";
import { useState } from "react";
import Classes from "pages/Admin/Components/Classes";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent() {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState(0);
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function handleLogout() {
    clearLocalStorage();
    history.push("/login");
  }

  React.useEffect(() => {
    const fetchClassesData = () => {
      setIsLoadingClasses(true);
      getAuth("/admin/classes")
        .then((response) => {
          setClasses(response.data);
          setIsLoadingClasses(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchUsersData = () => {
      setIsLoadingUsers(true);
      getAuth("/admin/users?role=member")
        .then((response) => {
          setUsers(response.data);
          setIsLoadingUsers(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchAdminsData = () => {
      setIsLoadingAdmins(true);
      getAuth("/admin/users?role=admin")
        .then((response) => {
          setAdmins(response.data);
          setIsLoadingAdmins(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUsersData();
    fetchClassesData();
    fetchAdminsData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Tooltip title="Log out">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button onClick={() => setTab(0)}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button onClick={() => setTab(1)}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {tab === 0 ? (
                <Accounts
                  users={users}
                  isLoadingUser={isLoadingUsers}
                  setUsers={setUsers}
                  admins={admins}
                  setAdmins={setAdmins}
                  isLoadingAdmin={isLoadingAdmins}
                />
              ) : (
                <Classes
                  classes={classes}
                  isLoading={isLoadingClasses}
                  setClasses={setClasses}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  return <DashboardContent />;
}
