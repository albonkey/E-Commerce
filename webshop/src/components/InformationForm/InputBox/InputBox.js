import React from 'react';
import './InputBox.css';

const InputBox = ({type, name, text}) => {
  return(
    <div className='input-box'>
      <label htmlFor={name}>{text}</label>
      <input type={type} name={name} id={name} required={true} ></input>
    </div>
  )
}

export default InputBox;
