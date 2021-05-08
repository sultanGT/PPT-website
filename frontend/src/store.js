import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  purchaseNewReducer,
  purchaseRemoveReducer,
  purchaseShippingReducer,
  purchaseInfoReducer,
  purchaseHistoryReducer,
  purchaseAccountHistoryReducer,
  purchasePayPalReducer,
} from './reducers/purchaseReducers';
import {
  itemBrandListReducer,
  itemCategoryListReducer,
  itemOurProductReducer,
  itemCreateReducer,
  itemRemoveReducer,
  itemInfoReducer,
  itemListReducer,
  itemReviewNewReducer,
  itemAmmendReducer,
} from './reducers/itemReducers';
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
    userDetails: localStorage.getItem('userDetails')
      ? JSON.parse(localStorage.getItem('userDetails'))
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
  displayProducts: itemListReducer,
  itemDetails: itemInfoReducer,
  shopping: cartReducer,
  customerLogin: userSigninReducer,
  userRegister: userRegisterReducer,
  newCustomerPurchase: purchaseNewReducer,
  purchaseDetails: purchaseInfoReducer,
  purchasePayment: purchasePayPalReducer,
  displayPurchaseAccount: purchaseAccountHistoryReducer,
  userInfo: userDetailsReducer,
  userAmmendAccount: userUpdateProfileReducer,
  userAmmend: userUpdateReducer,
  itemNew: itemCreateReducer,
  itemAmmend: itemAmmendReducer,
  itemRemove: itemRemoveReducer,
  displayPurchase: purchaseHistoryReducer,
  purchaseRemove: purchaseRemoveReducer,
  purchaseShipping: purchaseShippingReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  displayCategories: itemCategoryListReducer,
  displayBrands: itemBrandListReducer,
  displayOurProducts: itemOurProductReducer,
  ItemNewReview: itemReviewNewReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;