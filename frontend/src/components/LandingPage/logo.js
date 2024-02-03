import React from "react";

/**
 * Logo component for displaying the SciQuest logo.
 * @returns {JSX.Element} React component
 */
const Logo = () => {
  return (
    <div className="flex items-center font-montserrat font-bold">
      {/* SciQuest Text */}
      <p className="mr-1 text-2xl ">SciQuest</p>
      
      {/* Pink Dot */}
      <div className="w-2 h-2 rounded-full bg-pink mt-3"></div>
    </div>
  );
};

export default Logo;
