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
  CUSTOMER_AMMEND_PROFILE_REFRESH,
  CUSTOMER_AMMEND_ACCOUNT_COMPLETE,
  USER_UPDATE_REQUEST,
  CUSTOMER_AMMEND_REFRESH,
  CUSTOMER_AMMEND_SUCCESS,
} from '../constants/customerConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNUP_REQUEST:
      return { loading: true };
    case CUSTOMER_SIGNUP_COMPLETE:
      return { loading: false, pptUserDetails: action.payload };
    case CUSTOMER_SIGNUP_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_LOGIN_REQUEST:
      return { loading: true };
    case CUSTOMER_LOGIN_COMPLETE:
      return { loading: false, pptUserDetails: action.payload };
    case CUSTOMER_LOGIN_ERROR:
      return { loading: false, error: action.payload };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CUSTOMER_INFO_REQUEST:
      return { loading: true };
    case CUSTOMER_INFO_COMPLETE:
      return { loading: false, pptuser: action.payload };
    case CUSTOMER_INFO_ERROR:
      return { loading: false, error: action.payload };
    case CUSTOMER_INFO_REFRESH:
      return { loading: true };
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_AMMEND_ACCOUNT_REQUEST:
      return { loading: true };
    case CUSTOMER_AMMEND_ACCOUNT_COMPLETE:
      return { loading: false, success: true };
    case CUSTOMER_AMMEND_ACCOUNT_ERROR:
      return { loading: false, error: action.payload };
    case CUSTOMER_AMMEND_PROFILE_REFRESH:
      return {};
    default:
      return state;
  }
};
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case CUSTOMER_AMMEND_SUCCESS:
      return { loading: false, success: true };
    case CUSTOMER_AMMEND_ERROR:
      return { loading: false, error: action.payload };
    case CUSTOMER_AMMEND_REFRESH:
      return {};
    default:
      return state;
  }
};
export const userListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CUSTOMER_HISTORY_REQUEST:
      return { loading: true };
    case CUSTOMER_HISTORY_COMPLETE:
      return { loading: false, pptusers: action.payload };
    case CUSTOMER_HISTORY_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CUSTOMER_REMOVE_REQUEST:
      return { loading: true };
    case CUSTOMER_REMOVE_COMPLETE:
      return { loading: false, success: true };
    case CUSTOMER_REMOVE_ERROR:
      return { loading: false, error: action.payload };
    case CUSTOMER_REMOVE_REFRESH:
      return {};
    default:
      return state;
  }
};

