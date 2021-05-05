import {
  SHOPPING_ADD_PRODUCT,
  SHOPPING_NO_ITEMS,
  SHOPPING_REMOVE_PRODUCT,
  SHOPPING_PAYPAL,
  SHOPPING_DELIVERY_ADDRESS,
} from '../constants/shoppingConstants';

export const cartReducer = (state = { shoppingItems: [] }, action) => {
  switch (action.type) {
    case SHOPPING_ADD_PRODUCT:
      const item = action.payload;
      const existItem = state.shoppingItems.find((x) => x.item === item.item);
      if (existItem) {
        return {
          ...state,
          error: '',
          shoppingItems: state.shoppingItems.map((x) =>
            x.item === existItem.item ? item : x
          ),
        };
      } else {
        return { ...state, error: '', shoppingItems: [...state.shoppingItems, item] };
      }
    case SHOPPING_REMOVE_PRODUCT:
      return {
        ...state,
        error: '',
        shoppingItems: state.shoppingItems.filter((x) => x.item !== action.payload),
      };
    case SHOPPING_DELIVERY_ADDRESS:
      return { ...state, delivery_address: action.payload };
    case SHOPPING_PAYPAL:
      return { ...state, purchase_method: action.payload };
    case SHOPPING_NO_ITEMS:
      return { ...state, error: '', shoppingItems: [] };
    default:
      return state;
  }
};
