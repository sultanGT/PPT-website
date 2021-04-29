import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const addToCart = (item_id, quantity) => async (dispatch, getState) =>{
  const {data} = await Axios.get(`/api/pptitems/${item_id}`);
  dispatch({
      type: CART_ADD_ITEM,
      payload: {
          name: data.name,
          picture: data.picture,
          cost: data.cost,
          stock_number: data.stock_number,
          item: data._id,
          quantity,
      },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item_id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: item_id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('delivery_address', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
