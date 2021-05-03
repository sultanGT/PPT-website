import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomerAccount } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_PROFILE_REFRESH } from '../constants/userConstants';

export default function MyAccountPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

//
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, pptuser } = userInfo;
  const userAmmendAccount = useSelector((state) => state.userAmmendAccount);
  const {
    success: successUpdate,
    error: errorAmmend,
    loading: loadingAmmend,
  } = userAmmendAccount;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!pptuser) {
      dispatch({ type: CUSTOMER_AMMEND_PROFILE_REFRESH });
      dispatch(customerInfo(pptUserDetails._id));
    } else {
      setName(pptuser.name);
      setEmail(pptuser.email);
    }
  }, [dispatch, pptUserDetails._id, pptuser]);
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !==  confirmPassword) {
      e.preventDefault();
      alert('Password and confirm password are not matching');
    } 
      else if (password.toLowerCase() !== password) {
      e.preventDefault();
      alert('Password must contain a lower case character');
    }
      else if (/[!@?£$%^&*]/g.test(password)) {
        e.preventDefault();
        alert('Password must contain a special character case character e.g., @!?$.../');
    } 
      else if (password.length >= 6) {
        e.preventDefault();
        alert('Password must contain more than 6 characters');
    } 
      else if (password.toUpperCase() !== password) {
        e.preventDefault();
        alert('Password must contain an upper case character');
    }
      else if (/\d/.test(password)) {
        e.preventDefault();
        alert('Password must contain a number');
    } else {
      dispatch(
        ammendCustomerAccount({
          customerId: pptuser._id,
          name,
          email,
          password,
     
        })
      );
    }
  };

  return (
    <div className='pager'>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingAmmend && <LoadingBox></LoadingBox>}
            {errorAmmend && (
              <MessageBox variant="danger">{errorAmmend}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

                <div>

              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
