import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newPurchase } from '../actions/purchaseActions';
import PurchaseProgress from '../components/PurchaseProgress';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.purchase_method) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, customer_order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.items_cost = toPrice(
    cart.shopping_items.reduce((a, c) => a + c.quantity * c.cost, 0)
  );
  cart.delivery_cost = cart.items_cost > 100 ? toPrice(0) : toPrice(10);
  cart.tax_cost = toPrice(0.15 * cart.items_cost);
  cart.total_cost = cart.items_cost + cart.delivery_cost + cart.tax_cost;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(newPurchase({ ...cart, items_order: cart.shopping_items }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/customer_order/${customer_order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, customer_order, props.history, success]);
  return (
    <div className="pager">
      <PurchaseProgress progress_signin progress_shipping progress_place_order></PurchaseProgress>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.delivery_address.fullName} <br />
                  <strong>Address: </strong> {cart.delivery_address.address},
                  {cart.delivery_address.city}, {cart.delivery_address.post_code}
                  ,{cart.delivery_address.county},{cart.delivery_address.contactNumber}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.purchase_method}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.shopping_items.map((item) => (
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
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.items_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.delivery_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.tax_cost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.total_cost.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.shopping_items.length === 0}
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
