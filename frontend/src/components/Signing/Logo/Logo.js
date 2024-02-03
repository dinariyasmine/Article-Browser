import React from 'react';
import './Logo.css';

/**
 * Logo component for displaying the application logo.
 *
 * @component
 * @returns {JSX.Element} Logo component
 */
function Logo() {
  return (
    <p className='LOGO'>
      SciQuest <span className='POINT'>.</span>
    </p>
  );
}

export default Logo;
