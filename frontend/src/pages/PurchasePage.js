import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { shippingPurchase, purchaseInfo, purchasePayPal } from '../actions/purchaseActions';//Reused code edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PURCHASE_SHIPPING_REFRESH, //Reused code edited
  PURCHASE_PAYPAL_REFRESH,//Reused code edited
} from '../constants/purchaseConstants';
import PurchaseProgress from '../components/PurchaseProgress';

//Function Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Variable Declarations
export default function PurchasePage(props) {//Reused code edited
  const purchaseId = props.match.params.id;//Reused code edited
  const [sdkReady, setSdkReady] = useState(false);
  const purchaseDetails = useSelector((state) => state.purchaseDetails);//Reused code edited
  const { customer_order, loading, error } = purchaseDetails;//Reused code edited
  const customerLogin = useSelector((state) => state.customerLogin);//Reused code edited
  const { userDetails } = customerLogin;//Reused code edited
  const purchasePayment = useSelector((state) => state.purchasePayment);//Reused code edited
  const {loading: loadingPayment,error: errorPayment,success: successPayment} = purchasePayment;//Reused code edited
  const purchaseShipping = useSelector((state) => state.purchaseShipping);//Reused code edited
  const {loading: loadingShipping,error: errorShipping,success: successShipping} = purchaseShipping;//Reused code edited
  const dispatch = useDispatch();

  //function for PayPal backend 
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {setSdkReady(true);
      };
      document.body.appendChild(script);
    };
//if payapal transaction is succesfull reload purchase with purchase ID
    if (!customer_order ||successPayment || successShipping || (customer_order && customer_order._id !== purchaseId)
    ) {
      dispatch({ type: PURCHASE_PAYPAL_REFRESH });//Reused code edited
      dispatch({ type: PURCHASE_SHIPPING_REFRESH });//Reused code edited
      dispatch(purchaseInfo(purchaseId));//Reused code edited
    } else {
      if (!customer_order.purchase_confirmed) {//Reused code edited
        if (!window.paypal) {addPayPalScript();
        } else {setSdkReady(true);
        }
      }
    }
  }, [dispatch, purchaseId, sdkReady, successPayment, successShipping, customer_order]);//Reused code edited

  const PayPalHandler = (purchase_complete) => {dispatch(purchasePayPal(customer_order, purchase_complete));//Reused code edited
  };
  const shippingHandler = () => {dispatch(shippingPurchase(customer_order._id));//Reused code edited
  };

  //

  return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
    <div className="pager">
      {customer_order.delivery_confirmed ? ( //selfcoded
                 <PurchaseProgress progress_signin progress_shipping progress_place_order progress_payment progress_delivered></PurchaseProgress>//selfcoded
                ) : (
                 <PurchaseProgress progress_signin progress_shipping progress_place_order progress_payment></PurchaseProgress>//selfcoded
                )}    {/*selfcoded*/}

            <h1>Order {customer_order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
                <div className="container-box container-box-info"> {/* styling self coded */}
                <h2>Shipping</h2>
                <p>
                <strong>Name:   </strong>{customer_order.delivery_address.fullName} <br /> {/*edited*/}
                  <strong>Address:  </strong>{customer_order.delivery_address.address}<br />{/*edited*/}
                  <strong>City:   </strong>{customer_order.delivery_address.city}<br />{/*edited*/}
                  <strong>Post Code:   </strong>{customer_order.delivery_address.post_code}<br />{/*edited*/}
                  <strong>County:   </strong>{customer_order.delivery_address.county}<br />{/*edited*/}
                  <strong>Contact Number:   </strong>{customer_order.delivery_address.contactNumber}<br />  {/*selfcoded*/}
                </p>
                {customer_order.delivery_confirmed ? (<MessageBox variant="success">
                    Delivered at {customer_order.delivery_date}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">{/*styling self coded*/}
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {customer_order.purchase_method}{/*edited*/}
                </p>
                {customer_order.purchase_confirmed ? (<MessageBox variant="success">Paid at {customer_order.purchase_date}</MessageBox>//edited
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">{/*styling self coded*/}
                <h2>Order Items</h2>
                <ul>
                  {customer_order.items_order.map((item) => ( //edited
                    <li key={item.item}>{/*edited*/}
                      <div className="row">
                        <div>
                          <img src={item.picture} alt={item.name} className="small"></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/item/${item.item}`}>{item.name}</Link>{/*edited*/}
                        </div>
                        <div>{item.quantity} x ${item.cost} = ${item.quantity * item.cost}</div>{/*edited*/}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="container-box container-box-info">{/*styling self coded*/}
            <ul>
              <li><h2>Order Summary</h2></li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>£{customer_order.items_cost.toFixed(2)}</div>{/* sedited */}
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>£{customer_order.delivery_cost.toFixed(2)}</div>{/* sedited */}
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>£{customer_order.total_cost.toFixed(2)}</strong>{/* sedited */}
                  </div>
                </div>
              </li>
              {!customer_order.purchase_confirmed && (
                <li>{!sdkReady ? (<LoadingBox></LoadingBox>) : (
                    <>
                      {errorPayment && (
                        <MessageBox variant="danger">{errorPayment}</MessageBox>
                      )}
                      {loadingPayment && <LoadingBox></LoadingBox>}
                      <PayPalButton amount={customer_order.total_cost} onSuccess={PayPalHandler}></PayPalButton>{/* edited */}
                    </>
                  )}
                </li>
              )}
              {userDetails.userCredentialsAdministrator && customer_order.purchase_confirmed && !customer_order.delivery_confirmed && (//edited
                <li>
                  {loadingShipping && <LoadingBox></LoadingBox>}
                  {errorShipping && (
                    <MessageBox variant="danger">{errorShipping}</MessageBox>
                  )}
                  <button type="button" className="primary block" onClick={shippingHandler}>{/*primary styling self edited */}
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
