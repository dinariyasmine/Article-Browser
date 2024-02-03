// TextFiled.js
import React from 'react';
import './TextFiled.css';

/**
 * TextFiled component for rendering input fields.
 *
 * @component
 * @param {Object} props - The properties of the TextFiled component.
 * @param {string} props.text - The label for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The function called when the input value changes.
 * @param {string} [props.type] - The type of the input field (default is 'text').
 * @returns {JSX.Element} TextFiled component
 */
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
