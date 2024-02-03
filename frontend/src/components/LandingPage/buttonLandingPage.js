import React from "react";

/**
 * ButtonLandingPage component for the landing page button.
 * @returns {JSX.Element} React component
 */
const ButtonLandingPage = () => {
  return (
    <div className="font-montserrat font-semibold max-sm:text-sm">
      <button>
        {/* Button with Pink Background */}
        <div className="flex items-center justify-center w-52 h-10 rounded-3xl bg-pink">
          <p className="text-white text-base">Get Started</p>
        </div>
      </button>
    </div>
  );
};

export default ButtonLandingPage;
