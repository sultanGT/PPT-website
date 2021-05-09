import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountHistory } from '../actions/purchaseActions'; //Reused edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


//Reused code from tutorials - https://github.com/basir/amazona/blob/master/frontend/src/screens/OrderHistoryScreen.js, https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
export default function CustomerPurchaseHistoryPage(props) {
  const displayPurchaseAccount = useSelector((state) => state.displayPurchaseAccount);//Reused edited
  const { loading, error, ppt_orders } = displayPurchaseAccount;//Reused edited
  const dispatch = useDispatch();
  useEffect(() => { dispatch(accountHistory()); }, [dispatch]);
  return (
    <div>
      <h1>Purchase History</h1>
      {loading ? (<LoadingBox></LoadingBox>) : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : (
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
            {ppt_orders.map((customer_purchase) => (//Reused edited
              <tr key={customer_purchase._id}> {/* reused edited*/}
                <td>{customer_purchase._id}</td>{/* reused edited*/}
                <td>{customer_purchase.createdAt.substring(0, 10)}</td>{/* reused edited*/}
                <td>{customer_purchase.total_cost.toFixed(2)}</td>{/* reused edited*/}
                <td>{customer_purchase.purchase_confirmed ? customer_purchase.purchase_date.substring(0, 10) : 'No'}</td>{/* reused edited*/}
                <td>{customer_purchase.delivery_confirmed ? customer_purchase.delivery_date.substring(0, 10) : 'No'}</td>{/* reused edited*/}
                <td>
                  <button type="button" className="small primary" onClick={() => {  //primary styling selfcoded
                      props.history.push(`/customer_purchase/${customer_purchase._id}`);}}>
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
