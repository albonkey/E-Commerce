import axios from 'axios';
import Cookie from 'js-cookie';

import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from '../constants/orderConstants.js';

const listOrders = () => async(dispatch, getState) => {
  try{
    dispatch({ type: ORDER_LIST_REQUEST });
    const {userSignin: { userInfo }} = getState();
    const { data } = await axios.get('/api/orders', {
       headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + userInfo.token
        }
      });
    dispatch({type: ORDER_LIST_SUCCESS, payload: data});
  }
  catch(error){
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}
const createOrder = (createOrderData) => async (dispatch) => {
  dispatch({type: ORDER_CREATE_REQUEST, payload: createOrderData});
  try{
    const {data} = await axios.post('/api/orders/create', createOrderData);
    dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
    return data;
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message});
  }
}

export { createOrder, listOrders };
