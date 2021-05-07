import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { displayItems } from '../actions/itemActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Item from '../components/Item';
import { prices } from '../utils';

//Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//function for search page and filters
//variable declaations
export default function SearchPage(props) {
  const { name = 'all',item_category = 'all',item_brand = 'all', minimum = 0, maximum = 0, user_rating = 0,  customer_order = 'newest', page_number = 1,
} = useParams();
  const dispatch = useDispatch();
  const displayProducts = useSelector((state) => state.displayProducts); //edited
  const { loading, error, PPTitems, page, pages } = displayProducts;//edited
  const displayCategories = useSelector((state) => state.displayCategories);//edited
  const {loading: loadingCategories, error: errorCategories, categories, } = displayCategories;//edited
  const displayOurProducts = useSelector((state) => state.displayOurProducts);

  //selfcoded
  const { 
    loading: loadingOurProducts,
    error: errorOurProducts, 
    our_products, 
  } = displayOurProducts;
//selfcoded 
  const displayBrands = useSelector((state) => state.displayBrands);
  const {
    loading: loadingBrands, 
    error: errorBrands, 
    brands, 
  } = displayBrands; 

  useEffect(() => {
    dispatch(
      displayItems({page_number,
        name: name !== 'all' ? name : '',
        item_category: item_category !== 'all' ? item_category : '',

        item_brand: item_brand //selfcoded
        !== 'all' 
        ? item_brand : '',

        our_product: item_brand //selfcoded
        !== 'all' 
        ? item_brand : '',

        minimum,
        maximum,
        user_rating,
        customer_order,
      })
    );
  }, [item_category, item_brand, dispatch, maximum, minimum, name, customer_order, user_rating, page_number]); //item_brand self coded

  //variables for filtering react router pages URL's 
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page_number;
    const filterCategory = filter.item_category || item_category;
    const filterBrand = filter.item_brand || item_brand; //selfcoded
    const filterName = filter.name || name;
    const filterRating = filter.user_rating || user_rating;
    const sortOrder = filter.customer_order || customer_order;
    const filterMin = filter.minimum ? filter.minimum : filter.minimum === 0 ? 0 : minimum;
    const filterMax = filter.maximum ? filter.maximum : filter.maximum === 0 ? 0 : maximum;
    return `/search/item_category/${filterCategory}/item_brand/${filterBrand}/name/${filterName}/minimum/${filterMin}/maximum/${filterMax}/user_rating/${filterRating}/customer_order/${sortOrder}/page_number/${filterPage}`;
  };
  return (
    <div>
      <div className="row center blackout">
        <div>
          Sort by{' '}
          <select
            value={customer_order} onChange={(e) => {props.history.push(getFilterUrl({ customer_order: e.target.value })); //edited
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="row top blackout"> {/*styling selfcoded*/}
        <div className="col-1 borders">{/*styling selfcoded*/}
        {loading ? (
          <LoadingBox></LoadingBox> ) : error ? (<MessageBox variant="danger">{error}</MessageBox> ) : (
          <div className='row center result'>{PPTitems.length} Result(s)</div>//result styling self coded
        )}
          <h3 className='row center'>Department</h3>{/*styling selfcoded*/}
          <div>
          <ul className="categories ">{/*selfcoded*/}
          <li className='row center filter-titles'>{/* selfcoded*/}
              <strong>Categories</strong>{/* selfcoded*/}
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>) : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul className='search-filter'>{/* selfcoded*/}
                <li className='row center'>{/* selfcoded*/}
                  <Link
                    className={'all' === item_category ? 'search-filter-active' : ''} 
                    to={getFilterUrl({ item_category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li className='row center' key={c}>{/* styling selfcoded*/}
                    <Link
                      className={c === item_category ? 'search-filter-active' : ''}
                      to={getFilterUrl({ item_category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <li className='row center filter-titles '>{/*  selfcoded*/}
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (
<LoadingBox></LoadingBox>) : errorBrands ? (
              <MessageBox 
              variant="danger">{errorBrands}</MessageBox>//self coded
            ) : (
              <ul className='search-filter'>
                <li className='row center'>
                  <Link
                    className={'all' === item_brand 
                    ? 'search-filter-active' : ''}//self coded
                    to={getFilterUrl(
                      { item_brand: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {brands.map((c) => (
                  <li className='row center' 
                  key={c}>
                    <Link
                      className={c === item_brand 
                        ? 'search-filter-active' : ''}//self coded
                      to={getFilterUrl(
                        { item_brand: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <li className='row center filter-titles '>{/*  selfcoded*/}
              <strong>Our Products</strong>
            </li>
            {loadingOurProducts ? (
              <LoadingBox></LoadingBox>) : errorOurProducts ? ( <MessageBox variant="danger">{errorOurProducts}</MessageBox>) : (
              <ul className='search-filter'>
                {our_products.map((c) => (
                  <li className='row center' key={c}>
                    <Link
                      className={c === item_brand 
                        ? 'search-filter-active' : ''}//self coded
                      to={getFilterUrl(
                        { item_brand: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            </ul>
          </div>{/*  selfcoded*/}
          <div>
            <h3 className='row center'>Price</h3>
            <ul>
              {prices.map((p) => (
                <li className='row center' key={p.name}>
                  <Link to={getFilterUrl({ minimum: p.minimum, maximum: p.maximum })}
                    className={`${p.minimum}-${p.maximum}` === `${minimum}-${maximum}` ? 'search-filter-active' : ''}> {/*  styling selfcoded*/}
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
            <>
              {PPTitems.length === 0 && (<MessageBox>No Item Found</MessageBox>)}{/* edited */}
              <div className="row center blackout">
                {PPTitems.map((item) => (<Item key={item._id} item={item}></Item> //edited
                ))}
              </div>
              <div className="row center pagination blackout">
                {[...Array(pages).keys()].map((x) => (
                  <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={getFilterUrl({ page: x + 1 })}>{x + 1}
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