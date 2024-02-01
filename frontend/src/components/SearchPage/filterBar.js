import React, { useState } from 'react';
import Triangle from "../../assets/blackTriangle.png";
import FilterList from "../SearchPage/filterList";

const FilterBar = ({ title, listOfOptions,onSelect }) => {
  const [rotation, setRotation] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  

  const onClick = () => {
    setRotation(rotation + 180);
    setIsOpened(!isOpened);
  };

  return (
    <div className="">
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
      {isOpened &&<FilterList options={listOfOptions} onSelect={onSelect}/>}
    </div>
  );
};

export default FilterBar;
