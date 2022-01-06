import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import AdminDashboard from "../../pages/Admin";
import {
  getLocalAccessToken,
  getLocalUser,
} from "../../Utils/localStorageGetSet";
const PrivateRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={(props) => {
      let isLoggedIn = getLocalAccessToken() ? true : false;
      if (!isLoggedIn) {
        sessionStorage.setItem("lastLocation", JSON.stringify(props.location));
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } else {
        const user = getLocalUser();
        if (user.role === "admin") {
          if (props.location.pathname === "/") {
            return <AdminDashboard />;
          } else {
            return <Redirect to="/" />;
          }
        }
        return <Component {...props} />;
      }
    }}
  />
);

export default withRouter(PrivateRoute);
