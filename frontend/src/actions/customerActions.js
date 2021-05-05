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
} from '../constants/userConstants'; //Self coded

//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Function for customer to signup on the PPT web app - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const signup = ( // Reused, edited
  name, 
  email, 
  password) => async (dispatch) => {

dispatch({ 
  type: CUSTOMER_SIGNUP_REQUEST, // Reused, edited
  payload: { email, password } });
try {const { data } = await Axios.post('/api/pptusers/signup', {name, email, password,}); // Reused, edited

dispatch({ 
  type: CUSTOMER_SIGNUP_COMPLETE, // Reused, edited
  payload: data });

dispatch({ 
  type: CUSTOMER_LOGIN_COMPLETE, // Reused, edited
  payload: data });
    
localStorage.setItem('pptUserDetails', JSON.stringify(data)); // Reused, edited

} catch (error) {

dispatch({
  type: CUSTOMER_SIGNUP_ERROR,  // Reused, edited
  payload: error.response 
  && error.response.data.message 
  ? error.response.data.message 
  : error.message,});
}};

//Function for customer to signip on the PPT web app - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const login = (email, password) => async (dispatch) => {

dispatch({ 
  type: CUSTOMER_LOGIN_REQUEST, // Reused, edited
  payload: { email, password } });
try { const { data } = await Axios.post('/api/pptusers/login', { email, password }); // Reused, edited

dispatch({ type: CUSTOMER_LOGIN_COMPLETE, payload: data }); // Reused, edited
localStorage.setItem('pptUserDetails', JSON.stringify(data)); // Reused, edited

} catch (error) {
dispatch({
  type: CUSTOMER_LOGIN_ERROR, // Reused, edited
  payload: error.response 
  && error.response.data.message 
  ? error.response.data.message 
  : error.message,});
}};

//Functions for removing account data from logged in session - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const logout = () => (dispatch) => {
localStorage.removeItem('pptUserDetails');
localStorage.removeItem('shoppingItems');
localStorage.removeItem('delivery_address');

dispatch({ type: CUSTOMER_LOGOUT }); // Reused, edited

document.location.href = '/';
};

//Function for getting customer info - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const customerInfo = (customerId) => async (dispatch, getState) => {
dispatch({ 
  type: CUSTOMER_INFO_REQUEST, // Reused, edited
  payload: customerId }); // Reused, edited
const { customerLogin: { pptUserDetails }, } = getState();

try { 

const { data } = await Axios.get(`/api/pptusers/${customerId}`, { // Reused, edited
headers: { Authorization: `Bearer ${pptUserDetails.token}` },}); // Reused, edited

dispatch({ 
  type: CUSTOMER_INFO_COMPLETE, // Reused, edited
  payload: data });
} catch (error) {

//Send Error message if cannot find customer info - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
const message = 
error.response && error.response.data.message 
? error.response.data.message : error.message;

dispatch({ type: CUSTOMER_INFO_ERROR, payload: message });}}; // Reused, edited

//Function for updating customers account details - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const ammendCustomerAccount = (pptuser) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_REQUEST, payload: pptuser });
  const { customerLogin: { pptUserDetails }, } = getState();
  
  try {
  const { data } = await Axios.put(`/api/pptusers/credentials`, pptuser, { headers: // Reused, edited
    { Authorization: `Bearer ${pptUserDetails.token}` }, // Reused, edited
    });

    dispatch({ 
      type: CUSTOMER_AMMEND_ACCOUNT_COMPLETE, // Reused, edited
      payload: data });

    dispatch({ 
      type: CUSTOMER_LOGIN_COMPLETE, // Reused, edited
      payload: data });
      localStorage.setItem('pptUserDetails', JSON.stringify(data));
  } catch (error) {
    const message = 
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({ 
      type: CUSTOMER_AMMEND_ACCOUNT_ERROR, // Reused, edited
      payload: message });
  }
};

//Function for ammending customers account details - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const ammendCustomer = (pptuser) => async (dispatch, getState) => {
  dispatch({ type: 
    CUSTOMER_AMMEND_ACCOUNT_REQUEST, // Reused, edited
    payload: pptuser }); // Reused, edited
  const { customerLogin: { pptUserDetails },} = getState(); // Reused, edited
  try {
    const { data } = await Axios.put(`/api/pptusers/${pptuser._id}`, // Reused, edited
    pptuser, { headers: { Authorization: `Bearer ${pptUserDetails.token}` }, // Reused, edited
    });

    dispatch({ type: 
      CUSTOMER_AMMEND_SUCCESS, // Reused, edited
      payload: data });
    } catch (error) {
    const message = 
      error.response 
       && error.response.data.message
       ? error.response.data.message
       : error.message;

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
    const { customerLogin: { pptUserDetails },} = getState(); // Reused, edited
    const { data } = await Axios.get('/api/pptusers', { // Reused, edited
    headers: { Authorization: `Bearer ${pptUserDetails.token}`,}, // Reused, edited
    });

    dispatch({ 
      type: CUSTOMER_HISTORY_COMPLETE, // Reused, edited
      payload: data 
    });
  } catch (error) {
    const message =
    error.response 
    && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({ type: CUSTOMER_HISTORY_ERROR, payload: message }); // Reused, edited
  }
};

//FUnction for admin to remove a user - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const removeCustomer = (customerId) => async (dispatch, getState) => { // Reused, edited
  dispatch({ type: CUSTOMER_REMOVE_REQUEST, payload: customerId }); // Reused, edited
  const {
    customerLogin: { pptUserDetails }, // Reused, edited
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/pptusers/${customerId}`, { // Reused, edited
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },// Reused, edited
    });
    dispatch({ type: CUSTOMER_REMOVE_COMPLETE, payload: data });// Reused, edited
  } catch (error) {
    const message =
    error.response 
    && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({ type: CUSTOMER_REMOVE_ERROR, payload: message });// Reused, edited
  }
};

