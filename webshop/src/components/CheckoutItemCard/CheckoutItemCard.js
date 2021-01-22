import React from 'react';
import './CheckoutItemCard.css';

const CheckoutItemCard = ({item}) => {
  return(
    <div className='checkout-item-card'>
      <div className='checkout-item-info'>
        <img src={`/api/products/image/${item.product}`} alt={item.name} />
        <div className='info-box'>
          <p className='info-title'>{item.name}</p>
          <p className='info-tag'>Size: {item.size}</p>
          <p className='info-tag'>Qty: {item.qty}</p>
        </div>
      </div>
      <div className='price'>${item.price*item.qty}</div>
    </div>

  )
}

export default CheckoutItemCard;
