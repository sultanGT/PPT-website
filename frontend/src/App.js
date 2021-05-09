import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { logout } from './actions/customerActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ShoppingPage from './pages/ShoppingPage';
import HomePage from './pages/HomePage';
import CustomerPurchaseHistoryPage from './pages/CustomerPurchaseHistoryPage';
import PurchasePage from './pages/PurchasePage';
import PlacePurchasePage from './pages/PlacePurchasePage';
import ItemInventoryPage from './pages/ItemInventoryPage';
import ItemPage from './pages/ItemPage';
import MyAccountPage from './pages/MyAccountPage';
import SignupPage from './pages/SignupPage';
import DeliveryAddressPage from './pages/DeliveryAddressPage';
import ItemAmmendPage from './pages/ItemAmmendPage';
import PurchasesHistoryPage from './pages/PurchasesHistoryPage';
import CustomersRegisterPage from './pages/CustomersRegisterPage';
import CustomerAmmendPage from './pages/CustomerAmmendPage';
import SearchBar from './components/SearchBar';
import SearchPage from './pages/SearchPage';
import { displayItemBrands, displayItemCategories, displayOurItems } from './actions/itemActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import '@fortawesome/fontawesome-free/js/all.js';//selfcoded
import img from './pptmenuicon.png';//selfcoded
import { addShoppingItem, deleteShoppingItem } from './actions/shoppingActions';//selfcoded

// https://github.com/basir/amazona/blob/master/frontend/src/App.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c

