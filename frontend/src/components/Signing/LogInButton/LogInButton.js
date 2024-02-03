import React from 'react';
import './LogInButton.css';

/**
 * LogInButton component for rendering a login button.
 *
 * @component
 * @param {Object} props - The properties of the LogInButton component.
 * @param {string} props.text - The text displayed on the button.
 * @param {function} props.onClick - The function called when the button is clicked.
 * @returns {JSX.Element} LogInButton component
 */
function LogInButton({ text, onClick }) {
  return (
    <button className='LOGINBUT' onClick={onClick}>
      {text}
    </button>
  );
}

export default LogInButton;
