import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  newItem,
  removeItem,
  displayItems,
} from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ITEM_CREATE_REFRESH,
  ITEM_REMOVE_REFRESH,
} from '../constants/productConstants';


//
export default function DisplayItemPage(props) {
  const { page_number = 1 } = useParams();
  const displayProducts = useSelector((state) => state.displayProducts);
  const { loading, error, PPTitems, pptpage, pages } = displayProducts;

  //
  const itemNew = useSelector((state) => state.itemNew);
  const {
    loading: loadingNew,
    error: errorNew,
    success: successNew,
    item: new_item,
  } = itemNew;

  const itemRemove = useSelector((state) => state.itemRemove);
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = itemRemove;

  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successNew) {
      dispatch({ type: ITEM_CREATE_REFRESH });
      props.history.push(`/item/${new_item._id}/ammend`);
    }
    if (successRemove) {
      dispatch({ type: ITEM_REMOVE_REFRESH });
    }
    dispatch(
      displayItems(pptUserDetails._id, page_number)
    );
  }, [
    new_item,
    dispatch,
    props.history,

    successNew,
    successRemove,
    pptUserDetails._id,
    page_number,
  ]);

  const removeHandler = (item) => {
    if (window.confirm('Are you sure you want to remove item?')) {
      dispatch(removeItem(item._id));
    }
  };
  const createHandler = () => {
    dispatch(newItem());
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Item
        </button>
      </div>

      {loadingRemove && <LoadingBox></LoadingBox>}
      {errorRemove && <MessageBox variant="danger">{errorRemove}</MessageBox>}

      {loadingNew && <LoadingBox></LoadingBox>}
      {errorNew && <MessageBox variant="danger">{errorNew}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {PPTitems.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                  <td>{item.item_category}</td>
                  <td>{item.item_brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/item/${item._id}/ammend`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => removeHandler(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === pptpage ? 'active' : ''}
                key={x + 1}
                to={`/productlist/page_number/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
