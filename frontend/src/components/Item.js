import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
//self coded
export default function Item(props) { 
  const { item } = props; 
  const [viewItem, setViewItem] = useState(false);  //self coded
  // Returns all the item boxes with the information of the items and a button overlay link to product page
  return (
  <div>
    {/* selfcoded */}
    <div key={item._id} 
    className="container-box-hc" onMouseEnter={() => setViewItem(true)} 
        onMouseLeave={() => setViewItem(false)}>  
      <Link to={`/item/${item._id}`}>
        <img className="medium" src={item.picture} alt={item.name} />
      </Link>
      <div className="container-box-info-hc">
      {viewItem && (
      <div className="row center">
        <Link className="wide" to={`/item/${item._id}`}>
          <button className="primary wide"> View Item </button>
        </Link>
      </div>
      )}
        <Link className="h2-title center"to={`/item/${item._id}`}>
          <h2 className={viewItem ? 'h2-title center' : ''}>{item.name}</h2>
        </Link>
        <div className={viewItem ? 'deactive' : 'cost center'}>£{item.cost}</div>
      </div>
    </div>
    </div>
  );
}