import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import InformationForm from '../InformationForm/InformationForm';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import ShippingOptions from '../ShippingOptions/ShippingOptions';
import PaymentOptions from '../PaymentOptions/PaymentOptions';
import CartItem from '../CartItem/CartItem';
import CheckoutItemCard from '../CheckoutItemCard/CheckoutItemCard';
import './CheckoutScreen.css';

const CheckoutScreen = (props) => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const [subTotal, setSubTotal] = useState(cartItems.reduce((a, c) =>  a + c.price * c.qty, 0));
  const tax = Math.floor(100*(subTotal * (cart.checkoutInfo.state === 'California' ? 0.095 : 0)))/100;
  const shipping = cart.shipping;
  const total = Math.floor(100 * (subTotal + tax + shipping.cost))/100;

  const reRoute = (route) => {
    if(route === 'shipping'){
      props.history.push('?step=shipping');
    } else if(route === 'cart'){
      props.history.push('/cart');
    } else if (route === 'information'){
      props.history.push('?step=information');
    } else if (route === 'payment'){
      props.history.push('?step=payment');
    } else if (route === 'orderSummary'){
      props.history.push('/orderSummary');
    } else {
      props.history.push('/');
    }
  }

  const params = queryString.parse(props.location.search);

  useEffect(() => {
    
  },[])

  return(
    <div className='checkout-screen'>
      <div className='checkout-action'>
        <h3>Check out</h3>
        <CheckoutSteps step1 step2 step3 reRoute={reRoute}/>

          {params.step === 'information' && <InformationForm reRoute={reRoute} />}
          {params.step === 'shipping' && <ShippingOptions reRoute={reRoute}/>}
          {params.step === 'payment' && <PaymentOptions reRoute={reRoute} total={total}/>}


      </div>
      <div className='checkout-info'>
        <h3>Order Info</h3>
        <div className='checkout-items-list'>
          {
          cartItems.length === 0 ?
            <div> Cart is Empty.</div> :
            cartItems.map((cartItem, i) =>
              <CheckoutItemCard item={cartItem} key={i}  />
            )
          }
        </div>
        <div className='checkout-subtotal'>
          <div className='space-between'>
            <p>Subtotal</p>
            <p>${subTotal}</p>
          </div>
          <div className='space-between'>
            <p>Tax</p>
            <p>${tax}</p>
          </div>
          <div className='space-between'>
            <p>Shipping</p>
            {
              params.step === 'payment' ?
              <p>$ {shipping.cost}</p> :
              <p>Calculated at next step</p>
            }
          </div>
        </div>
        <div className='checkout-total'>
          <div className='space-between'>
            <p>Total</p>
            <p>USD ${total }</p>
          </div>
        </div>

      </div>


    </div>
  );
}

export default CheckoutScreen;
