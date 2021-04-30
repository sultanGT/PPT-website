import Axios from 'axios';
import {
  SHOPPING_ADD_PPT_PRODUCT,
  SHOPPING_DELETE_PPT_PRODUCT,
  SHOPPING_DELIVERY_ADDRESS,
  SHOPPING_PAYPAL,
} from '../constants/cartConstants';

export const addShoppingItem = (item_id, quantity) => async (dispatch, getState) =>{
  const {data} = await Axios.get(`/api/pptitems/${item_id}`);
  dispatch({
      type: SHOPPING_ADD_PPT_PRODUCT,
      payload: {
          name: data.name,
          picture: data.picture,
          cost: data.cost,
          stock_number: data.stock_number,
          item: data._id,
          quantity,
      },
  });
  localStorage.setItem('shopping_items', JSON.stringify(getState().cart.shopping_items));
};

export const deleteShoppingItem = (item_id) => (dispatch, getState) => {
  dispatch({ type: SHOPPING_DELETE_PPT_PRODUCT, payload: item_id });
  localStorage.setItem('shopping_items', JSON.stringify(getState().cart.shopping_items));
};

export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({ type: SHOPPING_DELIVERY_ADDRESS, payload: data });
  localStorage.setItem('delivery_address', JSON.stringify(data));
};
export const savePayPal = (data) => (dispatch) => {
  dispatch({ type: SHOPPING_PAYPAL, payload: data });
};
