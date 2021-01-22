import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct, saveProduct } from '../../actions/productActions';
import './AddProductScreen.css';

const AddProductScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [small, setSmall] = useState('');
  const [medium, setMedium] = useState('');
  const [large, setLarge] = useState('');

  const productList = useSelector(state=>state.productList);
  const { loading, products, error } = productList;

  const productSave = useSelector(state=>state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state=>state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

  const userSignin = useSelector(state=>state.userSignin);
  const { loading: loadingUser, userInfo, error: errorUser } = userSignin;

  const dispatch = useDispatch();


  useEffect(() => {
    if(userInfo.isAdmin){
      dispatch(listProducts());
    } else {
      props.history.push('/');
    }
    return () => {

    };
  }, [successSave, successDelete])

  const openModal = (product) => {
    setModalVisible(true);
    if(product === 'new'){
      setId('');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
      setSmall('');
      setMedium('');
      setLarge('');
    } else {
      setId(product._id);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      if(product.countInStock ){
        setSmall(product.countInStock['small']);
        setMedium(product.countInStock['medium']);
        setLarge(product.countInStock['large']);
      }
    }
  }

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  const handleChange = (name) => (e) =>{
    const value = (name === 'image') ? e.target.files[0] : e.target.value;

    switch(name){
      case 'name':
        return setName(value);
      case 'description':
        return setDescription(value);
      case 'price':
        return setPrice(value);
      case 'image':
        return setImage(value);
      case 'category':
        return setCategory(value);
      case 'small':
        return setSmall(value);
      case 'medium':
        return setMedium(value);
      case 'large':
        return setLarge(value);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const countInStock = {
      small: small,
      medium: medium,
      large: large
    }

    const formData = new FormData();

    if(id){
      formData.set('id', id);
    }

    formData.set('name', name);
    formData.set('description', description);
    formData.set('price', price);
    formData.append('image', image);
    formData.set('category', category);
    formData.set('countInStock', JSON.stringify(countInStock));

    dispatch(saveProduct(formData));

    setModalVisible(false);
  }

  return(
    <div className='add-product-screen'>
      {products &&
        <div className='product-list'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Count In Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {

                products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <ul>
                      {
                      Object.entries(product.countInStock).map((size, i) => (
                        <li key={i}>{size[0] + ": " + size[1]}</li>
                        )
                      )}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => openModal(product)}>Edit</button>
                    <button onClick={() => deleteHandler(product)}>Delete</button>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
    }
    <button className='open-add-product' onClick={() => openModal('new')}>
      +
    </button>

    {
      modalVisible &&
      <div className='add-product-action'>
        <form onSubmit={submitHandler}>
          <ul>
            <li>
              <legend>Create Product</legend>
            </li>
            <li>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' value={name} id='name' onChange={handleChange('name')}></input>
            </li>
            <li>
              <label htmlFor='description'>Description</label>
              <textarea name='description' value={description} id='description' onChange={handleChange('description')}></textarea>
            </li>
            <li>
              <label htmlFor='price'>Price</label>
              <input type='Number' name='price' value={price} id='price' onChange={handleChange('price')}></input>
            </li>
            <li>
              <label htmlFor='image'>Image</label>
              <input type='file' name='image'  id='image' onChange={handleChange('image')}></input>
            </li>
            <li>
              <label htmlFor='category'>Category</label>
              <input type='text' name='category' value={category} id='category' onChange={handleChange('category')}></input>
            </li>
            <li>
              <label htmlFor='countInStock'>Count In Stock</label>
              <table>
                <thead className='size-header'>
                  <tr><td>Small</td><td>Medium</td><td>Large</td></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input className='size-box' type='Number' name='small' value={small} id='small' onChange={handleChange('small')}></input></td>
                    <td><input className='size-box' type='Number' name='medium' value={medium} id='medium' onChange={handleChange('medium')}></input></td>
                    <td><input className='size-box' type='Number' name='large' value={large} id='large' onChange={handleChange('large')}></input></td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li className='button-container'>
              <button type='submit' className='button-primary' onClick={submitHandler}>{id ? 'Update' : 'Create'}</button>
              <button className='button-secondary' onClick={() => setModalVisible(false)}>Back</button>
            </li>
          </ul>
        </form>
      </div>
    }

      </div>
  )
}

export default AddProductScreen;
