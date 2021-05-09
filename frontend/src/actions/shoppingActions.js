import Axios from 'axios';
import {
  SHOPPING_ADD_PRODUCT,
  SHOPPING_REMOVE_PRODUCT,
  SHOPPING_DELIVERY_ADDRESS,
  SHOPPING_PAYPAL,
} from '../constants/shoppingConstants'; //Constants self coded

//https://github.com/basir/amazona/blob/master/frontend/src/actions/cartActions.js
// Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
// function for to add item to shopping basket - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const addShoppingItem = (itemId, quantity) => async (dispatch, getState) =>{ // Reused, edited
  const {data} = await Axios.get(
    `/api/pptitems/${itemId}`// Reused, edited
    ); 
  dispatch({
  type: SHOPPING_ADD_PRODUCT, // Reused, edited
  payload: {name: data.name,picture: data.picture, cost: data.cost, stock_number: data.stock_number, item: data._id, quantity,},
  });
  localStorage.setItem('shoppingItems', JSON.stringify(getState().shopping.shoppingItems)); // Reused, edited
};
//Function to remove item from shoppingbasket
export const deleteShoppingItem = (itemId) => (dispatch, getState) => {// Reused, edited
  dispatch({ 
    type: SHOPPING_REMOVE_PRODUCT, // Reused, edited
    payload: itemId }); 
  localStorage.setItem('shoppingItems', // Reused, edited
  JSON.stringify(getState().shopping.shoppingItems)); // Reused, edited
};
//
export const saveDeliveryAddress = (data) => (dispatch) => {
  dispatch({ 
    type: SHOPPING_DELIVERY_ADDRESS, // Reused, edited
    payload: data }); 
  localStorage.setItem('delivery_address', // Reused, edited
  JSON.stringify(data)); // Reused, edited
};
//
export const savePayPal = (data) => (dispatch) => { // Reused, edited
  dispatch({ 
    type: SHOPPING_PAYPAL, // Reused, edited
    payload: data });
};
