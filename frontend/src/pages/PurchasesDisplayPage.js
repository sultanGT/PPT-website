import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePurchase, puchasesHistory } from '../actions/purchaseActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PURCHASE_REMOVE_REFRESH } from '../constants/purchaseConstants';


//
export default function PurchasesDisplayPage(props) {
  //
  const displayPurchase = useSelector((state) => state.displayPurchase);
  const { loading, error, ppt_orders } = displayPurchase;
  const purchaseRemove = useSelector((state) => state.purchaseRemove);
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = purchaseRemove;

  //
  const customerLogin = useSelector((state) => state.customerLogin);
  const { userDetails } = customerLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PURCHASE_REMOVE_REFRESH });
    dispatch(puchasesHistory( userDetails._id ));
  }, [dispatch, successRemove, userDetails._id]);

  //
  const removeHandler = (customer_order) => {
    if (window.confirm('Confirm removal of purchase')) {
      dispatch(removePurchase(customer_order._id));
    }
  };

  //
  return (
    <div>
      <h1>Orders</h1>
      {loadingRemove && <LoadingBox></LoadingBox>}
      {errorRemove && <MessageBox variant="danger">{errorRemove}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {ppt_orders.map((customer_order) => (
              <tr key={customer_order._id}>
                <td>{customer_order._id}</td>
                <td>{customer_order.pptuser.username}</td>
                <td>{customer_order.createdAt.substring(0, 10)}</td>
                <td>{customer_order.total_cost.toFixed(2)}</td>
                <td>{customer_order.purchase_confirmed ? customer_order.purchase_date.substring(0, 10) : 'No'}</td>
                <td>
                  {customer_order.delivery_confirmed
                    ? customer_order.delivery_date.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/customer_order/${customer_order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small primary"
                    onClick={() => removeHandler(customer_order)}
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
