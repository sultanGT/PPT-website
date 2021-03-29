import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { item } = props;
  return (
    <div key={item._id} className="card">
      <Link to={`/item/${item._id}`}>
        <img className="medium" src={item.picture} alt={item.name} />
      </Link>
      <div className="card-body">
        <Link to={`/item/${item._id}`}>
          <h2>{item.name}</h2>
        </Link>
        <Rating
          rating={item.rating}
          numReviews={item.numReviews}
        ></Rating>
        <div className="price">£{item.price}</div>
      </div>
    </div>
  );
}