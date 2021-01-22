import React from 'react';
import { useDispatch } from 'react-redux';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import './CartItem.css';
import { addToCart, removeFromCart } from '../../actions/cartActions';

const CartItem = ({cartItem, edit}) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId, size) => {
    if(productId) {
      dispatch(removeFromCart(productId, size));
    }
  }
  return (
    <div className='cart-item'>
      <div className='display'>
        <img src={`/api/products/image/${cartItem.product}`} alt={cartItem.name} />
        <div className='info-box'>
          <h3>{cartItem.name}</h3>
          <p className='info-tag'>Size: {cartItem.size}</p>
          <p className='info-tag'>Price: ${cartItem.price}</p>
        </div>
      </div>
      <div className='quantity'>
        <QuantitySelector item={cartItem}/>
        <button className='remove-button' onClick={() => removeFromCartHandler(cartItem.product, cartItem.size)}>Remove</button>
      </div>
      <div className='price'>${cartItem.price*cartItem.qty}</div>
    </div>
  )
}

export default CartItem;
