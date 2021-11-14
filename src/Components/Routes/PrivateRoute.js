import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getLocalAccessToken } from "../../Utils/localStorageGetSet";

export const PrivateRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={(props) => {
      let isLoggedIn = getLocalAccessToken() ? true : false;
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default PrivateRoute;
