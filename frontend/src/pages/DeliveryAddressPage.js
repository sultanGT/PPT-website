import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryAddress } from '../actions/shoppingActions';
import PurchaseProgress from '../components/PurchaseProgress';


export default function DeliveryAddressPage(props) {
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const shopping = useSelector((state) => state.shopping);
  const { delivery_address } = shopping;
  if (!pptUserDetails) {
    props.history.push('/login');
  }

  //
  const [fullName, setFullName] = useState(delivery_address.fullName);
  const [address, setAddress] = useState(delivery_address.address);
  const [city, setCity] = useState(delivery_address.city);
  const [post_code, setPostCode] = useState(delivery_address.post_code);
  const [county, setCountry] = useState(delivery_address.county);
  const [contactNumber, setContactNumber] = useState(delivery_address.contactNumber);
  const dispatch = useDispatch();


  //
  const submitHandler = (e) => {
    if (contactNumber.length < 11) {
      alert('Contact Number Is Not Valid');
      e.preventDefault();
    } else if (post_code.length < 7) {
      e.preventDefault();
      alert('Post Code Is Not Valid');
    } else {
    e.preventDefault();
    dispatch(
      saveDeliveryAddress({ fullName, address, city, post_code, county, contactNumber })
    );
    props.history.push('/orderpurchase');
  };
}

//
  return (
    <div className="pager">
      <PurchaseProgress progress_signin progress_shipping></PurchaseProgress>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
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
          <label htmlFor="post_code">Post Code</label>
          <input
            type="text"
            id="post_code"
            placeholder="Enter post code"
            value={post_code}
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
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            placeholder="Enter contact number"
            onChange={(e) => setContactNumber(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
