import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = localStorage.getItem("user");
  let isAdmin = false;
  if (
    user &&
    JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_ADMIN")
  ) {
    isAdmin = true;
  }
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
