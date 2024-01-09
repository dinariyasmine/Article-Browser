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
          placeholder={Props.text}
          value={password}
          className='TextFiled PasswordBox'
          onChange={handleChange}  
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
