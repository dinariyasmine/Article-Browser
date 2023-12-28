import React from "react";

const cardLandingPage = ({ title, text }) => {
  return (
    <div className=" m-12 flex flex-col items-center justify-center w-72 text-center bg-lightBlue rounded-3xl text-black">
        <div className="py-6 px-4">
        <p className="text-lg font-montserrat font-bold mb-3 ">{title}</p>
      <p className=" font-montserrat font-regular text-sm">{text}</p>
        </div>
    
    </div>
  );
};

export default cardLandingPage;
