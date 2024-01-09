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

const PasswordField = (props) => {
  const { text, value, onChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    (text === 'Password' || text === 'Confirm Password') ? (
      <div className='DivPassword'>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder={text}
          value={value}
          className='TextFiled PasswordBox'
          onChange={onChange}
        />
        <FontAwesomeIcon
          className='Icon'
          icon={showPassword ? faEye : faEyeSlash}
          onClick={handleTogglePassword}
        />
      </div>
    ) : (
      <input type="text" id="username" name="username" placeholder={text} className='TextFiled' />
    )
  );
};

export default PasswordField;
*/