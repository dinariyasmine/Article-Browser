import React from 'react';
import './LogInButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark , faCheck} from '@fortawesome/free-solid-svg-icons';

/**
 * LogInButton component for rendering a login button.
 *
 * @component
 * @param {Object} props - The properties of the LogInButton component.
 * @param {string} props.text - The text displayed on the button.
 * @param {function} props.onClick - The function called when the button is clicked.
 * @param {boolean} props.loading - Flag indicating whether the button is in a loading state.
 * @param {boolean} props.checkMark - Flag indicating whether to display a check mark.
 * @param {boolean} props.xMark - Flag indicating whether to display an X mark.
 * @returns {JSX.Element} LogInButton component
 */
function LogInButton({ text, onClick, loading, checkMark, xMark }) {
  return (
    <button className='LOGINBUT flex justify-center items-center' onClick={onClick}>
      {loading ? (<div className="load"></div>) : (
        checkMark ? (<FontAwesomeIcon icon={faCheck} size='xl' />) : (
          xMark ? (<FontAwesomeIcon icon={faXmark} size='xl' />) : text
        )
      )}
    </button>
  );
}

export default LogInButton;
