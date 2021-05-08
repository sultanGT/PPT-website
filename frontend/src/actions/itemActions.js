import Axios from 'axios';
import {
  ITEM_AMMEND_REQUEST,
  ITEM_AMMEND_COMPLETE,
  ITEM_AMMEND_ERROR,
  ITEM_REVIEW_NEW_REQUEST,
  ITEM_REVIEW_NEW_COMPLETE,
  ITEM_REVIEW_NEW_ERROR,
  ITEM_NEW_ERROR,
  ITEM_NEW_REQUEST,
  ITEM_NEW_COMPLETE,
  ITEM_REMOVE_REQUEST,
  ITEM_REMOVE_ERROR,
  ITEM_REMOVE_COMPLETE,
  ITEM_CATEGORY_FILTER_COMPLETE,
  ITEM_CATEGORY_FILTER_REQUEST,
  ITEM_CATEGORY_FILTER_ERROR,
  ITEM_INFO_ERROR,
  ITEM_INFO_REQUEST,
  ITEM_INFO_COMPLETE,
  ITEM_HISTORY_ERROR,
  ITEM_HISTORY_REQUEST,
  ITEM_HISTORY_COMPLETE,
  ITEM_BRAND_FILTER_REQUEST,
  ITEM_BRAND_FILTER_COMPLETE,
  ITEM_BRAND_FILTER_ERROR,
  ITEM_OUR_PRODUCT_FILTER_COMPLETE, 
  ITEM_OUR_PRODUCT_FILTER_ERROR, 
  ITEM_OUR_PRODUCT_FILTER_REQUEST,
} from '../constants/itemConstants'; //Self Coded

//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb
//Function to display item details using the browser URL and item attributes  - Reused code from tutorial - all names, variables, functions etc. have been optimised for the PPT website
export const displayItems = ({
  page_number = '',
  name = '',
  item_category = '',
  item_brand = '', //Self coded
  our_products = '', //Self coded
  customer_order = '',
  minimum = 0,
  maximum = 0,
  user_rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: ITEM_HISTORY_REQUEST, // Reused, edited
  });
try {
    const { data } = await Axios.get( //Self coded - item_brand - our_brand
      `/api/pptitems?page_number=${page_number}&name=${name}&item_category=${item_category}&item_brand=${item_brand}&our_products=${our_products}&minimum=${minimum} &maximum=${maximum}&user_rating=${user_rating}&customer_order=${customer_order}`
    );
    dispatch({ 
      type: ITEM_HISTORY_COMPLETE, // Reused, edited
      payload: data }); 
  } catch (error) {

    dispatch({ 
      type: ITEM_HISTORY_ERROR, // Reused, edited
      payload: error.message }); 
  }
};

//Function for displaying item categories in sidemenu, searchbar and footer 
export const displayItemCategories = () => async (dispatch) => { // Reused, edited
  dispatch({
    type: 
    ITEM_CATEGORY_FILTER_REQUEST, // Reused, edited
  });
try {
    const { data } = await Axios.get(`/api/pptitems/item_categories`); // Reused, edited
    dispatch({ 
      type: ITEM_CATEGORY_FILTER_COMPLETE, // Reused, edited
      payload: data }); 
} catch (error) {
    dispatch({ 
      type: ITEM_CATEGORY_FILTER_ERROR, // Reused, edited
      payload: error.message }); 
  }
};

//Function for displaying item brands in sidemenu, searchbar and footer - // Self coded
export const displayItemBrands = () => async (dispatch) => { // Reused, edited
dispatch({ type: ITEM_BRAND_FILTER_REQUEST, }); // Reused, edited
try {
const { data } = await Axios.get(
  `/api/pptitems/item_brands` // Reused, edited
  );
    dispatch({ type: 
      ITEM_BRAND_FILTER_COMPLETE, // Reused, edited
      payload: data 
  });
} catch (error) 
  {
    dispatch({ 
      type: ITEM_BRAND_FILTER_ERROR, // Reused, edited
      payload: 
      error.message 
    });
  }
};

