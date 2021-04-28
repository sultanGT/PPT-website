import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.item === item.item);
      if (existItem) {
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.item === existItem.item ? item : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.item !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, delivery_address: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, purchase_method: action.payload };
    case CART_EMPTY:
      return { ...state, error: '', cartItems: [] };
    default:
      return state;
  }
};
