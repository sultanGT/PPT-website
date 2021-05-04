import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerInfo, ammendCustomer } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_AMMEND_REFRESH } from '../constants/userConstants';

export default function CustomerAmmendPage(props) {
  const customerId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userCredentialsAdministrator, setCredentialsAdministrator] = useState(false);

  const userInfo = useSelector((state) => state.userInfo);
  const { loading, error, pptuser } = userInfo;

  //
  const userAmmend = useSelector((state) => state.userAmmend);
  const {
    loading: loadingAmmend,
    error: errorAmmend,
    success: successAmmend,
  } = userAmmend;


  //
  const dispatch = useDispatch();
  useEffect(() => {
    if (successAmmend) {
      dispatch({ type: CUSTOMER_AMMEND_REFRESH });
      props.history.push('/userlist');
    }
    if (!pptuser) {
      dispatch(customerInfo(customerId));
    } else {
      setName(pptuser.name);
      setEmail(pptuser.email);
      setCredentialsAdministrator(pptuser.userCredentialsAdministrator);
    }
  }, [dispatch, props.history, successAmmend, pptuser, customerId]);


  //
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ammendCustomer({ _id: customerId, name, email, userCredentialsAdministrator }));
  };

  //
  return (
    <div className="pager">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingAmmend && <LoadingBox></LoadingBox>}
          {errorAmmend && (
            <MessageBox variant="danger">{errorAmmend}</MessageBox>
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
                onChange={(e) => setCredentialsAdministrator(e.target.checked)}
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
