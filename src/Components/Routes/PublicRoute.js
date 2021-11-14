import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getLocalAccessToken } from "../../Utils/localStorageGetSet";
export const PublicRoute = ({ component: Component, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={(props) => {
      let isLoggedIn = getLocalAccessToken() ? true : false;
      if (isLoggedIn) {
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default PublicRoute;
