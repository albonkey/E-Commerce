import React, { useEffect, useState }  from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import './ShippingScreen.css';


const ShippingScreen = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) =>{
    e.preventDefault();
    props.history.push('payment');
  }
  return(
    <div className='shipping-screen'>
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <form onSubmit={submitHandler}>
        <ul>
          <li>
            <legend>Shipping</legend>
          </li>
          <li>
            <label htmlFor='name'>Address</label>
            <input type='text' name='address' id='address' onChange={(e) => setAddress(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='name'>City</label>
            <input type='text' name='city' id='city' onChange={(e) => setCity(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='postal-code'>Postal Code</label>
            <input type='text' name='postal-code' id='postal-code' onChange={(e) => setPostalCode(e.target.value)}></input>
          </li>
          <li>
            <label htmlFor='country'>Country</label>
            <input type='text' name='country' id='country' onChange={(e) => setCountry(e.target.value)}></input>
          </li>
          <li>
            <button type='submit'>Continue</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default ShippingScreen;
