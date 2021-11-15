import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { getLocalAccessToken } from "../../Utils/localStorageGetSet";
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
        return <Component {...props} />;
      }
    }}
  />
);

export default withRouter(PrivateRoute);
