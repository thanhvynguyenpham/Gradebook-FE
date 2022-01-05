import { ThemeProvider } from "@mui/material";
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./Components/Routes/PrivateRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ChangePassword from "./pages/Auth/ChangePassword";
import theme from "./theme";
import ClassPage from "./pages/ClassPage";
import { ProfilePage } from "./pages/Profile";
import { JoinClassPage } from "./pages/JoinClassPage";
import NotFoundPage from "./pages/PageNotFound/PageNotFound";
import AdminDashboard from "./pages/Admin";
import GradeReviews from "./pages/GradeReviews";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import RequestDetail from "./pages/GradeReviews/RequestDetail";
import { ForgotPassword } from "./pages/Auth/Components/Forms/ForgotPassword";
import Notification from "./pages/Notification";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/admin" component={AdminDashboard} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={SignUp} />
          <PublicRoute
            exact
            path="/forgot-password"
            component={ChangePassword}
          />
          <PublicRoute exact path="/verify-email" component={ConfirmEmail} />
          <PublicRoute
            exact
            path="/changepassword"
            component={ForgotPassword}
          />
          <PrivateRoute exact path="/class/:id" component={ClassPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute path="/class/join/:id" component={JoinClassPage} />
          <PrivateRoute exact path="/reviews" component={GradeReviews} />
          <PrivateRoute exact path="/reviews/:id" component={RequestDetail} />
          <PrivateRoute exact path="/notification" component={Notification} />
          <Route path="/404/:message" component={NotFoundPage} />
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
