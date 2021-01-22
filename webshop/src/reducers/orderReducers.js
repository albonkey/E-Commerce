import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from '../constants/orderConstants.js';

function orderListReducer(state = { orders: [] }, action) {
  switch (action.type){
    case ORDER_LIST_REQUEST:
      return {loading: true};
    case ORDER_LIST_SUCCESS:
      return {loading:false, orders: action.payload};
    case ORDER_LIST_FAIL:
      return {loading:false, error: action.payload};
    default:
      return state;
  }
}

const orderCreateReducer = (state={order: {}}, action) => {
  switch (action.type){
    case ORDER_CREATE_REQUEST:
      return {loading: true};
    case ORDER_CREATE_SUCCESS:
      return {loading:false, order: action.payload};
    case ORDER_CREATE_FAIL:
      return {loading:false, error: action.payload};
    default:
      return state;
  }
}

export { orderCreateReducer, orderListReducer }
