
import React, { useState } from 'react';
import FilterListItem from './filterListItem'; 

const FilterList = ({ options }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxClick = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
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
    </div>
  );
};

export default FilterList;
