import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveDeliveryAddress } from '../actions/shoppingActions'; //reused edited
import PurchaseProgress from '../components/PurchaseProgress'; //reused edited



// https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
export default function DeliveryAddressPage(props) { //reused edited
  const customerLogin = useSelector((state) => state.customerLogin);//reused edited
  const { userDetails } = customerLogin;//reused edited
  const shopping = useSelector((state) => state.shopping);//reused edited
  const { delivery_address } = shopping;//reused edited
  if (!userDetails) {//reused edited
    props.history.push('/login');//reused edited
  }

  //
  const [fullName, setFullName] = useState(delivery_address.fullName);//edited
  const [address, setAddress] = useState(delivery_address.address);//edited
  const [city, setCity] = useState(delivery_address.city); //edited
  const [post_code, setPostCode] = useState(delivery_address.post_code);
  const [county, setCountry] = useState(delivery_address.county); //self coded
  const [contactNumber, setContactNumber] = useState(delivery_address.contactNumber); //self coded
  const dispatch = useDispatch();


  //
  const submitHandler = (e) => {
    if (contactNumber.length < 11) { //selfcoded
      alert('Contact Number Is Not Valid'); //selfcoded
      e.preventDefault();
    } else if (post_code.length < 7) { //self coded
      e.preventDefault();
      alert('Post Code Is Not Valid'); //self coded
    } else {
    e.preventDefault();
    dispatch(
      saveDeliveryAddress({ fullName, address, city, post_code, //reused edited
        county, contactNumber }) //county and contactNumber self coded
    );
    props.history.push('/orderpurchase'); //edited
  };
}

//
  return (
    <div className="pager"> {/* selfcoded */}
      <PurchaseProgress progress_signin progress_shipping></PurchaseProgress> {/* reused edited */}
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
          <label htmlFor="county">Country</label> {/* selfcoded */}
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
          <label htmlFor="contactNumber">Contact Number</label> {/* selfcoded */}
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
