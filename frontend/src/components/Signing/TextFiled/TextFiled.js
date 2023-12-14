// PasswordField.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './TextFiled.css'


const PasswordField = (Props) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    (Props.text==='Password')?
      <div className='DivPassword'>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder={Props.text}
          value={password}
          className='TextFiled PasswordBox'
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          className='Icon'
          icon={showPassword ? faEye : faEyeSlash}
          onClick={handleTogglePassword}
        />
      </div>
    :
    <input type="text" id="username" name="username" placeholder={Props.text} className='TextFiled' />
  );
};

export default PasswordField;
