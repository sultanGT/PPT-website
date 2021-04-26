import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import '@fortawesome/fontawesome-free/js/all.js';
import img from './constants/pptmenuicon.png';



     
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // const [searchBar, setSearchBar] = useState(false);
  // const changeSearchBackground = () => {
  //   if (window.scrollY >= 300) {
  //     setSearchBar(true);
  //   } else {
  //     setSearchBar(false);
  //   }
  // };
  // 

  window.addEventListener('scroll', changeBackground);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  
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
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              {/* Cart*/}
              <i className="fas fa-shopping-cart iconLarge"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                
                <Link to="#">
                <i className="far fa-user iconLarge"></i>{'  '}<i className="username">{ userInfo.name }</i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/credentials">User Profile  <i className="fa fa-address-card iconSmall"></i></Link>
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
              <Link to="/login"><i className="far fa-user iconLarge"></i></Link>
            )}

            {userInfo && userInfo.userCredentialsAdministrator && (
              <div className="dropdown">
                <Link to="#admin">
                <i className="fas fa-user-shield iconLarge"></i> {/*admin*/}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
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
          </ul>
        </aside>
        <main>
        <div className="pages">
          <Route path="/cart/:id?" component={CartScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/item/:id" component={ProductScreen} exact></Route>
          </div>
          <div className="pages">
          <Route
            path="/item/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          </div>
          <div className="pages">
          <Route path="/login" component={SigninScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/signup" component={RegisterScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/customer_order/:id" component={OrderScreen}></Route>
          </div>
          <div className="pages">
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          </div>
          <div className="pages">
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          </div>
          <div className="pages">
          <Route
            path="/search/item_category/:item_category"
            component={SearchScreen}
            exact
          ></Route>
          </div>
          <div className="pages">
          <Route
            path="/search/item_category/:item_category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          </div>
          <div className="pages">
          <Route
            path="/search/item_category/:item_category/name/:name/minimum/:minimum/maximum/:maximum/user_rating/:user_rating/customer_order/:customer_order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          </div>
          <div className="pages">
          <PrivateRoute
            path="/credentials"
            component={ProfileScreen}
          ></PrivateRoute>
          </div>
          <div className="pages">
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          </div>
          <div className="pages">
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          </div>
          <div className="pages">
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          </div>
          <div className="pages">
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          </div>
          <div className="pages">
          <AdminRoute
            path="/pptuser/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          </div>
                
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row">
          <div className='fbox1'>
          <Link className="footerbrand" to="/">
              PEAK PERFORMANCE TAEKWONDO
            </Link>
          <h2>Address: Wimbeldon Park Hall,<br/> 170 Arthur Rd, Wimbledon Park,<br/> London SW19 8AQ</h2>
          </div>
          <div className='fbox2'>
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
      © 2021 Peak Performance
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