//Function for displaying PPT items in sidemenu, searchbar and footer - // Self coded
export const displayOurItems = () => async (dispatch) => { 
dispatch({ type: ITEM_OUR_PRODUCT_FILTER_REQUEST, }); //
try {
const { data } = await Axios.get(
  `/api/pptitems/our_products` 
  );
    dispatch({ type: 
      ITEM_OUR_PRODUCT_FILTER_COMPLETE, // Reused, edited
      payload: data 
  });
} catch (error) 
  {
    dispatch({ 
      type: ITEM_OUR_PRODUCT_FILTER_ERROR, // Reused, edited
      payload: 
      error.message 
    });
  }
};

//Funtion for getting info of items 
export const itemInfo = (itemId) => async (dispatch) => {// Reused, edited
dispatch({ 
  type: ITEM_INFO_REQUEST, // Reused, edited
  payload: 
  itemId 
});// Reused, edited
try {
    const { data } = await Axios.get(`/api/pptitems/${itemId}`);// Reused, edited
    
    dispatch({ type: ITEM_INFO_COMPLETE, payload: data });// Reused, edited
} catch (error) {
    
  dispatch({
      type: ITEM_INFO_ERROR,// Reused, edited
      payload:
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
};

//function for admin to create new item 
export const newItem = () => async (dispatch, getState) => { // Reused, edited
dispatch({ type: ITEM_NEW_REQUEST });// Reused, edited
  const { customerLogin: { userDetails },// Reused, edited
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/pptitems',                // Reused, edited
      {},
      {
        headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
      }
    );
    dispatch({
      type: ITEM_NEW_COMPLETE,  // Reused, edited
      payload: data.item, 
    });
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ type: ITEM_NEW_ERROR, payload: message }); // Reused, edited
  }
};

//function for administrator to ammend item details
export const ammendItem = (item) => async (dispatch, getState) => { // Reused, edited
dispatch({ 
  type: ITEM_AMMEND_REQUEST, // Reused, edited
  payload: item }); // Reused, edited
const { customerLogin: { userDetails },  // Reused, edited
} = getState();
try {
    const { data } = await Axios.put(
      `/api/pptitems/${item._id}`, // Reused, edited
      item, { // Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
    });
    dispatch({ 
      type: ITEM_AMMEND_COMPLETE, // Reused, edited
      payload: data });  
  } catch (error) {
    const message =
      error.response && 
      error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ 
      type: ITEM_AMMEND_ERROR,  // Reused, edited
      error: message }); 
  }
};

//function for administrator to remove item from web app
export const removeItem = (itemId) => async (dispatch, getState) => {// Reused, edited
  dispatch({ 
    type: ITEM_REMOVE_REQUEST, // Reused, edited
    payload: itemId }); 
  const {
    customerLogin: { userDetails },  // Reused, edited
  } = getState();
  try {
    // eslint-disable-next-line
    const { data } = Axios.delete(`/api/pptitems/${itemId}`, {  // Reused, edited
      headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
  }); 
    dispatch({ 
    type: ITEM_REMOVE_COMPLETE }); // Reused, edited
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ 
      type: ITEM_REMOVE_ERROR, 
      payload: message });  // Reused, edited
  }
};

//function for creating a new customer review
export const newReview = (itemId, review) => async (  // Reused, edited
  dispatch,
  getState
) => {  
  dispatch({ 
    type: ITEM_REVIEW_NEW_REQUEST });  // Reused, edited
  const {
    customerLogin: { userDetails },  // Reused, edited
  } = getState();
  try {
    const { data } = await Axios.post(  
      `/api/pptitems/${itemId}/reviews`,  // Reused, edited
      review,
      {
        headers: { Authorization: `Bearer ${userDetails.token}` }, // Reused, edited
      } 
    );
    dispatch({
      type: ITEM_REVIEW_NEW_COMPLETE, // Reused, edited
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response 
      && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({ 
      type: ITEM_REVIEW_NEW_ERROR, 
      payload: message });  // Reused, edited
  }
};
