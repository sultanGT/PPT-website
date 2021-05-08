import Axios from 'axios';
import {
  PURCHASE_NEW_ERROR,PURCHASE_NEW_REQUEST,PURCHASE_NEW_COMPLETE,
  PURCHASE_PAYPAL_REQUEST,PURCHASE_PAYPAL_ERROR,
  PURCHASE_PAYPAL_COMPLETE,
  PURCHASE_REMOVE_REQUEST,
  PURCHASE_REMOVE_COMPLETE,
  PURCHASE_REMOVE_ERROR,
  PURCHASE_SHIPPING_REQUEST,
  PURCHASE_SHIPPING_COMPLETE,
  PURCHASE_SHIPPING_ERROR,
  PURCHASE_ACCOUNT_HISTORY_REQUEST,
  PURCHASE_ACCOUNT_HISTORY_ERROR,
  PURCHASE_ACCOUNT_HISTORY_COMPLETE,
  PURCHASE_HISTORY_REQUEST,
  PURCHASE_HISTORY_COMPLETE,
  PURCHASE_HISTORY_ERROR,
  PURCHASE_INFO_ERROR,
  PURCHASE_INFO_REQUEST,
  PURCHASE_INFO_COMPLETE,
} from '../constants/purchaseConstants'; //Self Coded
import { 
  SHOPPING_NO_ITEMS //Self Coded
} from '../constants/shoppingConstants';

//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
// function for a new customer purchase - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const newPurchase = (customer_purchase) => async (dispatch, getState) => { // Reused, edited
dispatch({ type: PURCHASE_NEW_REQUEST, payload: customer_purchase }); // Reused, edited
  try {
    const {
      customerLogin: { userDetails }, // Reused, edited
    } = getState();
    const { data } = await Axios.post('/api/pptpuchase', customer_purchase, { // Reused, edited
      headers: {
        Authorization: `Bearer ${userDetails.token}`, // Reused, edited
      },
    });
dispatch({ 
      type: PURCHASE_NEW_COMPLETE, // Reused, edited
      payload: data.customer_purchase }); // Reused, edited
dispatch({ 
      type: SHOPPING_NO_ITEMS // Reused, edited
    });
    localStorage.removeItem('shoppingItems'); // Reused, edited
  } catch (error) {
dispatch({
      type: PURCHASE_NEW_ERROR, // Reused, edited
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
    : error.message,
    });
  }
};

//Function to find purchase details of customer order - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const purchaseInfo = (purchaseId) => async (dispatch, getState) => { // Reused, edited
dispatch({ 
  type: PURCHASE_INFO_REQUEST, payload: purchaseId }); // Reused, edited
  const {
    customerLogin: { userDetails }, // Reused, edited
  } = getState();
  try {
    const { data } = await Axios.get(`/api/pptpuchase/${purchaseId}`, { // Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
    });
dispatch({ 
  type: PURCHASE_INFO_COMPLETE, payload: data }); // Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
dispatch({ type: PURCHASE_INFO_ERROR, payload: message }); // Reused, edited
  }
};

//Funcion to make payment with PayPal API and customer puchase info - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const purchasePayPal = (customer_purchase, purchase_complete) => async ( // Reused, edited
  dispatch,
  getState
) => {
dispatch({ 
  type: PURCHASE_PAYPAL_REQUEST, payload: { customer_purchase, purchase_complete } }); // Reused, edited
  const {
    customerLogin: { userDetails }, // Reused, edited
  } = getState();
  try {
    const { data } = Axios.put(`/api/pptpuchase/${customer_purchase._id}/payment`, purchase_complete, { // Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
    });
dispatch({ type: PURCHASE_PAYPAL_COMPLETE, payload: data }); // Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
dispatch({ type: PURCHASE_PAYPAL_ERROR, payload: message }); // Reused, edited
  }
};

//
export const accountHistory = () => async (dispatch, getState) => { // Reused, edited
dispatch({ 
  type: PURCHASE_ACCOUNT_HISTORY_REQUEST }); // Reused, edited
  const {
  customerLogin: { userDetails },// Reused, edited
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase/myaccount', {// Reused, edited
      headers: {
        Authorization: `Bearer ${userDetails.token}`,// Reused, edited
      },
    });
dispatch({ 
  type: PURCHASE_ACCOUNT_HISTORY_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
dispatch({ 
  type: PURCHASE_ACCOUNT_HISTORY_ERROR, payload: message });// Reused, edited
  }
};

//
export const puchasesHistory = () => async (dispatch, getState) => {
dispatch({ 
  type: PURCHASE_HISTORY_REQUEST });// Reused, edited
  const {
    customerLogin: { userDetails },// Reused, edited
  } = getState();
  try {
    const { data } = await Axios.get('/api/pptpuchase', {// Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` }
    });
console.log(data);
dispatch({ 
  type: PURCHASE_HISTORY_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
dispatch({ 
  type: PURCHASE_HISTORY_ERROR, payload: message }); // Reused, edited
  }
};
//
export const removePurchase = (purchaseId) => async (dispatch, getState) => {// Reused, edited
dispatch({ 
  type: PURCHASE_REMOVE_REQUEST, payload: purchaseId });// Reused, edited
  const {
    customerLogin: { userDetails },// Reused, edited
  } = getState();
  try {
    const { data } = Axios.delete(`/api/pptpuchase/${purchaseId}`, {// Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` },// Reused, edited
    });
dispatch({ 
  type: PURCHASE_REMOVE_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
 dispatch({ type: PURCHASE_REMOVE_ERROR, payload: message }); // Reused, edited
  }
};

//
export const shippingPurchase = (purchaseId) => async (dispatch, getState) => { // Reused, edited
  dispatch({ type: PURCHASE_SHIPPING_REQUEST, payload: purchaseId });// Reused, edited
  const {
    customerLogin: { userDetails },// Reused, edited
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/pptpuchase/${purchaseId}/deliver`,// Reused, edited
      {},
      {
        headers: { Authorization: `Bearer ${userDetails.token}` },// Reused, edited
      }
    );
    dispatch({ 
      type: PURCHASE_SHIPPING_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: PURCHASE_SHIPPING_ERROR, payload: message }); // Reused, edited
  }
};

