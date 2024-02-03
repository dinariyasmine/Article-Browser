import React from "react";

/**
 * IconCard component for displaying an icon within a rounded background.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.imgUrl - The URL of the icon image.
 * @returns {JSX.Element} React component
 */
const IconCard = ({ imgUrl }) => {
  return (
    <div className="bg-gray-100 rounded-full h-fit w-fit">
      {/* Icon Image */}
      <img src={imgUrl} alt="Icon" className="p-3" />
    </div>
  );
};

export default IconCard;
