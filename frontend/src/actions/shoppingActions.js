import Axios from '../pages/axios';
import {
  SHOPPING_ADD_PRODUCT,
  SHOPPING_REMOVE_PRODUCT,
  SHOPPING_DELIVERY_ADDRESS,
  SHOPPING_PAYPAL,
} from '../constants/cartConstants';

//
export const addShoppingItem = (itemId, quantity) => async (dispatch, getState) =>{
  const {data} = await Axios.get(`/api/pptitems/${itemId}`);
  dispatch({
      type: SHOPPING_ADD_PRODUCT,
      payload: {
          name: data.name,
          picture: data.picture,
          cost: data.cost,
          stock_number: data.stock_number,
          item: data._id,
          quantity,
      },
  });
  localStorage.setItem('shoppingItems', JSON.stringify(getState().shopping.shoppingItems));
};
//
export const deleteShoppingItem = (itemId) => (dispatch, getState) => {
  dispatch({ type: SHOPPING_REMOVE_PRODUCT, payload: itemId });
  localStorage.setItem('shoppingItems', JSON.stringify(getState().shopping.shoppingItems));
};
//
export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({ type: SHOPPING_DELIVERY_ADDRESS, payload: data });
  localStorage.setItem('delivery_address', JSON.stringify(data));
};
//
export const savePayPal = (data) => (dispatch) => {
  dispatch({ type: SHOPPING_PAYPAL, payload: data });
};
