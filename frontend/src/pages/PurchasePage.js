import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { shippingPurchase, purchaseInfo, purchasePayPal } from '../actions/purchaseActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PURCHASE_SHIPPING_REFRESH,
  PURCHASE_PAYPAL_REFRESH,
} from '../constants/purchaseConstants';
import PurchaseProgress from '../components/PurchaseProgress';


export default function PurchasePage(props) {
  const purchaseId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  //
  const purchaseDetails = useSelector((state) => state.purchaseDetails);
  const { customer_order, loading, error } = purchaseDetails;
  //
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;

  //
  const purchasePayment = useSelector((state) => state.purchasePayment);
  const {
    loading: loadingPayment,
    error: errorPayment,
    success: successPayment,
  } = purchasePayment;

  //
  const purchaseShipping = useSelector((state) => state.purchaseShipping);
  const {
    loading: loadingShipping,
    error: errorShipping,
    success: successShipping,
  } = purchaseShipping;

  //
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !customer_order ||
      successPayment ||
      successShipping ||
      (customer_order && customer_order._id !== purchaseId)
    ) {
      dispatch({ type: PURCHASE_PAYPAL_REFRESH });
      dispatch({ type: PURCHASE_SHIPPING_REFRESH });
      dispatch(purchaseInfo(purchaseId));
    } else {
      if (!customer_order.purchase_confirmed) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, purchaseId, sdkReady, successPayment, successShipping, customer_order]);

  //
  const PayPalHandler = (purchase_complete) => {
    dispatch(purchasePayPal(customer_order, purchase_complete));
  };
  const shippingHandler = () => {
    dispatch(shippingPurchase(customer_order._id));
  };

  //

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pager">
      {customer_order.delivery_confirmed ? (
                 <PurchaseProgress progress_signin progress_shipping progress_place_order progress_payment progress_delivered></PurchaseProgress>
                ) : (
                 <PurchaseProgress progress_signin progress_shipping progress_place_order progress_payment></PurchaseProgress>
                )}    

      <h1>Order {customer_order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="container-box container-box-info">
                <h2>Shipping</h2>
                <p>
                <strong>Name:   </strong>{customer_order.delivery_address.fullName} <br />
                  <strong>Address:  </strong>{customer_order.delivery_address.address}<br />
                  <strong>City:   </strong>{customer_order.delivery_address.city}<br />
                  <strong>Post Code:   </strong>{customer_order.delivery_address.post_code}<br />
                  <strong>County:   </strong>{customer_order.delivery_address.county}<br />
                  <strong>Contact Number:   </strong>{customer_order.delivery_address.contactNumber}<br />
                </p>
                {customer_order.delivery_confirmed ? (
                  <MessageBox variant="success">
                    Delivered at {customer_order.delivery_date}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {customer_order.purchase_method}
                </p>
                {customer_order.purchase_confirmed ? (
                  <MessageBox variant="success">
                    Paid at {customer_order.purchase_date}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">
                <h2>Order Items</h2>
                <ul>
                  {customer_order.items_order.map((item) => (
                    <li key={item.item}>
                      <div className="row">
                        <div>
                          <img
                            src={item.picture}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/item/${item.item}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.quantity} x ${item.cost} = ${item.quantity * item.cost}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="container-box container-box-info">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>£{customer_order.items_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>£{customer_order.delivery_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>£{customer_order.total_cost.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!customer_order.purchase_confirmed && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPayment && (
                        <MessageBox variant="danger">{errorPayment}</MessageBox>
                      )}
                      {loadingPayment && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={customer_order.total_cost}
                        onSuccess={PayPalHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {pptUserDetails.userCredentialsAdministrator && customer_order.purchase_confirmed && !customer_order.delivery_confirmed && (
                <li>
                  {loadingShipping && <LoadingBox></LoadingBox>}
                  {errorShipping && (
                    <MessageBox variant="danger">{errorShipping}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={shippingHandler}
                  >
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
