import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { newReview, itemInfo } from '../actions/itemActions'; //Reused edited
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { ITEM_REVIEW_CREATE_REFRESH } from '../constants/itemConstants';//Reused edited
import { GrReturn } from 'react-icons/gr'; //self-coded

// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reused edited
export default function ItemPage(props) {
  const dispatch = useDispatch();
  const itemId = props.match.params.id;//Reused edited
  const [quantity, setQty] = useState(1);
  const itemDetails = useSelector((state) => state.itemDetails);//Reused edited
  const { loading, error, item } = itemDetails;//Reused edited
  const customerLogin = useSelector((state) => state.customerLogin);//Reused edited
  const { userDetails } = customerLogin;//Reused edited
  const ItemNewReview = useSelector((state) => state.ItemNewReview);//Reused edited
  const {loading: loadingNewReview,error: errorNewReview,success: successNewReview,} = ItemNewReview;//Reused edited
  const [user_rating, setCustomerRating] = useState(0);
  const [user_comment, setCustomerComment] = useState('');

  useEffect(() => {
    if (successNewReview) {
      window.alert('Your Review has now been Published'); //Reused edited
      setCustomerRating('');//Reused edited
      setCustomerComment('');//Reused edited
      dispatch({ type: ITEM_REVIEW_CREATE_REFRESH });//Reused edited
    }
    dispatch(itemInfo(itemId));//Reused edited
  }, [dispatch, itemId, successNewReview]);//Reused edited
  
  const addShoppingItemHandler = () => {//Reused edited
    props.history.push(`/shopping/${itemId}?quantity=${quantity}`);//Reused edited
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (user_comment && user_rating) {
    dispatch(
      newReview(itemId, { user_rating, 
        user_comment, 
        name: userDetails.name }) //Reused edited
      );
    } else {
      alert('Please enter a review of the item and rating');//Reused edited
    }
  };

  //Reused edited
  return (
    <div>
      {loading ? ( <LoadingBox></LoadingBox> ) : error ? ( <MessageBox variant="danger">{error}</MessageBox> ) : (
        <div>
          <div>
          <Link to="/"><GrReturn className="return" /></Link> {/* selfcoded */}
          </div>
          <div className="row top"> 
            <div className="col-2">
              <img
                className="large"
                src={item.picture} //Reused edited
                alt={item.name} //Reused edited
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{item.name}</h1> 
                </li>
                <li>
                  <Rating user_rating={item.user_rating} review_count={item.review_count}></Rating> {/*reused edited*/}
                </li>
                <li>Price : £{item.cost}</li>{/* editecoded */}
                <li>
                  Description:
                  <p>{item.item_info}</p>{/* edited coded */}
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
                {userDetails ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="user_rating">Rating</label>
                      <select id="user_rating" value={user_rating} onChange={(e) => setCustomerRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option></select>
                    </div>
                    <div>
                      <label htmlFor="user_comment">Comment</label>
                      <textarea id="user_comment" value={user_comment} onChange={(e) => setCustomerComment(e.target.value)}></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit"> {/* primary styling self edited */} Submit</button>
                    </div>
                    <div>
                      {loadingNewReview && <LoadingBox></LoadingBox>} {errorNewReview && (
                        <MessageBox variant="danger">{errorNewReview}</MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>Please <Link to="/signup">Sign In</Link> to write a review  </MessageBox>
                )}
              </li>
            </ul>
          </div>
            <div className="col-1">
              <div className="container-box container-box-info">
                <ul>
                  <li>
                    <div className="row"><div>Price</div><div className="cost">£{item.cost}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {item.stock_number > 0 ? (<span className="success">In Stock</span>) : (<span className="danger">Unavailable</span>)}
                      </div>
                    </div>
                  </li>
                  {item.stock_number > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select value={quantity} onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(item.stock_number).keys()].map( (x) => (
                                  <option key={x + 1} value={x + 1}> {x + 1}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button onClick={addShoppingItemHandler} className="primary block">Add to Cart </button>
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
