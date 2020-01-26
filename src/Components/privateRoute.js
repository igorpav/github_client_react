import {Redirect, Route} from "react-router";
import React from "react";

const PrivateRoute = ({children, token, ...rest}) => (
  <Route
    {...rest}
    render={({location}) =>
      token ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: location}
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
