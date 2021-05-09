import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

//https://github.com/basir/amazona/blob/master/frontend/src/components/AdminRoute.js
// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
// Admin router to authorise user accounts to use admin specific functions - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export default function AdminRoute({ component: Component, ...rest }) {// Reused, edited
  const customerLogin = useSelector((state) => state.customerLogin); // Reused, edited
  const { userDetails } = customerLogin;// Reused, edited
  return (
    <Route
      {...rest}
      render={(props) =>
        // checks if user is an administrator
        userDetails && userDetails.userCredentialsAdministrator ? (// Reused, edited
          <Component {...props}></Component>) : (<Redirect to="/signup" />// Reused, edited
)
}
    ></Route>
  );
}
