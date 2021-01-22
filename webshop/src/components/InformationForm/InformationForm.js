import React, { useEffect, useState }  from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { saveInformation } from '../../actions/cartActions';
import InputBox from './InputBox/InputBox';
import './InformationForm.css';
import {formData} from './formData';


const InformationForm = ({reRoute}) => {
  const cart = useSelector(state => state.cart);
  const [checkoutForm, setCheckoutForm] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setCheckoutForm({
      ...cart.checkoutInfo
    })
  },[])
  const handleChange = name => event => {
      const value = event.target.value;

      setCheckoutForm({...checkoutForm, [name]: value});
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    if(!checkoutForm.country === 'United States'){
      setCheckoutForm({...checkoutForm, ['state']: ''});
    }
    dispatch(saveInformation({...checkoutForm}));
    reRoute('shipping');
  }

  return(
    <div className='information-form'>
      <form onSubmit={submitHandler}>
        <ul>
          <li>
            <legend>Contact Info</legend>
          </li>
          <li>
            <div className='input-box'>
              <label htmlFor='email'>Email</label>
              <input type='input' name='email' id='email' value={checkoutForm.email} required={true} onChange={handleChange('email')} ></input>
            </div>
          </li>
          <li>
            <legend>Shipping</legend>
          </li>
          <li>
            <div className='li-name'>
              <div className='input-box'>
                <label htmlFor='firstName'>First Name</label>
                <input type='input' name='firstName' id='email' value={checkoutForm.firstName} required={true} onChange={handleChange('firstName')} ></input>
              </div>
              <div className='input-box'>
                <label htmlFor='email'>Last Name</label>
                <input type='input' name='lastName' id='email' value={checkoutForm.lastName} required={true} onChange={handleChange('lastName')} ></input>
              </div>
            </div>
          </li>
          <li>
            <div className='input-box'>
              <label htmlFor='address'>Address</label>
              <input type='input' name='address' id='address' value={checkoutForm.address} required={true} onChange={handleChange('address')} ></input>
            </div>
          </li>
          <li>
            <div className='input-box'>
              <label htmlFor='city'>City</label>
              <input type='input' name='city' id='city' value={checkoutForm.city} required={true} onChange={handleChange('city')} ></input>
            </div>
          </li>
          <li>
            <div className='input-box'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input type='input' name='postalCode' id='postalCode' value={checkoutForm.postalCode} required={true} onChange={handleChange('postalCode')}></input>
            </div>
          </li>
          <li>
            <div className='input-box'>
              <label>Country</label>
              <select className='select-box' value={checkoutForm.country} onChange={handleChange('country')}>
                <option></option>
                {formData.countries.map((c, i) => {
                  return <option key={i} value={c}>{c}</option>
                })

                }
              </select>
            </div>
          </li>
          { checkoutForm.country === 'United States' &&
            <li>
            <div className='input-box'>
              <label>State</label>
              <select className='select-box' value={checkoutForm.state}onChange={handleChange('state')}>
                <option></option>
                {formData.states.map((s, i) => {
                  return <option key={i} value={s}>{s}</option>
                })

                }
              </select>
            </div>
          </li>
          }
          <li className='li-information-actions'>
            <Link to='/cart' className='link-previous'>{`< Back to Cart`}</Link>
            <button type='submit' className='button-primary'>Continue to shipping</button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default InformationForm;
