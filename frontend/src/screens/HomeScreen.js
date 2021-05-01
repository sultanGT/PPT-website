import React, { useEffect } from 'react';
import Item from '../components/Item';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { displayItems } from '../actions/itemActions';
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, PPTitems } = productList;



  useEffect(() => {
    dispatch(displayItems({}));
  }, [dispatch]);
  return (
    <div>
{/* Carousel Slider */}
<div className="row center responsive"> 
<ImageSlider slides={SliderData} />
</div>
<h1 className='row center itemTitle'>Our Newest Products!</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {PPTitems.length === 0 && <MessageBox>No Item Found</MessageBox>}
          <div className="row center">
            {PPTitems.map((item) => (
              <Item key={item._id} item={item}></Item>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
