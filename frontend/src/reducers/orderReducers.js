import {
  PURCHASE_NEW_ERROR,
  PURCHASE_NEW_REQUEST,
  ORDER_CREATE_RESET,
  PURCHASE_NEW_COMPLETE,
  PURCHASE_INFO_ERROR,
  PURCHASE_INFO_REQUEST,
  PURCHASE_INFO_COMPLETE,
  PURCHASE_ACCOUNT_HISTORY_ERROR,
  PURCHASE_ACCOUNT_HISTORY_REQUEST,
  PURCHASE_ACCOUNT_HISTORY_COMPLETE,
  PURCHASE_PAYPAL_ERROR,
  PURCHASE_PAYPAL_REQUEST,
  ORDER_PAY_RESET,
  PURCHASE_PAYPAL_COMPLETE,
  PURCHASE_HISTORY_REQUEST,
  PURCHASE_HISTORY_COMPLETE,
  PURCHASE_HISTORY_ERROR,
  PURCHASE_REMOVE_REQUEST,
  PURCHASE_REMOVE_COMPLETE,
  PURCHASE_REMOVE_ERROR,
  ORDER_DELETE_RESET,
  PURCHASE_SHIPPING_REQUEST,
  PURCHASE_SHIPPING_COMPLETE,
  PURCHASE_SHIPPING_ERROR,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_NEW_REQUEST:
      return { loading: true };
    case PURCHASE_NEW_COMPLETE:
      return { loading: false, success: true, customer_order: action.payload };
    case PURCHASE_NEW_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PURCHASE_INFO_REQUEST:
      return { loading: true };
    case PURCHASE_INFO_COMPLETE:
      return { loading: false, customer_order: action.payload };
    case PURCHASE_INFO_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_PAYPAL_REQUEST:
      return { loading: true };
    case PURCHASE_PAYPAL_COMPLETE:
      return { loading: false, success: true };
    case PURCHASE_PAYPAL_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderMineListReducer = (state = { ppt_orders: [] }, action) => {
  switch (action.type) {
    case PURCHASE_ACCOUNT_HISTORY_REQUEST:
      return { loading: true };
    case PURCHASE_ACCOUNT_HISTORY_COMPLETE:
      return { loading: false, ppt_orders: action.payload };
    case PURCHASE_ACCOUNT_HISTORY_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderListReducer = (state = { ppt_orders: [] }, action) => {
  switch (action.type) {
    case PURCHASE_HISTORY_REQUEST:
      return { loading: true };
    case PURCHASE_HISTORY_COMPLETE:
      return { loading: false, ppt_orders: action.payload };
    case PURCHASE_HISTORY_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_REMOVE_REQUEST:
      return { loading: true };
    case PURCHASE_REMOVE_COMPLETE:
      return { loading: false, success: true };
    case PURCHASE_REMOVE_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case PURCHASE_SHIPPING_REQUEST:
      return { loading: true };
    case PURCHASE_SHIPPING_COMPLETE:
      return { loading: false, success: true };
    case PURCHASE_SHIPPING_ERROR:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
