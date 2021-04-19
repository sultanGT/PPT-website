import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  

 

  const { item } = props;

  return (
  <div>
    {/* <Link to={`/search/productCategory/${item.productCategory}`} >
    <div className="row center">
        <h1>{item.productCategory}</h1>
        </div>
    </Link> */}

    <div key={item._id} className="card2">
      <Link to={`/item/${item._id}`}>
        <img className="medium" src={item.picture} alt={item.name} />
      </Link>
      <div className="card-body2">
        <Link to={`/item/${item._id}`}>
          <h2>{item.name}</h2>
        </Link>
        <Rating
          userRating={item.userRating}
          numReviews={item.numReviews}
        ></Rating>
        <div className="price">£{item.price}</div>
      </div>
    </div>
    </div>
  );
}