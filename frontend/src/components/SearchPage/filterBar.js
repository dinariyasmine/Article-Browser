import React, { useState, useEffect } from 'react';
import Triangle from "../../assets/blackTriangle.png";
import FilterList from "../SearchPage/filterList";

/**
 * FilterBar component for displaying a filter button with a dropdown list of options.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the filter.
 * @param {Array} props.listOfOptions - An array of options for the filter.
 * @param {function} props.onSelect - The function to be called when an option is selected.
 * @returns {JSX.Element} React component
 */

const FilterBar = ({ title, listOfOptions, onSelect }) => {
  const [rotation, setRotation] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

   /**
   * Handles the click event on the filter button.
   * Toggles the rotation of the triangle icon and opens/closes the dropdown.
   */
  const onClick = () => {
    setRotation(rotation + 180);
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    // Ensure that selectedOptions is not an empty array before invoking onSelect
    if (selectedOptions.length > 0) {
      onSelect(selectedOptions);
    }
  }, [selectedOptions, onSelect]);



  /**
   * Handles the selection of options in the dropdown list.
   * Updates the selectedOptions state.
   * @param {Array} selected - The selected options.
   */
  const handleOptionSelect = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div className="">
      {/* Filter button */}
      <button
        className={` w-64 grid grid-cols-2 items-center text-darkBlue rounded-xl py-2 border transition duration-300 ease-in-out hover:bg-gray-50 mb-3
          ${isOpened ? 'border-lightBlue bg-gray-50' : 'border-gray-200'}`}
        onClick={onClick}
      >
        <p className="ml-5 col-start-1 col-end-1">{title}</p>
        <img
          src={Triangle}
          alt="triangle"
          className={`col-start-3 col-end-3 mr-8 transform ${isOpened ? 'rotate-180' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </button>
      {/* Display the dropdown list if opened */}
      {isOpened && <FilterList options={listOfOptions} onSelect={handleOptionSelect} />}
    </div>
  );
};

export default FilterBar;
