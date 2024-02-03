import React from "react";

/**
 * TextLandingPage component for displaying welcome text on the landing page.
 * @returns {JSX.Element} React component
 */
const TextLandingPage = () => {
  return (
    <div>
      {/* Welcome Text */}
      <div className="flex flex-col items-left font-montserrat font-bold max-sm:text-sm">
        <p className="text-5xl text-darkBlue">Welcome to </p>
        <p className="text-3xl">
          <span className="text-5xl text-pink">SciQuest </span>
          <span className="text-5xl text-darkBlue">Explorer!</span>
        </p>
      </div>

      {/* Description Text */}
      <div className="w-5/6 ml-1 mt-5">
        <p className="text-lg">
          Unlock the wonders of academic discovery. Dive into a world of
          breakthroughs with our seamless scientific article search. Ready to
          explore?
        </p>
      </div>
    </div>
  );
};

export default TextLandingPage;
