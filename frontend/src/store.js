import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productBrandListReducer,
  productCategoryListReducer,
  productCostListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  customerLogin: {
    pptUserDetails: localStorage.getItem('pptUserDetails')
      ? JSON.parse(localStorage.getItem('pptUserDetails'))
      : null,
  },
  shopping: {
    shoppingItems: localStorage.getItem('shoppingItems')
      ? JSON.parse(localStorage.getItem('shoppingItems'))
      : [],
    delivery_address: localStorage.getItem('delivery_address')
      ? JSON.parse(localStorage.getItem('delivery_address'))
      : {},
    purchase_method: 'PayPal',
  },
};
const reducer = combineReducers({
  displayProducts: productListReducer,
  itemDetails: productDetailsReducer,
  shopping: cartReducer,
  customerLogin: userSigninReducer,
  userRegister: userRegisterReducer,
  newCustomerPurchase: orderCreateReducer,
  purchaseDetails: orderDetailsReducer,
  purchasePayment: orderPayReducer,
  displayPurchaseAccount: orderMineListReducer,
  userInfo: userDetailsReducer,
  userAmmendAccount: userUpdateProfileReducer,
  userAmmend: userUpdateReducer,
  itemNew: productCreateReducer,
  itemAmmend: productUpdateReducer,
  itemRemove: productDeleteReducer,
  displayPurchase: orderListReducer,
  purchaseRemove: orderDeleteReducer,
  purchaseShipping: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  displayCategories: productCategoryListReducer,
  displayBrands: productBrandListReducer,
  displayOurProducts: productCostListReducer,
  ItemNewReview: productReviewCreateReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;