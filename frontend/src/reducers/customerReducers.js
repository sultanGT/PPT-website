import {
  CUSTOMER_REMOVE_ERROR,
  CUSTOMER_REMOVE_REQUEST,
  CUSTOMER_REMOVE_REFRESH,
  CUSTOMER_REMOVE_COMPLETE,
  CUSTOMER_INFO_ERROR,
  CUSTOMER_INFO_REQUEST,
  CUSTOMER_INFO_REFRESH,
  CUSTOMER_INFO_COMPLETE,
  CUSTOMER_HISTORY_ERROR,
  CUSTOMER_HISTORY_REQUEST,
  CUSTOMER_HISTORY_COMPLETE,
  CUSTOMER_SIGNUP_ERROR,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_COMPLETE,
  CUSTOMER_LOGIN_ERROR,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_COMPLETE,
  CUSTOMER_LOGOUT,
  CUSTOMER_AMMEND_ERROR,
  CUSTOMER_AMMEND_ACCOUNT_ERROR,
  CUSTOMER_AMMEND_ACCOUNT_REQUEST,
  CUSTOMER_AMMEND_ACCOUNT_REFRESH,
  CUSTOMER_AMMEND_ACCOUNT_COMPLETE,
  CUSTOMER_AMMEND_REQUEST,
  CUSTOMER_AMMEND_REFRESH,
  CUSTOMER_AMMEND_SUCCESS,
} from '../constants/customerConstants'; //selfcoded constants

//https://github.com/basir/amazona/blob/master/frontend/src/reducers/userReducers.js
//
//Reused code edited from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Reducers load requests and errors dependeing on the state that has been activated or changed
//edited
export const customerInfoReducer = (state = { loading: true }, action) => {
  switch (action.type) { 
    case CUSTOMER_INFO_REQUEST: return { loading: true };
    case CUSTOMER_INFO_COMPLETE: return { loading: false, customer: action.payload };
    case CUSTOMER_INFO_ERROR: return { loading: false, error: action.payload };
    case CUSTOMER_INFO_REFRESH: return { loading: true };
    default: return state;
  }
};

//edited
export const customerAmmendAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_AMMEND_ACCOUNT_REQUEST: return { loading: true };
    case CUSTOMER_AMMEND_ACCOUNT_COMPLETE: return { loading: false, success: true };
    case CUSTOMER_AMMEND_ACCOUNT_ERROR: return { loading: false, error: action.payload };
    case CUSTOMER_AMMEND_ACCOUNT_REFRESH: return {};
    default: return state;
  }
};
//edited
export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNUP_REQUEST: return { loading: true };
    case CUSTOMER_SIGNUP_COMPLETE:return { loading: false, userDetails: action.payload };
    case CUSTOMER_SIGNUP_ERROR: return { loading: false, error: action.payload };
    default:return state;
  }
};
//edited
export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST: return { loading: true };
    case CUSTOMER_LOGIN_COMPLETE: return { loading: false, userDetails: action.payload };
    case CUSTOMER_LOGIN_ERROR: return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT: return {};
    default: return state;
  }
};
//edited
export const customerAmmendReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_AMMEND_REQUEST:return { loading: true };
    case CUSTOMER_AMMEND_SUCCESS:return { loading: false, success: true };
    case CUSTOMER_AMMEND_ERROR:return { loading: false, error: action.payload };
    case CUSTOMER_AMMEND_REFRESH:return {};
    default:return state;
  }
};
//edited
export const customerHistoryReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CUSTOMER_HISTORY_REQUEST:return { loading: true };
    case CUSTOMER_HISTORY_COMPLETE:return { loading: false, PPTusers: action.payload };
    case CUSTOMER_HISTORY_ERROR:return { loading: false, error: action.payload };
    default:return state;
  }
};
//edited
export const customerRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REMOVE_REQUEST: return { loading: true };
    case CUSTOMER_REMOVE_COMPLETE: return { loading: false, success: true };
    case CUSTOMER_REMOVE_ERROR: return { loading: false, error: action.payload };
    case CUSTOMER_REMOVE_REFRESH: return {};
    default: return state;
  }
};

