import React from "react";

/**
 * CardLandingPage component for displaying a card with a title and text on the landing page.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.text - The text content of the card.
 * @returns {JSX.Element} React component
 */
const CardLandingPage = ({ title, text }) => {
  return (
    <div className="m-12 flex flex-col items-center justify-center w-72 text-center bg-lightBlue rounded-3xl text-black">
      <div className="py-6 px-4">
        {/* Title */}
        <p className="text-lg font-montserrat font-bold mb-3 ">{title}</p>
        
        {/* Text Content */}
        <p className="font-montserrat font-regular text-sm">{text}</p>
      </div>
    </div>
  );
};

export default CardLandingPage;
