import React from 'react';

//
export default function PurchaseProgress(props) {
  return (
    <div className="row purchase-progress">
      <div className={props.progress_signin ? 'active' : ''}>Sign-In</div>
      <div className={props.progress_shipping ? 'active' : ''}>Shipping</div>
      <div className={props.progress_place_order ? 'active' : ''}>Place Order</div>
      <div className={props.progress_payment ? 'active' : ''}>Payment</div>
      <div className={props.progress_delivered ? 'active' : ''}>Delivered</div>
    </div>
  );
}
