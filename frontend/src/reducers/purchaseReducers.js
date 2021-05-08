import {
  PURCHASE_NEW_ERROR,
  PURCHASE_NEW_REQUEST,
  PURCHASE_NEW_REFRESH,
  PURCHASE_NEW_COMPLETE,
  PURCHASE_INFO_ERROR,
  PURCHASE_INFO_REQUEST,
  PURCHASE_INFO_COMPLETE,
  PURCHASE_ACCOUNT_HISTORY_ERROR,
  PURCHASE_ACCOUNT_HISTORY_REQUEST,
  PURCHASE_ACCOUNT_HISTORY_COMPLETE,
  PURCHASE_PAYPAL_ERROR,
  PURCHASE_PAYPAL_REQUEST,
  PURCHASE_PAYPAL_REFRESH,
  PURCHASE_PAYPAL_COMPLETE,
  PURCHASE_HISTORY_REQUEST,
  PURCHASE_HISTORY_COMPLETE,
  PURCHASE_HISTORY_ERROR,
  PURCHASE_REMOVE_REQUEST,
  PURCHASE_REMOVE_COMPLETE,
  PURCHASE_REMOVE_ERROR,
  PURCHASE_REMOVE_REFRESH,
  PURCHASE_SHIPPING_REQUEST,
  PURCHASE_SHIPPING_COMPLETE,
  PURCHASE_SHIPPING_ERROR,
  PURCHASE_SHIPPING_REFRESH,
} from '../constants/purchaseConstants'; //selfcoded

//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Redux reducers help display the state management of the web app with requests, errors and complete
//edited
export const purchaseNewReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_NEW_REQUEST: return { loading: true };
    case PURCHASE_NEW_COMPLETE:return { loading: false, success: true, customer_purchase: action.payload };
    case PURCHASE_NEW_ERROR: return { loading: false, error: action.payload };
    case PURCHASE_NEW_REFRESH: return {};
    default: return state;
  }
};

//edited
export const purchaseInfoReducer = (state = { loading: true }, action) => {
  switch (action.type) { case PURCHASE_INFO_REQUEST: return { loading: true };
    case PURCHASE_INFO_COMPLETE: return { loading: false, customer_purchase: action.payload };
    case PURCHASE_INFO_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};

//edited
export const purchasePayPalReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_PAYPAL_REQUEST: return { loading: true };
    case PURCHASE_PAYPAL_COMPLETE: return { loading: false, success: true };
    case PURCHASE_PAYPAL_ERROR: return { loading: false, error: action.payload };
    case PURCHASE_PAYPAL_REFRESH: return {};
    default: return state;
  }
};
//edited
export const purchaseAccountHistoryReducer = (state = { ppt_orders: [] }, action) => {
  switch (action.type) {
    case PURCHASE_ACCOUNT_HISTORY_REQUEST: return { loading: true };
    case PURCHASE_ACCOUNT_HISTORY_COMPLETE: return { loading: false, ppt_orders: action.payload };
    case PURCHASE_ACCOUNT_HISTORY_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};
//edited
export const purchaseHistoryReducer = (state = { ppt_orders: [] }, action) => {
  switch (action.type) {
    case PURCHASE_HISTORY_REQUEST: return { loading: true };
    case PURCHASE_HISTORY_COMPLETE: return { loading: false, ppt_orders: action.payload };
    case PURCHASE_HISTORY_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};
//edited
export const purchaseRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_REMOVE_REQUEST: return { loading: true };
    case PURCHASE_REMOVE_COMPLETE: return { loading: false, success: true };
    case PURCHASE_REMOVE_ERROR: return { loading: false, error: action.payload };
    case PURCHASE_REMOVE_REFRESH: return {};
    default: return state;
  }
};
//edited
export const purchaseShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_SHIPPING_REQUEST: return { loading: true };
    case PURCHASE_SHIPPING_COMPLETE: return { loading: false, success: true };
    case PURCHASE_SHIPPING_ERROR: return { loading: false, error: action.payload };
    case PURCHASE_SHIPPING_REFRESH: return {};
    default: return state;
  }
};
