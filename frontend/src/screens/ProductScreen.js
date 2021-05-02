import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newReview, itemInfo } from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { GrReturn } from 'react-icons/gr';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const item_id = props.match.params.id;
  const [quantity, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, item } = productDetails;
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [user_rating, setRating] = useState(0);
  const [user_comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(itemInfo(item_id));
  }, [dispatch, item_id, successReviewCreate]);
  
  const addToCartHandler = () => {
    props.history.push(`/cart/${item_id}?quantity=${quantity}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (user_comment && user_rating) {
      dispatch(
        newReview(item_id, { user_rating, user_comment, name: pptUserDetails.name })
      );
    } else {
      alert('Please enter user_comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div>
          <Link to="/"><GrReturn className="return" /></Link>
          </div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={item.picture}
                alt={item.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{item.name}</h1>
                </li>
                <li>
                  <Rating
                    user_rating={item.user_rating}
                    review_count={item.review_count}
                  ></Rating>
                </li>
                <li>Price : £{item.cost}</li>
                <li>
                  Description:
                  <p>{item.item_info}</p>
                </li>
              </ul>
            </div>
            <div className="col-1 row">
            <h1 id="reviews">Reviews</h1>
            <ul>
              {item.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating user_rating={review.user_rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.user_comment}</p>
                </li>
              ))}
              <li>
                {pptUserDetails ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="user_rating">Rating</label>
                      <select
                        id="user_rating"
                        value={user_rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="user_comment">Comment</label>
                      <textarea
                        id="user_comment"
                        value={user_comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signup">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="cost">£{item.cost}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {item.stock_number > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {item.stock_number > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={quantity}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(item.stock_number).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
