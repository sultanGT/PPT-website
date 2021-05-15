import React, { useEffect } from 'react';
import Item from '../components/Item'; //edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { displayItems } from '../actions/itemActions'; //edited
import ImageCarousel from '../components/ImageCarousel'; //edited
import { ImageSlides } from '../components/ImageSlides'; //edited

// https://github.com/basir/amazona/blob/master/frontend/src/screens/HomeScreen.js
// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function HomePage() { //edited
  const dispatch = useDispatch();
  const displayProducts = useSelector((state) => state.displayProducts); //edited
  const { loading, error, PPTitems } = displayProducts; //edited
  
  useEffect(() => {
    dispatch(displayItems({})); //edited
  }, [dispatch]);
//
  return (
    <div className=''>
{/* Carousel Slider */}

<div className="row center carousel-box"> {/* Styling responsive self coded */}
<ImageCarousel className='row center'slides={ImageSlides} /> {/* edited */}
</div>
<h1 className='row center container-box-hc-title'>Our Newest Products!</h1> {/* self coded */}
      {loading ? (
        <LoadingBox></LoadingBox>) : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : (
        <>
      {PPTitems.length === 0 &&
      <MessageBox>No Item Found</MessageBox>}
      <div className="row center"> {PPTitems.map((item) => ( <Item key={item._id} item={item}></Item>))}</div> {/* edited */}
        </>
      )}
    </div>
  );
}
