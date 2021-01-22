import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className='contact'>
      <form className='form'>
        <legend>Contact us</legend>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name'/>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email'/>
        <label htmlFor='message'>Message</label>
        <textarea name='message'/>
        <button type='submit'>Send Message</button>
      </form>
    </div>
  )
}

export default Contact;
