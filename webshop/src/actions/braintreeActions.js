import axios from 'axios';
import {BRAINTREE_TOKEN_SUCCESS, BRAINTREE_TOKEN_REQUEST, BRAINTREE_TOKEN_FAIL} from '../constants/braintreeConstants.js';

const getBraintreeClientToken = () => async (dispatch) => {
  try{
    dispatch({ type: BRAINTREE_TOKEN_REQUEST });
    const { data } = await axios.get('api/braintree/client_token');
    dispatch({type: BRAINTREE_TOKEN_SUCCESS, payload: data});

  } catch(error){
      dispatch({ type: BRAINTREE_TOKEN_FAIL, payload: error.message });
  }
}

const processPayment = async(paymentData) => {
  try{
    const { data } = await axios.post('/api/braintree/payment', paymentData, {
      headers: {
        'Accept': 'application/json',
      }
    })
    return data;
  } catch(error){
    console.log("Error in payment data: " + error);
  }
}

export { getBraintreeClientToken, processPayment };
