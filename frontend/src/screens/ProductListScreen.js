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

export default function ProductListScreen(props) {
  const { page_number = 1 } = useParams();
  const displayProducts = useSelector((state) => state.displayProducts);
  const { loading, error, PPTitems, pptpage, pages } = displayProducts;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    item: new_item,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ITEM_CREATE_REFRESH });
      props.history.push(`/item/${new_item._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: ITEM_REMOVE_REFRESH });
    }
    dispatch(
      displayItems(pptUserDetails._id, page_number)
    );
  }, [
    new_item,
    dispatch,
    props.history,

    successCreate,
    successDelete,
    pptUserDetails._id,
    page_number,
  ]);

  const deleteHandler = (item) => {
    if (window.confirm('Are you sure you want to delete?')) {
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

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                        props.history.push(`/item/${item._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(item)}
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
