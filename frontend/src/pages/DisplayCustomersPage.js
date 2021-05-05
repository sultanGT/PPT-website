import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCustomer, customerHistory } from '../actions/customerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CUSTOMER_INFO_REFRESH } from '../constants/customerConstants';

//
export default function DisplayCustomersPage(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, pptusers } = userList;

  //
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerHistory());
    dispatch({
      type: CUSTOMER_INFO_REFRESH,
    });
  }, [dispatch, successDelete]);
  const removeHandler = (pptuser) => {
    if (window.confirm('Are you sure?')) {
      dispatch(removeCustomer(pptuser._id));
    }
  };

//
  return (
    <div className="pager">
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
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {pptusers.map((pptuser) => (
              <tr key={pptuser._id}>
                <td>{pptuser._id}</td>
                <td>{pptuser.name}</td>
                <td>{pptuser.email}</td>
                <td>{pptuser.userCredentialsAdministrator ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/pptuser/${pptuser._id}/ammend`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => removeHandler(pptuser)}
                  >
                    Delete
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