import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomer } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_REFRESH } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const customerId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userCredentialsAdministrator, setIsAdmin] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, pptuser } = userInfo;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_AMMEND_REFRESH });
      props.history.push('/userlist');
    }
    if (!pptuser) {
      dispatch(customerInfo(customerId));
    } else {
      setName(pptuser.name);
      setEmail(pptuser.email);
      setIsAdmin(pptuser.userCredentialsAdministrator);
    }
  }, [dispatch, props.history, successUpdate, pptuser, customerId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(ammendCustomer({ _id: customerId, name, email, userCredentialsAdministrator }));
  };
  return (
    <div className="pager">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
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
              <label htmlFor="userCredentialsAdministrator">Is Admin</label>
              <input
                id="userCredentialsAdministrator"
                type="checkbox"
                checked={userCredentialsAdministrator}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
