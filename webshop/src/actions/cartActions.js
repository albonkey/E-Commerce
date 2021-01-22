import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_INFORMATION, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY } from '../constants/cartConstants';

const addToCart = (productId, size, qty) => async (dispatch, getState) => {
  try{
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({type: CART_ADD_ITEM, payload:{
      product: data._id,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      size: size,
      qty: parseInt(qty,10),
    }});

    const {cart:{cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch(error){

  }
}
const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: {product:productId} });

  const {cart:{cartItems}} = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));

}

const saveInformation = (data) => (dispatch, getState) => {
  dispatch({ type: CART_SAVE_INFORMATION, payload: data });
  const {cart:{checkoutInfo}} = getState();
  Cookie.set('checkoutInfo', JSON.stringify(checkoutInfo));
}

const emptyCart = () => (dispatch, getState) => {
  dispatch({type: CART_EMPTY, payload: ''});
  const {cart:{cartItems}} = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
export { addToCart, removeFromCart, saveInformation, saveShipping, savePayment, emptyCart }
