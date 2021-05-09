const {
  ITEM_HISTORY_REQUEST,
  ITEM_HISTORY_COMPLETE,
  ITEM_HISTORY_ERROR,
  ITEM_INFO_REQUEST,
  ITEM_INFO_COMPLETE,
  ITEM_INFO_ERROR,
  ITEM_NEW_REQUEST,
  ITEM_NEW_COMPLETE,
  ITEM_NEW_ERROR,
  ITEM_CREATE_REFRESH,
  ITEM_AMMEND_REQUEST,
  ITEM_AMMEND_COMPLETE,
  ITEM_AMMEND_ERROR,
  ITEM_AMMEND_REFRESH,
  ITEM_OUR_PRODUCT_FILTER_REQUEST,
  ITEM_OUR_PRODUCT_FILTER_COMPLETE,
  ITEM_OUR_PRODUCT_FILTER_ERROR,
  ITEM_REMOVE_REQUEST,
  ITEM_REMOVE_COMPLETE,
  ITEM_REMOVE_ERROR,
  ITEM_REMOVE_REFRESH,
  ITEM_CATEGORY_FILTER_REQUEST,
  ITEM_CATEGORY_FILTER_COMPLETE,
  ITEM_CATEGORY_FILTER_ERROR,
  ITEM_BRAND_FILTER_REQUEST,
  ITEM_BRAND_FILTER_COMPLETE,
  ITEM_BRAND_FILTER_ERROR,
  ITEM_REVIEW_NEW_REQUEST,
  ITEM_REVIEW_NEW_COMPLETE,
  ITEM_REVIEW_NEW_ERROR,
  ITEM_REVIEW_CREATE_REFRESH,
} = require('../constants/itemConstants'); //Constants self coded

//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Redux reducers help display the state management of the web app with requests, errors and complete
//edited
//edited
export const itemCategoryListReducer = (
  state = { loading: true, PPTitems: [] }, action ) => {
  switch (action.type) {
    case ITEM_CATEGORY_FILTER_REQUEST: return { loading: true };
    case ITEM_CATEGORY_FILTER_COMPLETE: return { loading: false, categories: action.payload };
    case ITEM_CATEGORY_FILTER_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};
//self coded
export const itemBrandListReducer = (
  state = { loading: true, PPTitems: [] }, action) => {
  switch (action.type) { case ITEM_BRAND_FILTER_REQUEST: return { loading: true };
    case ITEM_BRAND_FILTER_COMPLETE: return { loading: false, brands: action.payload };
    case ITEM_BRAND_FILTER_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};
//edited
export const itemAmmendReducer = (state = {}, action) => {// reused edited
  switch (action.type) {case ITEM_AMMEND_REQUEST:// reused edited
      return { loading: true }; case ITEM_AMMEND_COMPLETE:// reused edited
      return { loading: false, success: true };
    case ITEM_AMMEND_ERROR: return { loading: false, error: action.payload };// reused edited
    case ITEM_AMMEND_REFRESH: return {};// reused edited
    default: return state;
  }
};

//edited
export const itemRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_REMOVE_REQUEST: return { loading: true };
    case ITEM_REMOVE_COMPLETE: return { loading: false, success: true };
    case ITEM_REMOVE_ERROR: return { loading: false, error: action.payload };
    case ITEM_REMOVE_REFRESH:return {};
    default:return state;
  }
};
//self coded
export const itemOurProductReducer = (
  state = { loading: true, PPTitems: [] },action
) => {
  switch (action.type) { case ITEM_OUR_PRODUCT_FILTER_REQUEST: return { loading: true };
    case ITEM_OUR_PRODUCT_FILTER_COMPLETE: return { loading: false, our_products: action.payload };
    case ITEM_OUR_PRODUCT_FILTER_ERROR: return { loading: false, error: action.payload };
    default: return state;
  }
};
//edited
export const itemInfoReducer = (state = { loading: true }, action) => {
  switch (action.type) { case ITEM_INFO_REQUEST: return { loading: true };
    case ITEM_INFO_COMPLETE: return { loading: false, item: action.payload };
    case ITEM_INFO_ERROR: return { loading: false, error: action.payload };
    default:  return state;
  }
};
export const itemListReducer = (//edited
  state = { loading: true, PPTitems: [] }, action
) => {
  switch (action.type) { case ITEM_HISTORY_REQUEST: return { loading: true };
    case ITEM_HISTORY_COMPLETE: return { loading: false, PPTitems: action.payload.PPTitems,pages: action.payload.pages,page: action.payload.page,};
    case ITEM_HISTORY_ERROR: return { loading: false, error: action.payload };
    default:return state;
  }
};
//edited
export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
case ITEM_NEW_REQUEST: return { loading: true };
    case ITEM_NEW_COMPLETE:return { loading: false, success: true, item: action.payload };
    case ITEM_NEW_ERROR:return { loading: false, error: action.payload };
    case ITEM_CREATE_REFRESH:return {};
    default:return state;
  }
};
//edited
export const itemReviewNewReducer = (state = {}, action) => {
    switch (action.type) {
    case ITEM_REVIEW_NEW_REQUEST:return { loading: true };
    case ITEM_REVIEW_NEW_COMPLETE:  return { loading: false, success: true, review: action.payload };
    case ITEM_REVIEW_NEW_ERROR: return { loading: false, error: action.payload };
    case ITEM_REVIEW_CREATE_REFRESH: return {};
    default:
      return state;
  }
};
