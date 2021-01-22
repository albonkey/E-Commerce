import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { infoProduct } from '../../actions/productActions';
import './ProductScreen.css';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('small');
  const productInfo = useSelector(state => state.productInfo);
  const { product, loading, error } = productInfo;
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(infoProduct(props.match.params.id));
    return() => {

    }
  },[]);

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty + '?size=' + size);
  }


  return(
    loading ? <div>Loading</div> :
    error ? <div>{ error }</div> :
    !product.image ? <div> Product not loaded</div> :
    <div className='product-screen'>
      <img src={`/api/products/image/${product._id}`} />
      <div className='product-info'>
        <h1>{product.name}</h1>
        <p>{product.price} USD</p>
        <p>{product.description}</p>
        <label>Size</label>
        <select onChange={(e) => { setSize(e.target.value)}}>

          <option value='small'>Small</option>
          <option value='medium'>Medium</option>
          <option value='large'>Large</option>}
        </select>
        <label>Quantity</label>

        <select onChange={(e) => { setQty(e.target.value)}}>
          {
            Array.from({length: product.countInStock[size]}, (x, i) => <option key={i+1} value={i+1}>{i+1}</option>)
          }
        </select>
        <button onClick={handleAddToCart} disabled={product.countInStock[size]===0}>Add To Cart</button>
      </div>

    </div>
  )
}

export default ProductScreen;
