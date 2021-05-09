import {
  SHOPPING_REMOVE_PRODUCT,
  SHOPPING_PAYPAL,
  SHOPPING_DELIVERY_ADDRESS,
  SHOPPING_ADD_PRODUCT, 
  SHOPPING_NO_ITEMS, 
} from '../constants/shoppingConstants';//self coded constants
//https://github.com/basir/amazona/blob/master/frontend/src/reducers/cartReducers.js
//Reused code from tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29c
//Redux reducers help display the state management of the web app with requests, errors and complete
//edited
export const shoppingReducer = (state = { shoppingItems: [] }, action) => {//edited 
  switch (action.type) {
    case SHOPPING_DELIVERY_ADDRESS://edited 
      return { ...state, delivery_address: action.payload };//edited 
    case SHOPPING_PAYPAL://edited 
      return { ...state, purchase_method: action.payload };//edited 
      case SHOPPING_ADD_PRODUCT://edited 
      const item = action.payload;
      const existItem = state.shoppingItems.find((x) => x.item === item.item);//edited 
      if (existItem) {//edited 
        return {...state, error: '', shoppingItems: state.shoppingItems.map((x) =>//edited 
            x.item === existItem.item ? item : x),//edited 
        };
      } else {
        return { ...state, error: '', shoppingItems: [...state.shoppingItems, item] };//edited 
      }
    case SHOPPING_NO_ITEMS://edited 
      return { ...state, error: '', shoppingItems: [] };//edited 
      case SHOPPING_REMOVE_PRODUCT://edited 
      return {...state, error: '', shoppingItems: state.shoppingItems.filter((x) => x.item !== action.payload),//edited 
      };
    default:
      return state;
  }
};