//Main function for running the PPT App
function App(props) {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);//edited
  const customerLogin = useSelector((state) => state.customerLogin);//edited
  const { userDetails } = customerLogin;//edited
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(logout());//edited
  };
  const [navbar, setNavbar] = useState(false); //self coded
  const changeNavbar = () => {
    if (window.scrollY > 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };//self coded

  window.addEventListener('scroll', changeNavbar);//self coded

  const displayCategories = useSelector((state) => state.displayCategories);
  const { loading: loadingCategories, error: errorCategories, categories,} = displayCategories;

  //self coded
  const displayBrands = useSelector((state) => state.displayBrands);
  const {
    loading: loadingBrands,
    error: errorBrands,
    brands,
  } = displayBrands;
  //self coded
  const displayOurProducts = useSelector((state) => state.displayOurProducts);
  const {
    loading: loadingOurProducts,
    error: errorOurProducts,
    our_products,
  } = displayOurProducts;
  //self coded
//43

  useEffect(() => {
    dispatch(displayItemCategories());
    dispatch(displayItemBrands());  //self coded
    dispatch(displayOurItems());  //self coded
  }, [dispatch]);

//self coded
  const shopping = useSelector((state) => state.shopping);
  const { shoppingItems, error } = shopping;
  const removeProductHandler = (id) => {
    dispatch(deleteShoppingItem(id));
  };
//50

  return (
    <BrowserRouter>
      <div className="grid-container">
      <header className={navbar ? 'row navbar active' : 'row navbar'}>{/*self coded*/}
          <div className="row left">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarDisplay(true)}
            >
              {/* <i className={ navbar ? 'fa fa-bars' : 'deactive'}></i> */}
              <img className={ navbar ? 'menu-Icon-Small responsive' : ' menu-Icon-large responsive'} src={img} alt="PPTmenuIcon"></img>
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
          </div>{/*self coded 70*/}

          <div>
          <div className="dropdown"> 
            <Link to="/cart">
              {/* Shopping */}
              <i className="fas fa-shopping-cart icon-large"></i>{/*self coded*/}
              {shoppingItems.length > 0 && (
                <span className="badge">{shoppingItems.length}</span>
              )}
            </Link>
{/* 72 DROPDOWN shopping self coded SCREEN */}
            <div className="dropdown-content shopping-dropdown responsive">{/*self coded shopping cart displayed from navmenu */}
                {
                  <div className="row top pager">
                  <div className="col-2">
                    <h1>Shopping Cart</h1>
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                    {shoppingItems.length === 0 ? ( <MessageBox>Cart is empty. <Link to="/">Go Shopping</Link></MessageBox>
                    ) : (
                      <ul>
                        {shoppingItems.map((item) => (
                          <li key={item.item}>
                            <div className="row">
                              <div>
                                <img src={item.picture} alt={item.name} className="small"></img>
                              </div>
                              <div className="min-30">
                                <Link to={`/item/${item.item}`}>{item.name}</Link>
                              </div>
                              <div>
                                <select
                                  value={item.quantity} onChange={(e) => dispatch( addShoppingItem(item.item, Number(e.target.value)))}>
                                  {[...Array(item.stock_number).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>£{item.cost}</div>
                              <div>
                                <button type="button" className='primary' onClick={() => removeProductHandler(item.item)}
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
                          <button type="button" className="primary block" disabled={shoppingItems.length === 0}>
                            <Link className='primary block' to='/signup?redirect=delivery'>Proceed to Checkout</Link>
                          </button>
                        )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                }
            

                </div>{/*self coded shopping cart displayed from navmenu 134 */}
            </div>

            {userDetails ? (
              <div className="dropdown">
                <Link to="#">
                <i className="far fa-user icon-large"></i>{'  '}<i className="username">{ userDetails.name }</i>{/*self coded icons */}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/credentials">My Account<i className="fa fa-address-card icon-small"></i></Link>{/*self coded icons */}
                  </li>
                  <li>
                    <Link to="/purchasehistory">Order History<i className="fa fa-history icon-small"></i></Link>{/*self coded icons */}
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler} >
                      Sign Out  <i className="fa fa-sign-out-alt"></i>{/*self coded icons */}
                    </Link>
                  </li>
                </ul>
              </div>//
            ) : (
              <Link to="/signup"><i className="far fa-user icon-large"></i></Link>//selfcoded
            )}

            {userDetails && userDetails.userCredentialsAdministrator && (
              <div className="dropdown">
                <Link to="#admin">
                <i className="fas fa-user-shield icon-large"></i> {/*admin edited*/}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/iteminventory">PPT Inventory</Link> {/*edited */}
                  </li>
                  <li>
                    <Link to="/purchaseshistory">PPT Orders</Link> {/*edited */}
                  </li>
                  <li>
                    <Link to="/customerdisplay">PPT Users</Link> {/*edited */}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarDisplay ? 'open' : ''}>
          {/*reused*/}
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button onClick={() => setSidebarDisplay(false)} className="close-sidebar" type="button">
                <i className="fas fa-times"></i>
              </button>
            </li>
            {loadingCategories ? (<LoadingBox></LoadingBox>) : errorCategories ? ( <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (<li key={c}>
                  <Link to={`/search/item_category/${c}`} onClick={() => setSidebarDisplay(false)}>
                    {c}
                  </Link>
                </li>
              ))
            )}
            {/* 140 self coded brands */}
            <li>
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (<LoadingBox></LoadingBox>) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((a) => (
                <li key={a}>
                  <Link to={`/search/item_brand/${a}`}
                    onClick={() => setSidebarDisplay(false)}
                  >
                    {a}
                  </Link>
                </li>
              ))
            )}   {/* self coded brands */}

              {/* self coded Our Products */}
            <li>
              <strong>Our Products</strong>
            </li>
            {loadingOurProducts ? (
              <LoadingBox></LoadingBox>
            ) : errorOurProducts ? (
              <MessageBox variant="danger">{errorOurProducts}</MessageBox>
            ) : (
              our_products.map((q) => (
                <li key={q}>
                  <Link
                    to={`/search/item_brand/${q}`}
                    onClick={() => setSidebarDisplay(false)}
                  >
                    {q}
                  </Link>
                </li>
              ))
            )} 
            {/* self coded Our Products 176*/}
            
          </ul>
        </aside>
        <main>
          
              {/* Router pages for PPT web app */}
              {/* edited code */}
        <div className="pages">
          <Route path="/shopping/:id?" component={ShoppingPage}></Route>
          <Route path="/item/:id" component={ItemPage} exact></Route>
          <Route path="/item/:id/ammend" component={ItemAmmendPage} exact></Route>
          <Route path="/signup" component={SignupPage}></Route>
          <Route path="/delivery" component={DeliveryAddressPage}></Route>
          <Route path="/orderpurchase" component={PlacePurchasePage}></Route>
          <Route path="/customer_purchase/:id" component={PurchasePage}></Route>
          <Route path="/purchasehistory" component={CustomerPurchaseHistoryPage}></Route>
          <Route path="/search/name/:name?" component={SearchPage} exact ></Route>
          <Route path="/search/item_category/:item_category" component={SearchPage} exact></Route>
          <Route path="/search/item_category/:item_category/name/:name" component={SearchPage} exact></Route>
          {/*self coded*/}
          <Route
            path="/search/item_brand/:item_brand"
            component={SearchPage}
            exact
          ></Route>
          {/*self coded*/}
          <Route
            path="/search/item_brand/:item_brand/name/:name"
            component={SearchPage}
            exact
          ></Route>{/*self coded 186*/}
          <Route path="/search/item_category/:item_category/item_brand/:item_brand/name/:name/minimum/:minimum/maximum/:maximum/user_rating/:user_rating/customer_purchase/:customer_purchase/page_number/:page_number" component={SearchPage} exact></Route>
          <PrivateRoute path="/credentials" component={MyAccountPage}></PrivateRoute>
          <AdminRoute path="/iteminventory" component={ItemInventoryPage} exact></AdminRoute>
          <AdminRoute path="/iteminventory/page_number/:page_number" component={ItemInventoryPage} exact></AdminRoute>
          <AdminRoute path="/purchaseshistory" component={PurchasesHistoryPage} exact></AdminRoute>
          <AdminRoute path="/customerdisplay" component={CustomersRegisterPage}></AdminRoute>
          <AdminRoute path="/pptuser/:id/ammend" component={CustomerAmmendPage}></AdminRoute>
          </div><Route path="/" component={HomePage} exact></Route>
        </main>
         {/* edited code */}
        
        {/* self coded*/}
        <footer className="row">
          <div className='footerbox-1'>
          <Link className="footerbrand" to="/">
              PEAK PERFORMANCE TAEKWONDO
            </Link>
          <h2>Address: Wimbeldon Park Hall,<br/> 170 Arthur Rd, Wimbledon Park,<br/> London SW19 8AQ</h2>
          </div>
          <div className='footerbox-2 responsive'>
          <ul className="categories">
            <li>
              <h1>Item Categories</h1>
            </li>
            {loadingCategories ? (<LoadingBox></LoadingBox>
            ) : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c} className="">
                  <Link className="white-links" to={`/search/item_category/${c}`}>{c}</Link>
                </li>
              ))
            )}
          </ul>
          </div>
          <div className='footerbox-2 responsive'>
          <ul className="categories">
          <li>
              <h1>Brands</h1>
            </li>
            {loadingBrands ? (
              <LoadingBox></LoadingBox>) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((a) => (
                <li key={a}>
                  <Link className='white-links'
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
              <strong>Our Products</strong>
            </li>
            {loadingOurProducts ? (
              <LoadingBox></LoadingBox>) : errorOurProducts ? (
              <MessageBox variant="danger">{errorOurProducts}</MessageBox>) : (
              our_products.map((q) => (
                <li key={q}>
                  <Link
                  className='white-links' to={`/search/item_brand/${q}`}
                    onClick={() => setSidebarDisplay(false)}
                  >
                    {q}
                  </Link>
                </li>
              ))
            )}
            </ul>
          </div>
      © 2021 Peak Performance
        </footer>{/*self coded*/}
      </div>
    </BrowserRouter>
  );
}
export default App;
