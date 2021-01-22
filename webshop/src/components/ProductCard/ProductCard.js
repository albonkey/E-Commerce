import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({product}) => {
  return(
    <Link to={'/product/' + product._id}>
      <div className='product-card'>
        <img src={`/api/products/image/${product._id}`} alt={product.name} />
        <div className='info'>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
