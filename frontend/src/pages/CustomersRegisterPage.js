import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCustomer, customerHistory } from '../actions/customerActions'; //edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_INFO_REFRESH } from '../constants/customerConstants'; //edited

// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function CustomersRegisterPage(props) {//edited
  const userList = useSelector((state) => state.userList); //edited
  const { loading, error, pptusers } = userList; //edited
  const userDelete = useSelector((state) => state.userDelete); //edited
  const { loading: loadingDelete, error: errorDelete, success: successDelete, } = userDelete; 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerHistory());
    dispatch({
      type: CUSTOMER_INFO_REFRESH, //edited
    });
  }, [dispatch, successDelete]); //edited
  const removeHandler = (pptuser) => { //edited
    if (window.confirm('Confirm removal of customer?')) { //edited
      dispatch(removeCustomer(pptuser._id)); //edited
    }
  };
  //Displays Customers registered on PPT web application https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
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
            {pptusers.map((pptuser) => (  //edited
              <tr key={pptuser._id}>  
                <td>{pptuser._id}</td>
                <td>{pptuser.name}</td>
                <td>{pptuser.email}</td>
                <td>{pptuser.userCredentialsAdministrator ? 'YES' : 'NO'}</td>  {/*edited*/}
                <td>
                  <button
                    type="button"
                    className="small primary" //styling self coded
                    onClick={() => props.history.push(`/pptuser/${pptuser._id}/ammend`)} //edited
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small primary" // styling self voded
                    onClick={() => removeHandler(pptuser)}
                  >
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
