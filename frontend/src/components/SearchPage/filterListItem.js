// FilterListItem.jsx
import React from 'react';

/**
 * FilterListItem component for rendering an individual filter option with a checkbox.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.option - The filter option to be displayed.
 * @param {boolean} props.isChecked - Indicates whether the checkbox is checked or not.
 * @param {function} props.onCheckboxClick - The function to be called when the checkbox is clicked.
 * @param {boolean} props.isFirst - Indicates whether this is the first item in the list.
 * @param {boolean} props.isLast - Indicates whether this is the last item in the list.
 * @returns {JSX.Element} React component
 */

const FilterListItem = ({ option, isChecked, onCheckboxClick, isFirst, isLast }) => {
  // Determine the container's className based on whether it's the first or last item
  const containerClassName = `flex items-center space-x-2 border p-2 ${
    isFirst ? 'rounded-tl-lg rounded-tr-lg' : ''
  } ${isLast ? 'rounded-bl-lg rounded-br-lg' : ''}`;

  return (
    <div className={containerClassName}>
      {/* Display the filter option with ellipsis for overflow */}
      <span className='ml-4 w-3/4 overflow-hidden overflow-ellipsis whitespace-normal text-darkBlue  font-extralight '>{option}</span>

      {/* Checkbox with label */}
      <label className="flex items-center cursor-pointer ">
        <div
          className={`w-5 h-5 border rounded-full flex items-center justify-center transition duration-200 ease-in-out 
            ${isChecked ? 'bg-gray-200 border-lightBlue' : 'bg-gray-200'}`}
          onClick={onCheckboxClick}
        >
          {isChecked && (
            <div className="w-3 h-3 bg-lightBlue rounded-full transform scale-100 transition duration-300 ease-in-out"></div>
          )}
        </div>
      </label>
    </div>
  );
};

export default FilterListItem;
