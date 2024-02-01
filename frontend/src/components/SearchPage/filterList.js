import React, { useState, useEffect } from 'react';
import FilterListItem from './filterListItem';

const FilterList = ({ options }) => {
  const [checkedItems, setCheckedItems] = useState(Array(options.length).fill(false));

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleCheckboxClick = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = [...prevCheckedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      console.log("new checked :",newCheckedItems);
      return newCheckedItems;
      
    });
  };

  const getCheckedItems = () => {
    return options.filter((_, index) => checkedItems[index]);
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
