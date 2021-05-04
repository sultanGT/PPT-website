import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newPurchase } from '../actions/purchaseActions';
import PurchaseProgress from '../components/PurchaseProgress';
import { PURCHASE_NEW_REFRESH } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


//
export default function OrderPurchasePage(props) {

  const shopping = useSelector((state) => state.shopping);
  if (!shopping.purchase_method) {
    props.history.push('/payment');
  }

  //
  const newCustomerPurchase = useSelector((state) => state.newCustomerPurchase);
  const { loading, success, error, customer_order } = newCustomerPurchase;

  //
  const decimalCost = (num) => Number(num.toFixed(2));

  //
  shopping.items_cost = decimalCost(
    shopping.shoppingItems.reduce((a, c) => a + c.quantity * c.cost, 0)
  );

  //
  shopping.delivery_cost = shopping.items_cost > 100 ? decimalCost(0) : decimalCost(10);
  shopping.total_cost = shopping.items_cost + shopping.delivery_cost;
  const dispatch = useDispatch();

  //
  const placePurchaseHandler = () => {
    dispatch(newPurchase({ ...shopping, items_order: shopping.shoppingItems }));
  };

  //
  useEffect(() => {
    if (success) {
      props.history.push(`/customer_order/${customer_order._id}`);
      dispatch({ type: PURCHASE_NEW_REFRESH });
    }
  }, [dispatch, customer_order, props.history, success]);

  //
  return (
    <div className="pager">
      <PurchaseProgress progress_signin progress_shipping progress_place_order></PurchaseProgress>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="container-box container-box-info">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:   </strong>{shopping.delivery_address.fullName} <br />
                  <strong>Address:  </strong>{shopping.delivery_address.address}<br />
                  <strong>City:   </strong>{shopping.delivery_address.city}<br />
                  <strong>Post Code:   </strong>{shopping.delivery_address.post_code}<br />
                  <strong>County:   </strong>{shopping.delivery_address.county}<br />
                  <strong>Contact Number:   </strong>{shopping.delivery_address.contactNumber}<br />
                </p>
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">
                <h2>Payment</h2>
                <p>
                {shopping.purchase_method}
                </p>
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">
                <h2>Order Items</h2>
                <ul>
                  {shopping.shoppingItems.map((item) => (
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
                          {item.quantity} x £{item.cost} = £{item.quantity * item.cost}
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
                  <div>£{shopping.items_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>£{shopping.delivery_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>£{shopping.total_cost.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placePurchaseHandler}
                  className="primary block"
                  disabled={shopping.shoppingItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
