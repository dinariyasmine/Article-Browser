import React, { useState } from 'react';
import FilterListItem from './filterListItem';

const FilterList = ({ options, onSelect }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  // Check if options is an array before mapping
  if (!Array.isArray(options)) {
    console.error('Options must be an array.');
    return null; // or return an empty div or a message
  }

  const handleCheckboxClick = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  
    // Call the onSelect callback with the updated checked items
    onSelect(getCheckedItems());
  };
  

  // Function to get the items with isChecked set to true
  const getCheckedItems = () => {
    return options.filter((option, index) => checkedItems[index]);
  };

  return (
    <div className="flex flex-col mb-5">
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
      <div>
        <p>Checked Items:</p>
        <ul>
          {getCheckedItems().map((checkedItem, index) => (
            <li key={index}>{checkedItem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterList;
