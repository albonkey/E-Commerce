import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <div className='call-to-action'>
      <div className='action-box'>
        <h3>Euneirophrenia;</h3>
        <p>The peaceful state of mind after a pleasant dream.</p>
        <Link to='/shop'><button>Shop Our Clothing</button></Link>
      </div>
    </div>
  )
}

export default CallToAction;
