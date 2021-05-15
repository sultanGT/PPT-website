import Axios from 'axios';
import {
  CUSTOMER_INFO_ERROR,
  CUSTOMER_INFO_REQUEST,
  CUSTOMER_INFO_COMPLETE,
  CUSTOMER_HISTORY_REQUEST,
  CUSTOMER_HISTORY_COMPLETE,
  CUSTOMER_HISTORY_ERROR,
  CUSTOMER_SIGNUP_ERROR,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_COMPLETE,
  CUSTOMER_LOGIN_ERROR,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_COMPLETE,
  CUSTOMER_LOGOUT,
  CUSTOMER_REMOVE_REQUEST,
  CUSTOMER_REMOVE_COMPLETE,
  CUSTOMER_REMOVE_ERROR,
  CUSTOMER_AMMEND_SUCCESS,
  CUSTOMER_AMMEND_ERROR,
  CUSTOMER_AMMEND_ACCOUNT_ERROR,
  CUSTOMER_AMMEND_ACCOUNT_REQUEST,
  CUSTOMER_AMMEND_ACCOUNT_COMPLETE,
} from '../constants/customerConstants'; //Constants Self coded

// https://github.com/basir/amazona/blob/master/frontend/src/actions/userActions.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Function for customer to signup on the PPT web app - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const signup = ( name, email, password) => async (dispatch) => {//edited

dispatch({ 
  type: CUSTOMER_SIGNUP_REQUEST, // Reused, edited
  payload: { email, password } });
try {const { data } = await Axios.post('/api/PPTusers/signup', {name, email, password,}); // Reused, edited
//dispatches signup if user details is entered correctly
dispatch({ 
  type: CUSTOMER_SIGNUP_COMPLETE, // Reused, edited
  payload: data });
//dispatches login if user details is correct
dispatch({ 
  type: CUSTOMER_LOGIN_COMPLETE, // Reused, edited
  payload: data });
    
localStorage.setItem('userDetails', JSON.stringify(data)); // Reused, edited

} catch (error) {
//dispatches error if user sign up fails
dispatch({
  type: CUSTOMER_SIGNUP_ERROR,  // Reused, edited
  payload: error.response && error.response.data.message ? error.response.data.message : error.message,});
}};

//Function for customer to signip on the PPT web app - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const login = (email, password) => async (dispatch) => {

dispatch({ 
  type: CUSTOMER_LOGIN_REQUEST, // Reused, edited
  payload: { email, password } });
try { const { data } = await Axios.post('/api/PPTusers/login', { email, password }); // Reused, edited

dispatch({ type: CUSTOMER_LOGIN_COMPLETE, payload: data }); // Reused, edited
localStorage.setItem('userDetails', JSON.stringify(data)); // Reused, edited

} catch (error) {
dispatch({
  type: CUSTOMER_LOGIN_ERROR,payload: error.response && error.response.data.message ? error.response.data.message : error.message,}); // Reused, edited
}};

//Functions for removing account data from logged in session - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const logout = () => (dispatch) => {
localStorage.removeItem('userDetails');
localStorage.removeItem('shoppingItems');
localStorage.removeItem('delivery_address');

dispatch({ type: CUSTOMER_LOGOUT }); // Reused, edited
document.location.href = '/signup';
};

//Function for getting customer info - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const customerInfo = (customerId) => async (dispatch, getState) => {
dispatch({ 
  type: CUSTOMER_INFO_REQUEST, // Reused, edited
  payload: customerId }); // Reused, edited
const { customerLogin: { userDetails }, } = getState();

try { 

const { data } = await Axios.get(`/api/PPTusers/${customerId}`, { // Reused, edited
headers: { Authorization: `Bearer ${userDetails.token}` },}); // Reused, edited

dispatch({ 
  type: CUSTOMER_INFO_COMPLETE, // Reused, edited
  payload: data });
} catch (error) {

//Send Error message if cannot find customer info - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
const message = error.response && error.response.data.message ? error.response.data.message : error.message;

dispatch({ type: CUSTOMER_INFO_ERROR, payload: message });}}; // Reused, edited

//Function for updating customers account details - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const amendCustomerAccount = (customer) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_REQUEST, payload: customer });
  const { customerLogin: { userDetails }, } = getState();
  try {
  const { data } = await Axios.put(`/api/PPTusers/credentials`, customer, { headers: // Reused, edited
    { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
    });
    dispatch({ 
      type: CUSTOMER_AMMEND_ACCOUNT_COMPLETE, // Reused, edited
      payload: data });

    dispatch({ 
      type: CUSTOMER_LOGIN_COMPLETE, // Reused, edited
      payload: data });
      localStorage.setItem('userDetails', JSON.stringify(data));
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message: error.message;

    dispatch({ 
      type: CUSTOMER_AMMEND_ACCOUNT_ERROR, // Reused, edited
      payload: message });
  }
};

//Function for amending customers account details - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const amendCustomer = (customer) => async (dispatch, getState) => {
  dispatch({ type: 
    CUSTOMER_AMMEND_ACCOUNT_REQUEST, // Reused, edited
    payload: customer }); // Reused, edited
  const { customerLogin: { userDetails },} = getState(); // Reused, edited
  try {
    const { data } = await Axios.put(`/api/PPTusers/${customer._id}`, // Reused, edited
    customer, { headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
    });

    dispatch({ type: 
      CUSTOMER_AMMEND_SUCCESS, // Reused, edited
      payload: data });
    } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message: error.message;
    dispatch({ 
      type: CUSTOMER_AMMEND_ERROR, // Reused, edited
      payload: message });
  }
};

////Function for displaying customers on PPT web app - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const customerHistory = () => async (dispatch, getState) => {
  dispatch({ 
    type: CUSTOMER_HISTORY_REQUEST }); // Reused, edited
  try {
    const { customerLogin: { userDetails },} = getState(); // Reused, edited
    const { data } = await Axios.get('/api/PPTusers', { // Reused, edited
    headers: { Authorization: `Bearer ${userDetails.token}`,}, // Reused, edited
    });

    dispatch({ 
      type: CUSTOMER_HISTORY_COMPLETE, // Reused, edited
      payload: data 
    });
  } catch (error) {
    const message =
    error.response && error.response.data.message ? error.response.data.message: error.message;
    dispatch({ type: CUSTOMER_HISTORY_ERROR, payload: message }); // Reused, edited
  }
};

//FUnction for admin to remove a user - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const removeCustomer = (customerId) => async (dispatch, getState) => { // Reused, edited
  dispatch({ type: CUSTOMER_REMOVE_REQUEST, payload: customerId }); // Reused, edited
  const {
    customerLogin: { userDetails }, // Reused, edited
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/PPTusers/${customerId}`, { // Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` },// Reused, edited
    });
    dispatch({ type: CUSTOMER_REMOVE_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: CUSTOMER_REMOVE_ERROR, payload: message });// Reused, edited
  }
};

