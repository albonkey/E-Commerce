import React from 'react';
import './Showcase.css';
const Showcase = () => {
  return(
    <div className='showcase'>
      <h1>Best Sellers</h1>
      <div className='showcase-display'>
        <div className='product-card'>
          <img src={require('../../assets/img1.jpg')} />
          <div className='info'>
            <p>Oversized T-Shirt</p>
            <p>$50</p>
          </div>
        </div>
        <div className='product-card'>
          <img src={require('../../assets/img1.jpg')} />
          <div className='info'>
            <p>Oversized T-Shirt</p>
            <p>$50</p>
          </div>
        </div>
        <div className='product-card'>
          <img src={require('../../assets/img1.jpg')} />
          <div className='info'>
            <p>Oversized T-Shirt</p>
            <p>$50</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Showcase;
