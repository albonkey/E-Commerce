import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBraintreeClientToken, processPayment } from '../../actions/braintreeActions';
import { emptyCart } from '../../actions/cartActions';
import { createOrder } from '../../actions/orderActions';
import DropIn from "braintree-web-drop-in-react";
import './PaymentOptions.css';

const PaymentOptions = ({reRoute, total}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const clientToken = useSelector(state => state.clientToken);
  const { email, state, country, city, address, postalCode } = cart.checkoutInfo;
  const [shipping, setShipping] = useState({type: '', cost: 0});

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  })


  useEffect(() => {
    dispatch(getBraintreeClientToken())
    setData({...data, clientToken: clientToken.clientToken, success: true});
    if((cart.shipping.cost !== 0)){
      setShipping(cart.shipping);
    } else {
      reRoute('shipping');
    }
  },[])

  const buy = () => {
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
    .then(data => {
      nonce = data.nonce;

      const paymentData = {
        paymentMethodNonce: nonce,
        amount: total
      }

      processPayment(paymentData)
      .then(response => {

        const createOrderData = {
          products: cart.cartItems,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
          buyer_info: cart.checkoutInfo
        }

        dispatch(createOrder(createOrderData)).then(response => {
          dispatch(emptyCart());
          setData({...data, success: true});
          reRoute("orderSummary");
        });




      });

    }).catch(error => {
      console.log('Drop In Error, ', error);
      setData({...data, error: error.message });
    })
  }

  const showDropIn = () => {
    return (
      <div>
        { data.clientToken !== null && cart.cartItems.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: data.clientToken }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy}>Pay</button>
          </div>
        ) : null }
      </div>
    )
  }

  const showSuccess = success => (
    <div>
      {success}
    </div>
  )

  return(
    <div>
        <div className='shipping-info-box'>
          <div className='shipping-info-contact'>
            <div className='flex'>
              <div className='margin-right color-2'>Contact</div>
              <div>{email}</div>
            </div>
            <div className='font-small' onClick={() => reRoute('information')}>Change</div>
          </div>
          <div className='shipping-info-contact'>
            <div className='flex align-center'>
              <div className='margin-right color-2'>Ship to</div>
              <div className='font-small'>{`${address}, ${city} ${postalCode}, ${country}`}</div>
            </div>
            <div className='font-small' onClick={() => reRoute('information')}>Change</div>
          </div>
          <div className='shipping-info-contact'>
            <div className='flex align-center'>
              <div className='margin-right color-2'>Method</div>
              <div className='font-small'>{shipping.type}</div>
            </div>
            <div className='font-small' onClick={() => reRoute('shipping')}>Change</div>
          </div>
        </div>
      {showDropIn()}
    </div>

  )
}

export default PaymentOptions;
