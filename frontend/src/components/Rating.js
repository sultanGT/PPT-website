import React from 'react';

export default function Rating(props) {
  const { userRating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            userRating >= 1
              ? 'fa fa-star'
              : userRating >= 0.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            userRating >= 2
              ? 'fa fa-star'
              : userRating >= 1.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            userRating >= 3
              ? 'fa fa-star'
              : userRating >= 2.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            userRating >= 4
              ? 'fa fa-star'
              : userRating >= 3.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            userRating >= 5
              ? 'fa fa-star'
              : userRating >= 4.5
              ? 'fa fa-star-half-o'
              : 'fa fa-star-o'
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
