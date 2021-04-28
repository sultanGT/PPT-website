import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { delivery_address } = cart;
  if (!userInfo) {
    props.history.push('/login');
  }
  const [fullName, setFullName] = useState(delivery_address.fullName);
  const [address, setAddress] = useState(delivery_address.address);
  const [city, setCity] = useState(delivery_address.city);
  const [postCode, setPostCode] = useState(delivery_address.postCode);
  const [county, setCountry] = useState(delivery_address.county);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postCode, county })
    );
    props.history.push('/placeorder');
  };
  return (
    <div className="pager">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postCode">Post Code</label>
          <input
            type="text"
            id="postCode"
            placeholder="Enter post code"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="county">Country</label>
          <input
            type="text"
            id="county"
            placeholder="Enter county"
            value={county}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
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
