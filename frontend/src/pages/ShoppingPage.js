import React, { useEffect } from './react';
import { useDispatch, useSelector } from './react-redux';
import { Link } from './react-router-dom';
import { addShoppingItem, deleteShoppingItem } from '../actions/shoppingActions';
import MessageBox from '../components/MessageBox';

//
export default function ShoppingPage(props) {
  const itemId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    //
  const shopping = useSelector((state) => state.shopping);
  const { shoppingItems, error } = shopping;
  const dispatch = useDispatch();

  useEffect(() => {
    if (itemId) {
      dispatch(addShoppingItem(itemId, quantity));
    }
  }, [dispatch, itemId, quantity]);

  //
  const removeProductHandler = (id) => {
    dispatch(deleteShoppingItem(id));
  };

  //
  const shoppingHandler = () => {
    props.history.push('/signup?redirect=delivery');
  };


  return (
    <div className="row top pager">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {shoppingItems.length === 0 ? (
          <MessageBox>
            There are currently no items in the cart <Link className='title' to="/">Back to shopping</Link>
          </MessageBox>
        ) : (

          //
          <ul>
            {shoppingItems.map((item) => (
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
                  <div>£{item.cost}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeProductHandler(item.item)}
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
      {/* //wdadadasd */}
      <div className="col-1">
        <div className="container-box container-box-info">
          <ul>
            <li>
              <h2>
                Subtotal ({shoppingItems.reduce((a, b) => a + b.quantity, 0)} PPTitems) : £
                {shoppingItems.reduce((a, b) => a + b.cost * b.quantity, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={shoppingHandler}
                className="primary block"
                disabled={shoppingItems.length === 0}
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
