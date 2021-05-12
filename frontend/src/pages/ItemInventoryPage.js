import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { newItem,removeItem,displayItems,// Reused edited
} from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {ITEM_CREATE_REFRESH, ITEM_REMOVE_REFRESH,} from '../constants/itemConstants';
//https://github.com/basir/amazona/blob/master/frontend/src/screens/ProductListScreen.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
export default function ItemInventoryPage(props) {
  const { page_number = 1 } = useParams();// Reused edited
  const displayProducts = useSelector((state) => state.displayProducts);// Reused edited
  const { loading, error, PPTitems, page, pages } = displayProducts;// Reused edited
  const itemNew = useSelector((state) => state.itemNew);// Reused edited
  const {loading: loadingNew,error: errorNew,success: successNew, item: new_item,} = itemNew;// Reused edited
  const itemRemove = useSelector((state) => state.itemRemove);// Reused edited
  const {loading: loadingDelete,error: errorRemove,success: successRemove,} = itemRemove;// Reused edited
  const customerLogin = useSelector((state) => state.customerLogin);// Reused edited
  const { userDetails } = customerLogin;// Reused edited
  const dispatch = useDispatch();
  useEffect(() => {
    if (successNew) {
      dispatch({ type: ITEM_CREATE_REFRESH });// Reused edited
      props.history.push(`/item/${new_item._id}/ammend`);// Reused edited
    }
    if (successRemove) {
      dispatch({ type: ITEM_REMOVE_REFRESH });// Reused edited
    }
    dispatch(
      displayItems({ page_number })
    );
  }, [
    new_item,dispatch,props.history,successNew,successRemove,userDetails._id,page_number,// Reused edited
  ]);

  const removeHandler = (item) => {
    if (window.confirm('Are you sure you want to remove item?')) {// Reused edited
      dispatch(removeItem(item._id));// Reused edited
    }
  };
  const newHandler = () => {
    dispatch(newItem());
  };
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={newHandler}>
          Create Item
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorRemove && <MessageBox variant="danger">{errorRemove}</MessageBox>}
      {loadingNew && <LoadingBox></LoadingBox>}
      {errorNew && <MessageBox variant="danger">{errorNew}</MessageBox>}
      {loading ? ( <LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (<>
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
                    <button type="button" className="small primary" onClick={() =>   props.history.push(`/item/${item._id}/ammend`)}>{/* edited */}
                      Edit
                    </button>
                    <button type="button" className="small primary"onClick={() => removeHandler(item)}>{/* edited */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row center pagination blackout">{/* Styling blackout self coded*/}
            {[...Array(pages).keys()].map((x) => (
              <Link className={x + 1 === page ? 'active' : ''} key={x + 1} 
              to={`/iteminventory/page_number/${x + 1}`} >{/* edited */}
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
