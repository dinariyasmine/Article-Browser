// FilterListItem.jsx
import React from 'react';

const FilterListItem = ({ option, isChecked, onCheckboxClick, isFirst, isLast }) => {
  const containerClassName = `flex items-center space-x-2 border p-2 ${
    isFirst ? 'rounded-tl-lg rounded-tr-lg' : ''
  } ${isLast ? 'rounded-bl-lg rounded-br-lg' : ''}`;

  return (
    <div className={containerClassName}>
      <span className='ml-4 w-3/4 overflow-hidden overflow-ellipsis whitespace-normal'>{option}</span>
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
