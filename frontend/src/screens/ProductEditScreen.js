import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { itemInfo, ammendItem } from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ITEM_AMMEND_REFRESH } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const item_id = props.match.params.id;
  const [name, setName] = useState('');
  const [cost, setPrice] = useState('');
  const [picture, setImage] = useState('');
  const [item_category, setCategory] = useState('');
  const [stock_number, setstock_count] = useState('');
  const [item_brand, setproduct_brand] = useState('');
  const [item_info, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, item } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!item || item._id !== item_id || successUpdate) {
      dispatch({ type: ITEM_AMMEND_REFRESH });
      dispatch(itemInfo(item_id));
    } else {
      setName(item.name);
      setPrice(item.cost);
      setImage(item.picture);
      setCategory(item.item_category);
      setstock_count(item.stock_number);
      setproduct_brand(item.item_brand);
      setDescription(item.item_info);
    }
  }, [item, dispatch, item_id, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update item
    dispatch(
      ammendItem({
        _id: item_id,
        name,
        cost,
        picture,
        item_category,
        item_brand,
        stock_number,
        item_info,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/saver', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${pptUserDetails.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Item {item_id}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="cost">Price</label>
              <input
                id="cost"
                type="text"
                placeholder="Enter cost"
                value={cost}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="picture">Image</label>
              <input
                id="picture"
                type="text"
                placeholder="Enter picture"
                value={picture}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
            <label htmlFor="item_category">Category</label>
              <input
                id="item_category"
                type="text"
                placeholder="Enter item_category"
                value={item_category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="item_brand">Brand</label>
              <input
                id="item_brand"
                type="text"
                placeholder="Enter brand"
                value={item_brand}
                onChange={(e) => setproduct_brand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="stock_number">Count In Stock</label>
              <input
                id="stock_number"
                type="text"
                placeholder="Enter stock_number"
                value={stock_number}
                onChange={(e) => setstock_count(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="item_info">Description</label>
              <textarea
                id="item_info"
                rows="3"
                type="text"
                placeholder="Enter item_info"
                value={item_info}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}