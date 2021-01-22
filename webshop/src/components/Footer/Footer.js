import React from 'react';
import './Footer.css';
const Footer = () => {
  return(
    <footer className='footer'>
      <h2>Join The Newsletter To Recieve Our Best Offers</h2>
      <p>You can unsubscribe at anytime.</p>
      <form>
        <input type='email' name='email' placeholder='Your Email'></input>
        <button type='submit'>Subscribe</button>
      </form>
      <div className='social-media'></div>
    </footer>
  )
}

export default Footer;
