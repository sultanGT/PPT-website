import {
  SHOPPING_ADD_PPT_PRODUCT,
  CART_EMPTY,
  SHOPPING_DELETE_PPT_PRODUCT,
  SHOPPING_PAYPAL,
  SHOPPING_DELIVERY_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (state = { shopping_items: [] }, action) => {
  switch (action.type) {
    case SHOPPING_ADD_PPT_PRODUCT:
      const item = action.payload;
      const existItem = state.shopping_items.find((x) => x.item === item.item);
      if (existItem) {
        return {
          ...state,
          error: '',
          shopping_items: state.shopping_items.map((x) =>
            x.item === existItem.item ? item : x
          ),
        };
      } else {
        return { ...state, error: '', shopping_items: [...state.shopping_items, item] };
      }
    case SHOPPING_DELETE_PPT_PRODUCT:
      return {
        ...state,
        error: '',
        shopping_items: state.shopping_items.filter((x) => x.item !== action.payload),
      };
    case SHOPPING_DELIVERY_ADDRESS:
      return { ...state, delivery_address: action.payload };
    case SHOPPING_PAYPAL:
      return { ...state, purchase_method: action.payload };
    case CART_EMPTY:
      return { ...state, error: '', shopping_items: [] };
    default:
      return state;
  }
};
