import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { displayItems } from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Item from '../components/Item';
import { prices } from '../utils';

export default function SearchScreen(props) {
  const {
    name = 'all',
    item_category = 'all',
    item_brand = 'all',
    minimum = 0,
    maximum = 0,
    user_rating = 0,
    customer_order = 'newest',
    page_number = 1,
  } = useParams();
  const dispatch = useDispatch();
  const displayProducts = useSelector((state) => state.displayProducts);
  const { loading, error, PPTitems, pptpage, pages } = displayProducts;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = productBrandList;



  useEffect(() => {
    dispatch(
      displayItems({
        page_number,
        name: name !== 'all' ? name : '',
        item_category: item_category !== 'all' ? item_category : '',
        item_brand: item_brand !== 'all' ? item_brand : '',
        minimum,
        maximum,
        user_rating,
        customer_order,
      })
    );
  }, [item_category, item_brand, dispatch, maximum, minimum, name, customer_order, user_rating, page_number]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.pptpage || page_number;
    const filterCategory = filter.item_category || item_category;
    const filterBrand = filter.item_brand || item_brand;
    const filterName = filter.name || name;
    const filterRating = filter.user_rating || user_rating;
    const sortOrder = filter.customer_order || customer_order;
    const filterMin = filter.minimum ? filter.minimum : filter.minimum === 0 ? 0 : minimum;
    const filterMax = filter.maximum ? filter.maximum : filter.maximum === 0 ? 0 : maximum;
    return `/search/item_category/${filterCategory}/item_brand/${filterBrand}/name/${filterName}/minimum/${filterMin}/maximum/${filterMax}/user_rating/${filterRating}/customer_order/${sortOrder}/page_number/${filterPage}`;
  };
  return (
    <div className="">
      <div className="row center pageS">
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
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{PPTitems.length} Result(s)</div>
        )}
          <h3 className="">Department</h3>
          <div>
          <ul className="categories">
          <li>
              <strong>Categories</strong>
            </li>
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
            <li>
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === item_brand ? 'active' : ''}
                    to={getFilterUrl({ item_brand: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {brands.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === item_brand ? 'active' : ''}
                      to={getFilterUrl({ item_brand: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            </ul>
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