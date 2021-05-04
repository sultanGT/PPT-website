import React, { useEffect } from './react';
import { useDispatch, useSelector } from './react-redux';
import { accountHistory } from '../actions/purchaseActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


//
export default function PurchaseHistoryPage(props) {
  
  const displayPurchaseAccount = useSelector((state) => state.displayPurchaseAccount);
  const { loading, error, ppt_orders } = displayPurchaseAccount;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountHistory());
  }, [dispatch]);
  return (
    <div>
      <h1>Purchase History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
