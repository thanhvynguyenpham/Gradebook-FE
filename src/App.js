import { ThemeProvider } from "@mui/material";
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import theme from "./theme";
import ClassPage from "./pages/ClassPage";
import { ProfilePage } from "./pages/Profile";
import { JoinClassPage } from "./pages/JoinClassPage";
import NotFoundPage from "./pages/PageNotFound/PageNotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={SignUp} />
          <PrivateRoute exact path="/class/:id" component={ClassPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute path="/class/join/:id" component={JoinClassPage} />
          <Route path="/404/:message" component={NotFoundPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
