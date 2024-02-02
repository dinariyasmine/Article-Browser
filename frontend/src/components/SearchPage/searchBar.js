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
          console.log("I was triggered by:", searchInput);
  
          const response = await axios.post('http://127.0.0.1:8000/app/search/', {
              query: searchInput,
          });
          console.log("res",response);
  
          // Check if the response status is in the 2xx range (success)
          if (response.status >= 200 && response.status < 300) {
              // Pass the entire response object to the parent component
              if (onSearch) {
                  onSearch(response); // Pass the entire response object
              }
          } else {
              // Handle non-success status codes
              console.error(`Error during search - Server responded with status ${response.status}`);
          }
      } catch (error) {
          // Handle network errors or other exceptions
          if (error.response) {
              // The request was made, but the server responded with a non-success status code
              console.error(`Error during search - Server responded with status ${error.response.status}`);
          } else if (error.request) {
              // The request was made, but no response was received
              console.error('Error during search - No response received from the server');
          } else {
              // Something else happened while setting up the request
              console.error('Error during search - Request setup error:', error.message);
          }
      }
  };
  
    

  return (
    <div className="flex items-center w-5/6 relative ml-14 max-sm:ml-10">
      <img
        src={isClicked ? ActiveLoope : LoopeFlou}
        alt="Search Loope Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 "
      />
      <input
        type="search"
        className={`font-montserrat flex-1 outline-none shadow-inner rounded-full py-2 px-4 max-sm:px-3 pl-12 max-sm:pl-10  bg-image ${
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
        className="ml-4 text-white font-montserrat bg-pink rounded-full px-8 py-2 hover:bg-pink-700 max-sm:ml-2 max-sm:px-6 "
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
