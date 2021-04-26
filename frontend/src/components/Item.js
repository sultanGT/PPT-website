import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Rating from './Rating';



export default function Item(props) {
  
  const { item } = props;
  const [isShown, setIsShown] = useState(false);

  return (
  <div>
    {/* <Link to={`/search/item_category/${item.item_category}`} >
    <div className="row center">
        <h1>{item.item_category}</h1>
        </div>
    </Link> */}

    <div key={item._id} className="card2" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
      <Link to={`/item/${item._id}`}>
        <img className="medium" src={item.picture} alt={item.name} />
      </Link>
      <div className="card-body2">
      {isShown && (
      <div className="row center">
        <Link className="wide" to={`/item/${item._id}`}>
          <button className="primary button-wide"> View Item </button>
        </Link>
      </div>
      )}
        <Link className="h2-title center"to={`/item/${item._id}`}>
          <h2 className={isShown ? 'h2-title center' : ''}>{item.name}</h2>
        </Link>
        {/* <Rating
          user_rating={item.user_rating}
          numReviews={item.numReviews}
        ></Rating> */}
        <div className={isShown ? 'deactive' : 'cost center'}>£{item.cost}</div>
      </div>
    </div>
    </div>
  );
}