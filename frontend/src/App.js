import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { logout } from './actions/customerActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ShoppingPage from './screens/ShoppingPage';
import HomePage from './screens/HomePage';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBar from './components/SearchBar';
import SearchScreen from './screens/SearchScreen';
import { displayItemBrands, displayItemCategories } from './actions/itemActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import '@fortawesome/fontawesome-free/js/all.js';
import img from './pptmenuicon.png';
import { addShoppingItem, deleteShoppingItem } from './actions/shoppingActions';




function App(props) {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const customerLogin = useSelector((state) => state.customerLogin);
  const { pptUserDetails } = customerLogin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(logout());
  };
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

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
    dispatch(displayItemCategories());
    dispatch(displayItemBrands());
  }, [dispatch]);


  const shopping = useSelector((state) => state.shopping);
  const { shoppingItems, error } = shopping;
  const deleteItemHandler = (id) => {
    dispatch(deleteShoppingItem(id));
  };
  
  return (
    <BrowserRouter>
      <div className="grid-container">
      <header className={navbar ? 'row navbar active' : 'row navbar'}>
          <div className="row left">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              {/* <i className={ navbar ? 'fa fa-bars' : 'deactive'}></i> */}
              <img className={ navbar ? 'menuIconSmall responsive' : ' menuIconLarge responsive'} src={img} alt="PPTmenuIcon"></img>
            </button>
            <Link className="Brand" to="/">
              PEAK PERFORMANCE TAEKWONDO
            </Link>
          </div>
          <div className="row responsive">
            <Route
              render={({ history }) => (
                <SearchBar history={history}></SearchBar>
              )}
            ></Route>
          </div>

          <div>
          <div className="dropdown">
            <Link to="/cart">
              {/* Cart*/}
              <i className="fas fa-shopping-cart iconLarge"></i>
              {shoppingItems.length > 0 && (
                <span className="badge">{shoppingItems.length}</span>
              )}
            </Link>
{/* DROPDOWN CART SCREEN */}
            <div className="dropdown-content cartDropdown responsive">
                {
                  <div className="row top pager">
                  <div className="col-2">
                    <h1>Shopping Cart</h1>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {shoppingItems.length === 0 ? (
                      <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                      </MessageBox>
                    ) : (
                      <ul>
                        {shoppingItems.map((item) => (
                          <li key={item.item}>
                            <div className="row">
                              <div>
                                <img
                                  src={item.picture}
                                  alt={item.name}
                                  className="small"
                                ></img>
                              </div>
                              <div className="min-30">
                                <Link to={`/item/${item.item}`}>{item.name}</Link>
                              </div>
                              <div>
                                <select
                                  value={item.quantity}
                                  onChange={(e) =>
                                    dispatch(
                                      addShoppingItem(item.item, Number(e.target.value))
                                    )
                                  }
                                >
                                  {[...Array(item.stock_number).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>£{item.cost}</div>
                              <div>
                                <button
                                  type="button"
                                  onClick={() => deleteItemHandler(item.item)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="col-1">
                    <div className="container-box container-box-info">
                      <ul>
                        <li>
                          <h2>
                            Subtotal ({shoppingItems.reduce((a, c) => a + c.quantity, 0)} items) : £
                            {shoppingItems.reduce((a, c) => a + c.cost * c.quantity, 0)}
                          </h2>
                        </li>
                        <li>
                        {shoppingItems.length > 0 && (
                          <button
                            type="button"
                            className="primary block"
                            disabled={shoppingItems.length === 0}
                          >
                            <Link className='primary block' to='/signup?redirect=shipping'>Proceed to Checkout</Link>
                            
                          </button>
                        )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                }
            

                </div>
            </div>

            {pptUserDetails ? (
              <div className="dropdown">
                <Link to="#">
                <i className="far fa-user iconLarge"></i>{'  '}<i className="username">{ pptUserDetails.name }</i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/credentials">User Profile  <i className="fa fa-address iconSmall"></i></Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History  <i className="fa fa-history iconSmall"></i></Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler} >
                      Sign Out  <i className="fa fa-sign-out-alt"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signup"><i className="far fa-user iconLarge"></i></Link>
            )}

            {pptUserDetails && pptUserDetails.userCredentialsAdministrator && (
              <div className="dropdown">
                <Link to="#admin">
                <i className="fas fa-user-shield iconLarge"></i> {/*admin*/}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">PPT Items List</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">PPT Orders List</Link>
                  </li>
                  <li>
                    <Link to="/userlist">PPT Users List</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/item_category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
            <li>
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((a) => (
                <li key={a}>
                  <Link
                    to={`/search/item_brand/${a}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {a}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
        <div className="pages">
          <Route path="/shopping/:id?" component={ShoppingPage}></Route>
          <Route path="/item/:id" component={ProductScreen} exact></Route>
          <Route path="/item/:id/edit" component={ProductEditScreen} exact></Route>
          {/* <Route path="/login" component={SigninScreen}></Route> */}
          <Route path="/signup" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/customer_order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/item_category/:item_category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/item_category/:item_category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/item_brand/:item_brand"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/item_brand/:item_brand/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/item_category/:item_category/item_brand/:item_brand/name/:name/minimum/:minimum/maximum/:maximum/user_rating/:user_rating/customer_order/:customer_order/page_number/:page_number"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/credentials"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/page_number/:page_number"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/pptuser/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          </div>
          <Route path="/" component={HomePage} exact></Route>
      
        </main>
        
        <footer className="row">
          <div className='fbox1'>
          <Link className="footerbrand" to="/">
              PEAK PERFORMANCE TAEKWONDO
            </Link>
          <h2>Address: Wimbeldon Park Hall,<br/> 170 Arthur Rd, Wimbledon Park,<br/> London SW19 8AQ</h2>
          </div>
          <div className='fbox2 responsive'>
          <ul className="categories">
            <li>
              <h1>Item Categories</h1>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c} className="">
                  <Link className="cat"
                    to={`/search/item_category/${c}`}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
          </div>
          <div className='fbox2 responsive'>
          <ul className="categories">
          <li>
              <h1>Brands</h1>
            </li>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((a) => (
                <li key={a}>
                  <Link className='cat'
                    to={`/search/item_brand/${a}`}
                  >
                    {a}
                  </Link>
                </li>
              ))
            )}
            </ul>
          </div>
          <div>
          <ul className="categories responsive">
          <li>
              <h1>PPT Items</h1>
            </li>
            </ul>
          </div>
      © 2021 Peak Performance
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
