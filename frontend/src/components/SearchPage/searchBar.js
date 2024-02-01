import React, { useState } from 'react';
import LoopeFlou from '../../assets/loopFlou.png';
import ActiveLoope from '../../assets/loop.png';
import axios  from "axios";

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
      const isEmpty = inputValue.trim() === '';
      onSearch(inputValue.trim(), isEmpty); // Pass the input value and a flag indicating if it's empty
    }};



    const handleSearchClick = async () => {
      try {
        console.log("i was triggered");
    
        const response = await axios.post('http://127.0.0.1:8000/articles/search/', {
          searchBarContent: searchInput,
        });
    
    
        // Pass the entire response object to the parent component
        if (onSearch) {
          onSearch(response); // Pass the entire response object
        }
      } catch (error) {
        // Handle errors here
        console.error('Error during search:', error.message);
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
