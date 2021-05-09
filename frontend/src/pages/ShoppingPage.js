import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addShoppingItem, deleteShoppingItem } from '../actions/shoppingActions';
import MessageBox from '../components/MessageBox';
//https://github.com/basir/amazona/blob/master/frontend/src/screens/CartScreen.js
//Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Function for disolaying shopping page with items in cart - can also be seen from top navigation bar
export default function ShoppingPage(props) { //edited
  const itemId = props.match.params.id;//edited
  const quantity = props.location.search//edited
    ? Number(props.location.search.split('=')[1])//edited
    : 1;
  const shopping = useSelector((state) => state.shopping);//edited
  const { shoppingItems, error } = shopping;//edited
  const dispatch = useDispatch();
  useEffect(() => {
    if (itemId) {dispatch(addShoppingItem(itemId, quantity));//edited
  }
  }, [dispatch, itemId, quantity]);//edited
  const removeProductHandler = (id) => {//edited
    dispatch(deleteShoppingItem(id));//edited
  };
  const shoppingHandler = () => {props.history.push('/signup?redirect=delivery');//edited
  };

  //Returns shopping page with cart items - can also be seen from top navigation
  return (
    <div className="row top pager">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {shoppingItems.length === 0 ? (<MessageBox>There are currently no items in the cart 
          <Link className='title' to="/">Back to shopping</Link>{/*edited*/}
          </MessageBox>
        ) : (
          <ul>
            {shoppingItems.map((item) => (//edited
              <li key={item.item}>{/*edited*/}
                <div className="row">
                  <div>
                    <img src={item.picture} alt={item.name} className="small" ></img>{/*edited*/}
                  </div>
                  <div className="min-30">
                    <Link to={`/item/${item.item}`}>{item.name}</Link>{/*edited*/}
                  </div>
                  <div>
                    <select value={item.quantity} onChange={(e) =>
                        dispatch( addShoppingItem(item.item, Number(e.target.value)))//edited
                      } >
                      {[...Array(item.stock_number).keys()].map((x) => (//edited
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>£{item.cost}</div>
                  <div>
                    <button type="button" className='primary' onClick={() => removeProductHandler(item.item)}>{/*edited*/}
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="container-box container-box-info"> {/*styling self edited*/}
          <ul>
            <li>
              <h2>
                Subtotal ({shoppingItems.reduce((a, b) => a + b.quantity, 0)} PPTitems) : £
                {shoppingItems.reduce((a, b) => a + b.cost * b.quantity, 0)}
              </h2>
            </li>
            <li>
              <button type="button" onClick={shoppingHandler} className="primary block" disabled={shoppingItems.length === 0}//edited
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
