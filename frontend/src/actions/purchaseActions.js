import Axios from 'axios';
import { SHOPPING_NO_ITEMS } from '../constants/cartConstants';
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

//
export const newPurchase = (customer_order) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_NEW_REQUEST, payload: customer_order });
  try {
    const {
      customerLogin: { pptUserDetails },
    } = getState();
    const { data } = await Axios.post('/api/pptpuchase', customer_order, {
      headers: {
        Authorization: `Bearer ${pptUserDetails.token}`,
      },
    });
    dispatch({ type: PURCHASE_NEW_COMPLETE, payload: data.customer_order });
    dispatch({ type: SHOPPING_NO_ITEMS });
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

//
export const purchaseInfo = (purchaseId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_INFO_REQUEST, payload: purchaseId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/pptpuchase/${purchaseId}`, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
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

//
export const purchasePayPal = (customer_order, purchase_complete) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PURCHASE_PAYPAL_REQUEST, payload: { customer_order, purchase_complete } });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = Axios.put(`/api/pptpuchase/${customer_order._id}/payment`, purchase_complete, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
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

//
export const accountHistory = () => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_ACCOUNT_HISTORY_REQUEST });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase/myaccount', {
      headers: {
        Authorization: `Bearer ${pptUserDetails.token}`,
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

//
export const puchasesHistory = () => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_HISTORY_REQUEST });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase', {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
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
//
export const removePurchase = (purchaseId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_REMOVE_REQUEST, payload: purchaseId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/pptpuchase/${purchaseId}`, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
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

//
export const shippingPurchase = (purchaseId) => async (dispatch, getState) => {
  dispatch({ type: PURCHASE_SHIPPING_REQUEST, payload: purchaseId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/pptpuchase/${purchaseId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${pptUserDetails.token}` },
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
