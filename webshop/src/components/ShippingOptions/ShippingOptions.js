import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../../actions/cartActions';
import './ShippingOptions.css';

const ShippingOptions = ({reRoute}) => {
  const cart = useSelector(state => state.cart);
  const { email, state, country, city, address, postalCode } = cart.checkoutInfo;
  const [shippingMethod, setShippingMethod] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if(country === 'United States'){
      setShippingMethod({type: 'USPS Express Shipping', cost: 3.94});
    } else {
      setShippingMethod({type: 'International Express Shipping', cost: 6.21})
    }
  },[])

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(saveShipping(shippingMethod));
    reRoute('payment');

  }

  return(
    <div className='shipping-options'>
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
      </div>
      <h3>Shipping method</h3>
      <form onSubmit={submitHandler}>
        <div className='shipping-radio-box'>
          <div>
            <input type='radio' name='shippingOption' required={true}></input>
            <label htmlFor='shippingOption'>{shippingMethod.type}</label>
          </div>
          <div>${shippingMethod.cost}</div>
        </div>
        <div className='shipping-actions'>
          <Link to='/checkout?step=information' className='link-previous'>{`< Back to Information`}</Link>
          <button type='submit' className='button-primary'>Continue to payment</button>
        </div>
      </form>
    </div>
  )
}

export default ShippingOptions;
