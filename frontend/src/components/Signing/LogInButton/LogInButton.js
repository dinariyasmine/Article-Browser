import React from 'react';
import './LogInButton.css';

function LogInButton(Props) {
  return (
    <button className='LOGINBUT'>
        {Props.text}
    </button>
  )
}

export default LogInButton