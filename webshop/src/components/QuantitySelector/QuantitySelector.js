import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart} from '../../actions/cartActions';
import './QuantitySelector.css';

const QuantitySelector = ({item}) => {
  const dispatch = useDispatch();

  const quantityHandler = (sign) => {
    if(sign === '-' && item.qty > 1){
      dispatch(addToCart(item.product, item.size, (item.qty - 1)));
    } else if (sign === '+' && item.qty < item.countInStock){
      dispatch(addToCart(item.product, item.size, (item.qty + 1)));
        console.log('hello');
    }
  }
  return (
    <div className='quantity-selector'>
      <div className='decrease' onClick={() => quantityHandler('-')}>-</div>
      <div className='display'>{item.qty}</div>
      <div className='increase' onClick={() => quantityHandler('+')}>+</div>
    </div>
  )
}

export default QuantitySelector;
