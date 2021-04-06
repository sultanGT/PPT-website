import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import ImageSlider from '../components/ImageSlider';
import { SliderData } from '../components/SliderData';


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;



  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <div className="top">
{/* Carousel Slider */}
<div className="row center responsive"> 
<ImageSlider slides={SliderData} />
</div>    
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((item) => (
              <Product key={item._id} item={item}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
