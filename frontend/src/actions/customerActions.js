import Axios from '../pages/axios';
import {
  CUSTOMER_INFO_ERROR,
  CUSTOMER_INFO_REQUEST,
  CUSTOMER_INFO_COMPLETE,
  CUSTOMER_SIGNUP_ERROR,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_COMPLETE,
  CUSTOMER_LOGIN_ERROR,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_COMPLETE,
  CUSTOMER_LOGOUT,
  CUSTOMER_AMMEND_ACCOUNT_ERROR,
  CUSTOMER_AMMEND_ACCOUNT_REQUEST,
  CUSTOMER_AMMEND_ACCOUNT_COMPLETE,
  CUSTOMER_HISTORY_REQUEST,
  CUSTOMER_HISTORY_COMPLETE,
  CUSTOMER_HISTORY_ERROR,
  CUSTOMER_REMOVE_REQUEST,
  CUSTOMER_REMOVE_COMPLETE,
  CUSTOMER_REMOVE_ERROR,
  CUSTOMER_AMMEND_SUCCESS,
  CUSTOMER_AMMEND_ERROR,
} from '../constants/userConstants';

//
export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: CUSTOMER_SIGNUP_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/pptusers/signup', {
      name,
      email,
      password,
    });
    dispatch({ type: CUSTOMER_SIGNUP_COMPLETE, payload: data });
    dispatch({ type: CUSTOMER_LOGIN_COMPLETE, payload: data });
    localStorage.setItem('pptUserDetails', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_SIGNUP_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: CUSTOMER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/pptusers/login', { email, password });
    dispatch({ type: CUSTOMER_LOGIN_COMPLETE, payload: data });
    localStorage.setItem('pptUserDetails', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//
export const logout = () => (dispatch) => {
  localStorage.removeItem('pptUserDetails');
  localStorage.removeItem('shoppingItems');
  localStorage.removeItem('delivery_address');
  dispatch({ type: CUSTOMER_LOGOUT });
  document.location.href = '/';
};

//
export const customerInfo = (customerId) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_INFO_REQUEST, payload: customerId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/pptusers/${customerId}`, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: CUSTOMER_INFO_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_INFO_ERROR, payload: message });
  }
};

//
export const ammendCustomerAccount = (pptuser) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_REQUEST, payload: pptuser });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/pptusers/credentials`, pptuser, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_COMPLETE, payload: data });
    dispatch({ type: CUSTOMER_LOGIN_COMPLETE, payload: data });
    localStorage.setItem('pptUserDetails', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_ERROR, payload: message });
  }
};

//
export const ammendCustomer = (pptuser) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_AMMEND_ACCOUNT_REQUEST, payload: pptuser });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/pptusers/${pptuser._id}`, pptuser, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: CUSTOMER_AMMEND_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_AMMEND_ERROR, payload: message });
  }
};
//
export const customerHistory = () => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_HISTORY_REQUEST });
  try {
    const {
      customerLogin: { pptUserDetails },
    } = getState();
    const { data } = await Axios.get('/api/pptusers', {
      headers: {
        Authorization: `Bearer ${pptUserDetails.token}`,
      },
    });
    dispatch({ type: CUSTOMER_HISTORY_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_HISTORY_ERROR, payload: message });
  }
};

//
export const removeCustomer = (customerId) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_REMOVE_REQUEST, payload: customerId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/pptusers/${customerId}`, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: CUSTOMER_REMOVE_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_REMOVE_ERROR, payload: message });
  }
};
