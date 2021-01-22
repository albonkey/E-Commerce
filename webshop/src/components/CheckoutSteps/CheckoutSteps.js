import React from 'react';
import './CheckoutSteps.css';
const CheckoutSteps = (props) => {
  return (
    <div className='checkout-steps'>
      <div className={props.step1 ? 'active' : '' }  onClick={props.step1 ? () => props.reRoute('cart') : null} > Cart </div>
      <div className={props.step2 ? 'active' : ''} onClick={props.step2 ? () => props.reRoute('information') : null}> Information </div>
      <div className={props.step3 ? 'active' : ''} onClick={props.step3 ? () => props.reRoute('shipping') : null}> Shipping </div>
      <div className={props.step4 ? 'active' : ''} > Payment </div>
    </div>
  )
}

export default CheckoutSteps;
