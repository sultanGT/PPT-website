import React from 'react';
// Reused code from Video tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
export default function Rating(props) {
  const { user_rating, review_count, caption } = props; 
  return (
    <div className="rating">
      <span> <i className={ user_rating >= 1 ? 'fas fa-star' : user_rating >= 0.5 ? 'fas fa-star-half-o' : 'far fa-star'}></i></span>
      <span><i className={ user_rating >= 2 ? 'fas fa-star' : user_rating >= 1.5 ? 'fas fa-star-half-o' : 'far fa-star'}></i></span>
      <span> <i className={ user_rating >= 3 ? 'fas fa-star': user_rating >= 2.5 ? 'fas fa-star-half-o' : 'far fa-star'}></i></span>
      <span> <i className={ user_rating >= 4 ? 'fas fa-star' : user_rating >= 3.5 ? 'fas fa-star-half-o' : 'far fa-star'}></i></span>
      <span><i className={ user_rating >= 5 ? 'fas fa-star' : user_rating >= 4.5 ? 'fas fa-star-half' : 'far fa-star' }></i></span>
      {caption ? ( <span>{caption}</span>) : (<span>{review_count + ' reviews'}</span>)}</div>);
}
