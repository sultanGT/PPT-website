import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; //edited
import { removePurchase, puchasesHistory } from '../actions/purchaseActions';
import { PURCHASE_REMOVE_REFRESH } from '../constants/purchaseConstants'; //edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//https://github.com/basir/amazona/blob/master/frontend/src/screens/OrderHistoryScreen.js
//Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//function to show all purchases that have been made on the web app - only accessable by administrators
export default function PurchasesHistoryPage(props) {
  const displayPurchase = useSelector((state) => state.displayPurchase);//edited
  const { loading, error, ppt_orders } = displayPurchase;//edited
  const purchaseRemove = useSelector((state) => state.purchaseRemove);//edited
  const {loading: loadingRemove,error: errorRemove,success: successRemove,} = purchaseRemove;//edited
  const customerLogin = useSelector((state) => state.customerLogin);//edited
  const { userDetails } = customerLogin;//edited
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PURCHASE_REMOVE_REFRESH });//edited
    dispatch(puchasesHistory( userDetails._id ));//edited
  }, [dispatch, successRemove, userDetails._id]);//edited
  const removeHandler = (customer_purchase) => {//edited
    if (window.confirm('Confirm removal of purchase')) {//edited
      dispatch(removePurchase(customer_purchase._id));//edited
    }
  };

  //
  return (
    <div>
      <h1>Orders</h1>
      {loadingRemove && <LoadingBox></LoadingBox>}
      {errorRemove && <MessageBox variant="danger">{errorRemove}</MessageBox>}
      {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
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
            {ppt_orders.map((customer_purchase) => ( //map purchase infomation from customer purchases in table
              <tr key={customer_purchase._id}>{/*edited*/}
                <td>{customer_purchase._id}</td>{/*edited*/}
                <td>{customer_purchase.pptuser.username}</td>{/*edited*/}
                <td>{customer_purchase.createdAt.substring(0, 10)}</td>{/*edited*/}
                <td>{customer_purchase.total_cost.toFixed(2)}</td>{/*edited*/}
                <td>{customer_purchase.purchase_confirmed ? customer_purchase.purchase_date.substring(0, 10) : 'No'}</td>{/*edited*/}
                <td>{customer_purchase.delivery_confirmed ? customer_purchase.delivery_date.substring(0, 10) : 'No'}{/*edited*/}
                </td>
                <td>
                  <button type="button" className="small primary" onClick={() => { props.history.push(`/customer_purchase/${customer_purchase._id}`);}}>{/*edited*/}
                    Details
                  </button>
                  <button type="button" className="small primary" onClick={() => removeHandler(customer_purchase)}>{/*edited*/}
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
