import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        
          console.log("ProtectedRoute", isAuth);
        

        if (isAuth === true) {
          return <Component {...props}></Component>;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};
