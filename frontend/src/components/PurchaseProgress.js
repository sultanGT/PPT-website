import React from 'react';

// Reused code from Video tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
export default function PurchaseProgress(props) { //resued edited code
  return (
    <div className="row purchase-progress">   {/* reused edited code */}
      <div className={props.progress_signin ? 'active' : ''}>Sign-In</div>  {/* reused edited code */}
      <div className={props.progress_shipping ? 'active' : ''}>Shipping</div>  {/* reused edited code */}
      <div className={props.progress_place_order ? 'active' : ''}>Place Order</div>  {/* reused edited code */}
      <div className={props.progress_payment ? 'active' : ''}>Payment</div>  {/* reused edited code */}
      <div className={props.progress_delivered ? 'active' : ''}>Delivered</div>  {/* reused edited code */}
    </div>
  );
}
