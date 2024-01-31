// TextFiled.js
import React from 'react';
import './TextFiled.css';

const TextFiled = (props) => {
  const { text, value, onChange, type } = props;

  return (
    <div className='DivPassword'>
      <input
        type={type || 'text'} // Set type to 'text' by default or use the provided type
        id={text.toLowerCase()}
        name={text.toLowerCase()}
        placeholder={text}
        value={value}
        className='TextFiled PasswordBox'
        onChange={onChange}
      />
    </div>
  );
};
export default TextFiled;


/* 
old code:
// PasswordField.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './TextFiled.css';

const PasswordField = (Props) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    // Check if Props.onChange is a function before invoking it
    if (typeof Props.onChange === 'function') {
      Props.onChange(e);
    }
  };

  const isPasswordType = Props.text === 'Password' || Props.text === 'Confirm Password';

  return (
    isPasswordType ? (
      <div className='DivPassword'>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder={text}
          value={value}
          className='TextFiled PasswordBox'
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          className='Icon'
          icon={showPassword ? faEye : faEyeSlash}
          onClick={handleTogglePassword}
        />
      </div>
    ) : (
      <input
        type="text"
        id="username"
        name="username"
        placeholder={Props.text}
        value={Props.value}  
        className='TextFiled'
        onChange={Props.onChange}
      />
    )
  );
};

export default PasswordField;
*/