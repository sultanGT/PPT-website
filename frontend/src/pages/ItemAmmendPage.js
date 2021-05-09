import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { itemInfo, ammendItem } from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ITEM_AMMEND_REFRESH } from '../constants/itemConstants';//Reused edited


// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function ItemAmmendPage(props) {

  //
  const itemId = props.match.params.id;//Reused edited
  const [name, setName] = useState('');
  const [cost, setPrice] = useState('');//Reused edited
  const [picture, setPicture] = useState('');//Reused edited
  const [item_category, setCategory] = useState('');
  const [stock_number, setstock_count] = useState('');//Reused edited
  const [item_brand, setproduct_brand] = useState('');//Reused edited
  const [item_info, setInfo] = useState('');//Reused edited

  //
  const itemDetails = useSelector((state) => state.itemDetails);//Reused edited
  const { loading, error, item } = itemDetails;//Reused edited

  const itemAmmend = useSelector((state) => state.itemAmmend);//Reused edited
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = itemAmmend;//Reused edited

  //
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/iteminventory');//Reused edited
    }
    if (!item || item._id !== itemId || successUpdate) {//Reused edited
      dispatch({ type: ITEM_AMMEND_REFRESH });//Reused edited
      dispatch(itemInfo(itemId));//Reused edited
    } else {
      setName(item.name);
      setPrice(item.cost);//Reused edited
      setPicture(item.picture);//Reused edited
      setCategory(item.item_category);
      setstock_count(item.stock_number);//Reused edited
      setproduct_brand(item.item_brand);
      setInfo(item.item_info);//Reused edited
    }
  }, [item, dispatch, itemId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update item
    dispatch(
      ammendItem({
        _id: itemId,name,cost,picture,item_category,item_brand,stock_number,item_info,})
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const customerLogin = useSelector((state) => state.customerLogin);//Reused edited
  const { userDetails } = customerLogin;//Reused edited
  const pictureUploadHandler = async (e) => {//Reused edited
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/saver', bodyFormData, {//Reused edited
        headers: {
          'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userDetails.token}`,
        },
      });
      setPicture(data);
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
          <h1>Edit Item {itemId}</h1>
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
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="cost">Price</label>
              <input id="cost" type="text" placeholder="Enter cost" value={cost} onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="picture">Image</label>
              <input id="picture" type="text" placeholder="Enter picture" value={picture} onChange={(e) => setPicture(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input type="file" id="imageFile" label="Choose Picture" onChange={pictureUploadHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
            </div>
            <div>
            <label htmlFor="item_category">Category</label>
              <input id="item_category" type="text" placeholder="Enter item category" value={item_category} onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="item_brand">Brand</label>
              <input id="item_brand" type="text" placeholder="Enter brand" value={item_brand} onChange={(e) => setproduct_brand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="stock_number">Stock Count</label>  {/* edited */}
              <input id="stock_number"  type="text" placeholder="Enter stock amount"   value={stock_number}  onChange={(e) => setstock_count(e.target.value)} 
              ></input>
            </div>
            <div>
            <label htmlFor="item_info">Description</label>
              <textarea id="item_info" rows="3" type="text" placeholder="Enter item description" value={item_info} onChange={(e) => setInfo(e.target.value)}
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