import React from 'react';
import './Sign.css';
import { Link } from 'react-router-dom';

/**
 * Sign component for displaying a link to sign in or sign up.
 *
 * @component
 * @param {Object} Props - The properties of the Sign component.
 * @param {string} Props.account - The text indicating whether the user has an account.
 * @param {string} Props.sign - The action the user can take (e.g., 'in' or 'up').
 * @returns {JSX.Element} Sign component
 */
const Sign = (Props) => {
  return (
    <p>
      {Props.account} <Link to={{ pathname: `/sign${Props.sign}` }}><span>Sign {Props.sign}</span></Link>
    </p>
  );
};

export default Sign;
