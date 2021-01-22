import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import CartItem from '../CartItem/CartItem';
import './CartScreen.css';

const CartScreen = (props) => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? props.location.search.split('=')[1][0] : 1;
  const size = props.location.search ? props.location.search.split('=')[2] : 'small';

  const dispatch = useDispatch();

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, size, qty));
    }
  },[])

  const checkoutHandler = () => {
    props.history.push('/checkout?step=information');
  }

  return(
    <div className='cart-screen'>
      <h2>Cart</h2>
      <div className='cart-list'>
        <div className='cart-list-header'>
          <div>Product</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        {
          cartItems.length === 0 ?
            <div> Cart is Empty.</div> :
            cartItems.map((cartItem, i) =>
              <CartItem cartItem={cartItem} key={i} edit={true} />
            )
        }
      </div>
      <div className='cart-action'>
        <p>
          Total: $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </p>
        <p className='shipping-info'>Shipping & taxes calculated at checkout</p>
        <button className='button-primary' disabled={cartItems.length===0} onClick={checkoutHandler}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  )
}

export default CartScreen;
