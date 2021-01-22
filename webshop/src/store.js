import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productInfoReducer, productDeleteReducer, productSaveReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { braintreeReducer } from './reducers/braintreeReducers';
import { userSigninReducer, userRegisterReducer, userSignoutReducer } from './reducers/userReducers';
import { orderCreateReducer, orderListReducer } from './reducers/orderReducers';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const checkoutInfo = Cookie.getJSON('checkoutInfo') || {};

const initialState = {cart: { cartItems, checkoutInfo: {...checkoutInfo}, shipping: {type: '', cost: 0} }, userSignin: {userInfo}};

const reducer = combineReducers({
  productList: productListReducer,
  productInfo: productInfoReducer,
  cart:  cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  clientToken: braintreeReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
