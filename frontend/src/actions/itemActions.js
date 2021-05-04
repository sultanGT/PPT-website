import Axios from '../pages/axios';
import {
  ITEM_NEW_ERROR,
  ITEM_NEW_REQUEST,
  ITEM_NEW_COMPLETE,
  ITEM_INFO_ERROR,
  ITEM_INFO_REQUEST,
  ITEM_INFO_COMPLETE,
  ITEM_HISTORY_ERROR,
  ITEM_HISTORY_REQUEST,
  ITEM_HISTORY_COMPLETE,
  ITEM_AMMEND_REQUEST,
  ITEM_AMMEND_COMPLETE,
  ITEM_AMMEND_ERROR,
  ITEM_REMOVE_REQUEST,
  ITEM_REMOVE_ERROR,
  ITEM_REMOVE_COMPLETE,
  ITEM_CATEGORY_FILTER_COMPLETE,
  ITEM_CATEGORY_FILTER_REQUEST,
  ITEM_CATEGORY_FILTER_ERROR,
  ITEM_REVIEW_NEW_REQUEST,
  ITEM_REVIEW_NEW_COMPLETE,
  ITEM_REVIEW_NEW_ERROR,
  ITEM_BRAND_FILTER_REQUEST,
  ITEM_BRAND_FILTER_COMPLETE,
  ITEM_BRAND_FILTER_ERROR,
} from '../constants/productConstants';

//
export const displayItems = ({
  page_number = '',
  name = '',
  item_category = '',
  item_brand = '',
  customer_order = '',
  minimum = 0,
  maximum = 0,
  user_rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: ITEM_HISTORY_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/pptitems?page_number=${page_number}&name=${name}&item_category=${item_category}&item_brand=${item_brand}&minimum=${minimum}&maximum=${maximum}&user_rating=${user_rating}&customer_order=${customer_order}`
    );
    dispatch({ type: ITEM_HISTORY_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_HISTORY_ERROR, payload: error.message });
  }
};


//
export const displayItemCategories = () => async (dispatch) => {
  dispatch({
    type: ITEM_CATEGORY_FILTER_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/pptitems/item_categories`);
    dispatch({ type: ITEM_CATEGORY_FILTER_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_CATEGORY_FILTER_ERROR, payload: error.message });
  }
};

//
export const displayItemBrands = () => async (dispatch) => {
  dispatch({
    type: ITEM_BRAND_FILTER_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/pptitems/item_brands`);
    dispatch({ type: ITEM_BRAND_FILTER_COMPLETE, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_BRAND_FILTER_ERROR, payload: error.message });
  }
};

//
export const itemInfo = (itemId) => async (dispatch) => {
  dispatch({ type: ITEM_INFO_REQUEST, payload: itemId });
  try {
    const { data } = await Axios.get(`/api/pptitems/${itemId}`);
    dispatch({ type: ITEM_INFO_COMPLETE, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_INFO_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//
export const newItem = () => async (dispatch, getState) => {
  dispatch({ type: ITEM_NEW_REQUEST });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/pptitems',
      {},
      {
        headers: { Authorization: `Bearer ${pptUserDetails.token}` },
      }
    );
    dispatch({
      type: ITEM_NEW_COMPLETE,
      payload: data.item,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_NEW_ERROR, payload: message });
  }
};

//
export const ammendItem = (item) => async (dispatch, getState) => {
  dispatch({ type: ITEM_AMMEND_REQUEST, payload: item });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/pptitems/${item._id}`, item, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: ITEM_AMMEND_COMPLETE, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_AMMEND_ERROR, error: message });
  }
};

//
export const removeItem = (itemId) => async (dispatch, getState) => {
  dispatch({ type: ITEM_REMOVE_REQUEST, payload: itemId });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    // eslint-disable-next-line
    const { data } = Axios.delete(`/api/pptitems/${itemId}`, {
      headers: { Authorization: `Bearer ${pptUserDetails.token}` },
    });
    dispatch({ type: ITEM_REMOVE_COMPLETE });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_REMOVE_ERROR, payload: message });
  }
};

//
export const newReview = (itemId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ITEM_REVIEW_NEW_REQUEST });
  const {
    customerLogin: { pptUserDetails },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/pptitems/${itemId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${pptUserDetails.token}` },
      }
    );
    dispatch({
      type: ITEM_REVIEW_NEW_COMPLETE,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ITEM_REVIEW_NEW_ERROR, payload: message });
  }
};
