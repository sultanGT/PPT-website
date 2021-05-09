import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { shoppingReducer } from './reducers/shoppingReducers';
import {purchaseNewReducer,purchaseRemoveReducer,purchaseShippingReducer,purchaseInfoReducer,purchaseHistoryReducer,purchaseAccountHistoryReducer,purchasePayPalReducer,} from './reducers/purchaseReducers';
import {itemBrandListReducer,itemOurProductReducer, //self coded
  itemCategoryListReducer,itemCreateReducer,itemRemoveReducer,itemInfoReducer,itemListReducer,itemReviewNewReducer,itemAmmendReducer,} from './reducers/itemReducers';
import {customerRemoveReducer,customerInfoReducer,customerHistoryReducer,customerRegisterReducer,customerLoginReducer,customerAmmendAccountReducer,customerAmmendReducer,} from './reducers/customerReducers';
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//https://github.com/basir/amazona/blob/master/frontend/src/store.js
const initialState = {customerLogin: {userDetails: localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')): null,},
  shopping: {shoppingItems: localStorage.getItem('shoppingItems')? JSON.parse(localStorage.getItem('shoppingItems')): [],delivery_address: localStorage.getItem('delivery_address')? JSON.parse(localStorage.getItem('delivery_address')): {},purchase_method: 'PayPal',
  },
};
//all reducers have been edited and optimised for PPT web applicaiton
const reducer = combineReducers({displayProducts: itemListReducer,itemDetails: itemInfoReducer,shopping: shoppingReducer,customerLogin: customerLoginReducer,
userRegister: customerRegisterReducer,newCustomerPurchase: purchaseNewReducer,purchaseDetails: purchaseInfoReducer,purchasePayment: purchasePayPalReducer,displayPurchaseAccount: purchaseAccountHistoryReducer,userInfo: customerInfoReducer,userAmmendAccount: customerAmmendAccountReducer,userAmmend: customerAmmendReducer,itemNew: itemCreateReducer,itemAmmend: itemAmmendReducer,itemRemove: itemRemoveReducer,displayPurchase: purchaseHistoryReducer,purchaseRemove: purchaseRemoveReducer,purchaseShipping: purchaseShippingReducer,userList: customerHistoryReducer,userDelete: customerRemoveReducer,displayCategories:itemCategoryListReducer,
  displayBrands: itemBrandListReducer,//self coded
  displayOurProducts: itemOurProductReducer,//self coded 
  ItemNewReview: itemReviewNewReducer,
});
//enable redux developer extension tools for ppt web app
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));
export default store;