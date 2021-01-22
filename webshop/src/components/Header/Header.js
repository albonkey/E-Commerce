import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import './Header.css';

const Header = () => {
  const userSignin = useSelector(state=>state.userSignin);
  const { loading, userInfo, error } = userSignin;

  useEffect(() => {

    return () => {

    };
  }, [])
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }
  return (
    <header className='header'>
      <ul>
        <li><Link to='/shop'>Shop</Link></li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <h1><Link to='/'>Euneir</Link></h1>
      <ul>
      {
        userInfo ?
          <li><Link to='/addProduct'>{userInfo.name}</Link></li>
          :
          <li><Link to='/signin'>Signin</Link></li>
      }
        <li><Link to='/cart'>Cart</Link></li>
        {
          userInfo &&
          <li className='signout' onClick={() => signoutHandler()}><Link to='/'>Sign out</Link></li>
        }
      </ul>
    </header>
  )
}

export default Header;
