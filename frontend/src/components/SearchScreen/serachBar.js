import React from 'react';
import LoopeFlou from "../../assets/loopFlou.png";

const SearchBar = () => {
  return (
    <div className="flex items-center w-5/6 relative ml-14">
      <img
        src={LoopeFlou} 
        alt="Search Loope Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
      />
      <input
        type="search"
        className=" font-montserrat flex-1 outline-none shadow-md rounded-full py-2 px-4 pl-12 bg-image"  
      />


      
      <button className="ml-4 text-white font-montserrat bg-pink rounded-full px-8 py-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
