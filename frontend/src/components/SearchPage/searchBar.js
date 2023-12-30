import React, { useState } from 'react';
import LoopeFlou from '../../assets/loopFlou.png';
import ActiveLoope from '../../assets/loop.png';

const SearchBar = ({ onSearch }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleInputBlur = () => {
    setIsClicked(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Check if the input is empty, and update the search results accordingly
    if (onSearch) {
      if (inputValue.trim() === '') {
        onSearch(''); // Pass an empty query to indicate no search
      }
    }
  };

  const handleSearchClick = () => {
    // Check if the input contains a value before triggering the search
    if (onSearch && searchInput.trim() !== '') {
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="flex items-center w-5/6 relative ml-14">
      <img
        src={isClicked ? ActiveLoope : LoopeFlou}
        alt="Search Loope Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
      />
      <input
        type="search"
        className={`font-montserrat flex-1 outline-none shadow-inner rounded-full py-2 px-4 pl-12 bg-image ${
          isClicked ? 'focus:border-pink-500 border-2 border-pink' : ''
        }`}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={searchInput}
        style={{
          boxShadow: isClicked ? 'inset 0 0 5px pink' : 'none',
        }}
      />

      <button
        className="ml-4 text-white font-montserrat bg-pink rounded-full px-8 py-2 hover:bg-pink-700"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
