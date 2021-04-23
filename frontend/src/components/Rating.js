import React from 'react';

export default function Rating(props) {
  const { user_rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            user_rating >= 1
              ? 'fa fa-star'
              : user_rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            user_rating >= 2
              ? 'fa fa-star'
              : user_rating >= 1.5
              ? 'fa fa-star-half-o'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            user_rating >= 3
              ? 'fa fa-star'
              : user_rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            user_rating >= 4
              ? 'fa fa-star'
              : user_rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            user_rating >= 5
              ? 'fa fa-star'
              : user_rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' reviews'}</span>
      )}
    </div>
  );
}
