import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Item from '../components/Item';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const {
    name = 'all',
    item_category = 'all',
    minimum = 0,
    maximum = 0,
    user_rating = 0,
    customer_order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, PPTitems, pptpage, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        item_category: item_category !== 'all' ? item_category : '',
        minimum,
        maximum,
        user_rating,
        customer_order,
      })
    );
  }, [item_category, dispatch, maximum, minimum, name, customer_order, user_rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.pptpage || pageNumber;
    const filterCategory = filter.item_category || item_category;
    const filterName = filter.name || name;
    const filterRating = filter.user_rating || user_rating;
    const sortOrder = filter.customer_order || customer_order;
    const filterMin = filter.minimum ? filter.minimum : filter.minimum === 0 ? 0 : minimum;
    const filterMax = filter.maximum ? filter.maximum : filter.maximum === 0 ? 0 : maximum;
    return `/search/item_category/${filterCategory}/name/${filterName}/minimum/${filterMin}/maximum/${filterMax}/user_rating/${filterRating}/customer_order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div className="">
      <div className="row pageS">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{PPTitems.length} Results</div>
        )}
        <div>
          Sort by{' '}
          <select
            value={customer_order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ customer_order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top pageS">
        <div className="col-1 borders">
          <h3 className="">Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === item_category ? 'active' : ''}
                    to={getFilterUrl({ item_category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === item_category ? 'active' : ''}
                      to={getFilterUrl({ item_category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ minimum: p.minimum, maximum: p.maximum })}
                    className={
                      `${p.minimum}-${p.maximum}` === `${minimum}-${maximum}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ user_rating: r.user_rating })}
                    className={`${r.user_rating}` === `${user_rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} user_rating={r.user_rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {PPTitems.length === 0 && (
                <MessageBox>No Item Found</MessageBox>
              )}
              <div className="row center pageS">
                {PPTitems.map((item) => (
                  <Item key={item._id} item={item}></Item>
                ))}
              </div>
              <div className="row center pagination pageS">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === pptpage ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ pptpage: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}