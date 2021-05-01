import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        pptUserDetails && pptUserDetails.userCredentialsAdministrator ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signup" />
        )
      }
    ></Route>
  );
}
