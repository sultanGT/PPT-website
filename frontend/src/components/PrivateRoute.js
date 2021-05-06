import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// Reused code from Video tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
export default function PrivateRoute({ component: Component, ...rest }) {
  const customerLogin = useSelector((state) => state.customerLogin); //reused edited code
  const { userDetails } = customerLogin; //reused edited code
  return (
    <Route
      {...rest}
      render={(props) =>
        userDetails ? ( //reused edited code
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login" /> //reused edited code
        )
      }
    ></Route>
  );
}
