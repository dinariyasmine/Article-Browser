import React from 'react';
import './LogInButton.css';

function LogInButton({ text, onClick }) {
  return (
    <button className='LOGINBUT' onClick={onClick}>
      {text}
    </button>
  );
}

export default LogInButton;
