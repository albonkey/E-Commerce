import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_INFORMATION, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY } from '../constants/cartConstants';

const cartReducer = (state={cartItems: [], shipping:{type: '', cost:''}}, action) => {
  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);

      if(product){
        return {...state, cartItems: state.cartItems.map(x => x.product === product.product ? item : x)};
      }
      return { ...state, cartItems: [...state.cartItems, item]};
    case CART_REMOVE_ITEM:
      const itemRemove = action.payload;
      return { ...state, cartItems: state.cartItems.filter(x => x.product !== itemRemove.product)};
    case CART_SAVE_INFORMATION:
      return {...state, checkoutInfo: action.payload};
    case CART_EMPTY:
      return {...state, cartItems: []};
    case CART_SAVE_SHIPPING:
      return {...state, shipping: action.payload};
    case CART_SAVE_PAYMENT:
      return {...state, payment: action.payload};
    default:
      return state;
  }
}

export { cartReducer }
