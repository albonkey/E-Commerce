import {BRAINTREE_TOKEN_SUCCESS, BRAINTREE_TOKEN_REQUEST, BRAINTREE_TOKEN_FAIL} from '../constants/braintreeConstants.js';

const braintreeReducer = (state={ clientToken: ''}, action) => {
  switch (action.type){
    case BRAINTREE_TOKEN_REQUEST:
      return {loading: true};
    case BRAINTREE_TOKEN_SUCCESS:
      return {loading:false, clientToken: action.payload};
    case BRAINTREE_TOKEN_FAIL:
      return {loading:false, error: action.payload};
    default:
      return state;
  }
}

export { braintreeReducer }
