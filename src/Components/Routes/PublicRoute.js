import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";
export const PublicRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={(props) => {
      let isLoggedIn = Cookies.get("access_token") ? true : false;
      if (isLoggedIn) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default PublicRoute;
