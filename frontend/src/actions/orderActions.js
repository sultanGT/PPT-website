import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  PURCHASE_NEW_ERROR,
  PURCHASE_NEW_REQUEST,
  PURCHASE_NEW_COMPLETE,
  PURCHASE_INFO_ERROR,
  PURCHASE_INFO_REQUEST,
  PURCHASE_INFO_COMPLETE,
  PURCHASE_PAYPAL_REQUEST,
  PURCHASE_PAYPAL_ERROR,
  PURCHASE_PAYPAL_COMPLETE,
  PURCHASE_ACCOUNT_HISTORY_REQUEST,
  PURCHASE_ACCOUNT_HISTORY_ERROR,
  PURCHASE_ACCOUNT_HISTORY_COMPLETE,
  PURCHASE_HISTORY_REQUEST,
  PURCHASE_HISTORY_COMPLETE,
  PURCHASE_HISTORY_ERROR,
  PURCHASE_REMOVE_REQUEST,
  PURCHASE_REMOVE_COMPLETE,
  PURCHASE_REMOVE_ERROR,
  PURCHASE_SHIPPING_REQUEST,
  PURCHASE_SHIPPING_COMPLETE,
  PURCHASE_SHIPPING_ERROR,
} from '../constants/orderConstants';

export const createOrder = (customer_order) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_NEW_REQUEST, payload: customer_order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/pptpuchase', customer_order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PURCHASE_NEW_COMPLETE, payload: data.customer_order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('shopping_items');
  } catch (error) {
    dispatch({
      type: PURCHASE_NEW_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_INFO_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/pptpuchase/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PURCHASE_INFO_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_INFO_ERROR, payload: message });
  }
};

export const payOrder = (customer_order, purchase_complete) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PURCHASE_PAYPAL_REQUEST, payload: { customer_order, purchase_complete } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/pptpuchase/${customer_order._id}/payment`, purchase_complete, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PURCHASE_PAYPAL_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_PAYPAL_ERROR, payload: message });
  }
};
export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_ACCOUNT_HISTORY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase/myaccount', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PURCHASE_ACCOUNT_HISTORY_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_ACCOUNT_HISTORY_ERROR, payload: message });
  }
};
export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_HISTORY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: PURCHASE_HISTORY_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_HISTORY_ERROR, payload: message });
  }
};
export const remove_order = (orderId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_REMOVE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/pptpuchase/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PURCHASE_REMOVE_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_REMOVE_ERROR, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_SHIPPING_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/pptpuchase/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PURCHASE_SHIPPING_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PURCHASE_SHIPPING_ERROR, payload: message });
  }
};
