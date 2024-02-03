import React from 'react';
import './AuthentificationTitle.css';

/**
 * AuthentificationTitle component for displaying the title in the authentication section.
 *
 * @component
 * @param {Object} Props - The properties of the AuthentificationTitle component.
 * @param {string} Props.title - The title text to be displayed.
 * @returns {JSX.Element} AuthentificationTitle component
 */
const AuthentificationTitle = (Props) => {
  return (
    <h1 className='AUTHTIT'>
      {Props.title}
    </h1>
  );
}

export default AuthentificationTitle;
