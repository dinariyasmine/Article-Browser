import React, { useState } from 'react';
import FilterListItem from './filterListItem';

/**
 * FilterList component for displaying a list of filter options with checkboxes.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.options - An array of filter options.
 * @param {function} props.onSelect - The function to be called when an option is selected.
 * @returns {JSX.Element} React component
 */

const FilterList = ({ options, onSelect }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  // Check if options is an array before mapping
  if (!Array.isArray(options)) {
    console.error('Options must be an array.');
    return null; // or return an empty div or a message
  }

  /**
   * Handles the click event on the checkbox.
   * Updates the checkedItems state and calls the onSelect callback with selected options.
   * @param {number} index - The index of the clicked checkbox.
   */
  const handleCheckboxClick = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
  
      const selectedOptions = options.filter((option, idx) => newCheckedItems[idx]);
      onSelect(selectedOptions);
  
      return newCheckedItems;
    });
  };
  

  /**
   * Gets the items with isChecked set to true.
   * @returns {Array} - An array of selected options.
   */
  const getCheckedItems = () => {
    return options.filter((option, index) => checkedItems[index]);
  };

  return (
    <div className="flex flex-col mb-5 max-sm:w-11/12">
      {options.map((option, index) => (
        <FilterListItem
          key={index}
          option={option}
          isChecked={checkedItems[index]}
          onCheckboxClick={() => handleCheckboxClick(index)}
          isFirst={index === 0}
          isLast={index === options.length - 1}
        />
      ))}
      
    </div>
  );
};

export default FilterList;
