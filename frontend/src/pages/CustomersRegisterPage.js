import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCustomer, customerHistory } from '../actions/customerActions'; //edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_INFO_REFRESH } from '../constants/customerConstants'; //edited

// Reused code from tutorials - https://github.com/basir/amazona/blob/master/frontend/src/screens/UserListScreen.js, https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function CustomersRegisterPage(props) {//edited
  const userList = useSelector((state) => state.userList); //edited
  const { loading, error, PPTusers } = userList; //edited
  const userDelete = useSelector((state) => state.userDelete); //edited
  const { loading: loadingDelete, error: errorDelete, success: successDelete, } = userDelete; 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerHistory());
    dispatch({
      type: CUSTOMER_INFO_REFRESH, //edited
    });
  }, [dispatch, successDelete]); //edited
  const removeHandler = (customer) => { //edited
    if (window.confirm('Confirm removal of customer?')) { //edited
      dispatch(removeCustomer(customer._id)); //edited
    }
  };
  //Displays Customers registered on PPT web application
  return (
    <div className="pager"> {/*self coded*/}
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMINISTRATOR</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {PPTusers.map((customer) => (  
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.userCredentialsAdministrator ? 'YES' : 'NO'}</td>  {/*edited*/}
                <td>
                  <button type="button" className="small primary" onClick={() => props.history.push(`/customer/${customer._id}/ammend`)}>{/* styling self coded */}
                    Edit
                  </button>
                  <button type="button" className="small primary" onClick={() => removeHandler(customer)}>{/* styling self coded */}
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
