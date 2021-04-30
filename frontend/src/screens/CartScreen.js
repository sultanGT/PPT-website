import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addShoppingItem, deleteShoppingItem } from '../actions/shopping_actions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const item_id = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { shopping_items, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (item_id) {
      dispatch(addShoppingItem(item_id, quantity));
    }
  }, [dispatch, item_id, quantity]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(deleteShoppingItem(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signup?redirect=shipping');
  };
  return (
    <div className="row top pager">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {shopping_items.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {shopping_items.map((item) => (
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
                    <Link to={`/item/${item.item}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addShoppingItem(item.item, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stock_number).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.cost}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.item)}
                    >
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
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({shopping_items.reduce((a, c) => a + c.quantity, 0)} PPTitems) : $
                {shopping_items.reduce((a, c) => a + c.cost * c.quantity, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={shopping_items.length === 0}
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
