import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayPal } from '../actions/shoppingActions';
import PurchaseProgress from '../components/PurchaseProgress';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { delivery_address } = cart;
  if (!delivery_address.address) {
    props.history.push('/shipping');
  }
  const [purchase_method, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayPal(purchase_method));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <PurchaseProgress progress_signin progress_shipping progress_place_order></PurchaseProgress>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="purchase_method"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="purchase_method"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
