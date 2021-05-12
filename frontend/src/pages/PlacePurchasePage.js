import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newPurchase } from '../actions/purchaseActions';//edited
import PurchaseProgress from '../components/PurchaseProgress';//edited
import { PURCHASE_NEW_REFRESH } from '../constants/purchaseConstants'; //edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

//https://github.com/basir/amazona/blob/master/frontend/src/screens/PlaceOrderScreen.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
export default function PlacePurchasePage(props) {

  const shopping = useSelector((state) => state.shopping);
  if (!shopping.purchase_method) {//edited
    props.history.push('/payment');}
  const newCustomerPurchase = useSelector((state) => state.newCustomerPurchase);//edited
  const { loading, success, error, customer_purchase } = newCustomerPurchase;//edited
  const decimalCost = (num) => Number(num.toFixed(2));
  shopping.items_cost = decimalCost(//edited
  shopping.shoppingItems.reduce((a, c) => a + c.quantity * c.cost, 0));//edited
  shopping.delivery_cost = shopping.items_cost > 100 ? decimalCost(0) : decimalCost(10);//edited
  shopping.total_cost = shopping.items_cost + shopping.delivery_cost;//edited
  const dispatch = useDispatch();

  const placePurchaseHandler = () => {
    dispatch(newPurchase({ ...shopping, pptpurchase: shopping.shoppingItems }));//edited
  };
  useEffect(() => {
    if (success) {  props.history.push(`/customer_purchase/${customer_purchase._id}`);//edited
      dispatch({ type: PURCHASE_NEW_REFRESH });//edited
}
  }, [dispatch, customer_purchase, props.history, success]);

  //
  return (
    <div className="pager">
      <PurchaseProgress progress_signin progress_shipping progress_place_order></PurchaseProgress> {/* edited*/}
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="container-box container-box-info"> {/*Styling self coded */}
                <h2>Shipping</h2>
                <p>
                  <strong>Name:   </strong>{shopping.delivery_address.fullName} <br /> {/* edited*/}
                  <strong>Address:  </strong>{shopping.delivery_address.address}<br /> {/* edited*/}
                  <strong>City:   </strong>{shopping.delivery_address.city}<br /> {/* edited*/}
                  <strong>Post Code:   </strong>{shopping.delivery_address.post_code}<br /> {/* edited*/}
                  <strong>County:   </strong>{shopping.delivery_address.county}<br /> {/* edited*/}
                  <strong>Contact Number:   </strong>{shopping.delivery_address.contactNumber}<br /> {/* self coded*/}
                </p>
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">{/*Styling self coded */}
                <h2>Payment</h2>
                <p>{shopping.purchase_method}</p>{/* edited*/}
              </div>
            </li>
            <li>
              <div className="container-box container-box-info">{/*Styling self coded */}
                <h2>Order Items</h2>
                <ul>
                  {shopping.shoppingItems.map((item) => (//edited
                    <li key={item.item}>{/* edited*/}
                      <div className="row">
                        <div>
                          <img src={item.picture} alt={item.name} className="small" ></img>{/* edited*/}
                        </div>
                        <div className="min-30">
                          <Link to={`/item/${item.item}`}>  {item.name} </Link>{/* edited*/}
                        </div>
                        <div>
                          {item.quantity} x £{item.cost} = £{item.quantity * item.cost}{/* edited*/}
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
          <div className="container-box container-box-info">{/*Styling self coded */}
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row"><div>Items</div><div>£{shopping.items_cost.toFixed(2)}</div>{/* edited*/}
                </div>
              </li>
              <li>
                <div className="row"><div>Shipping</div><div>£{shopping.delivery_cost.toFixed(2)}</div>{/* edited*/}
                </div>
              </li>
              <li>
                <div className="row">
                  <div><strong> Order Total</strong></div><div><strong>£{shopping.total_cost.toFixed(2)}</strong>{/* edited*/}</div>
                </div>
              </li>
              <li>
                <button type="button" onClick={placePurchaseHandler}  className="primary block"disabled={shopping.shoppingItems.length === 0}>{/* edited*/}
                  Place Order
                </button> {/*Styling self coded */}
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
