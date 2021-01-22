import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
          PRODUCT_INFO_REQUEST, PRODUCT_INFO_SUCCESS, PRODUCT_INFO_FAIL,
          PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
          PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } from '../constants/productConstants';
import axios from 'axios';


const listProducts = () => async (dispatch) => {
  try{
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
  }
  catch(error){
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
}

const infoProduct = (productId) => async (dispatch) => {
  try{
    dispatch({type: PRODUCT_INFO_REQUEST});
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({type: PRODUCT_INFO_SUCCESS, payload: data});
  } catch(error){
    dispatch({type: PRODUCT_INFO_FAIL, payload: error.message});
  }
}

const saveProduct = (product) => async (dispatch, getState) => {
  try{
    dispatch({type: PRODUCT_SAVE_REQUEST, payload: product });
    const {userSignin: { userInfo }} = getState();
    
    if(!product.get('id')){
      const { data } = await axios.post('/api/products', product, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + userInfo.token
        }
      })
      dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
    } else {
      const { data } = await axios.put('/api/products/' + product.get('id'), product, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      })
        dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
    }
  } catch(error){
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message});
  }
}


const deleteProduct = (productId) => async (dispatch, getState) => {
  try{
    const { userSignin: { userInfo } } = getState();
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        'Authorization': 'Bearer ' + userInfo.token
      }
    });
    dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true});
  } catch (error) {
    dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
  }
}
export { listProducts, infoProduct, deleteProduct, saveProduct };
