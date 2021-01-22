import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import ProductCard from '../ProductCard/ProductCard';
import './ShopScreen.css';

const ShopScreen = () => {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  console.log(products);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return() => {

    }
  },[])
  return(
    loading? <div>Loading...</div> :
    error? <div>{error}</div> :
    <div className='shop-screen'>
      <div className='product-list-header'>The peaceful state of mind after a pleasant dream.</div>
      <div className='product-list'>
      {
        products.map((product, i) => {
          return <ProductCard key={product._id} product={product} />
          })
        }
      </div>
      <div className='product-list-header'>The peaceful state of mind after a pleasant dream.</div>
    </div>
  )
}

export default ShopScreen;
