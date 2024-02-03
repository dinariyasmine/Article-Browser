import React from "react";
import ProfilePic from "../SearchPage/userPopUp";

/**
 * FavoritesNavbar component for displaying the navbar in the FavoritesPage.
 * @returns {JSX.Element} React component
 */
const FavoritesNavbar = () => {
    return (
        <div className="flex justify-between items-center p-4 ">
          {/* Left side of the navbar */}
          <div className="flex items-center">
            {/* Placeholder for user profile picture */}
            <div className="-ml-28 -mt-36 w-56 h-56  rounded-full bg-darkBlue"></div>
          </div>
    
          <div className="relative">
            {/* Title for the Favorites Page */}
            <p className="text-3xl text-darkBlue font-bold mb-2">{"Favorites Articles"}</p>
          </div>   
          
          {/* Right side of the navbar */}
          <div className="-mt-5 mr-5">
            {/* Button to display user profile picture */}
            <button className="max-sm:-mt-14">
              <ProfilePic/>
            </button>
          </div>
        </div>
    );
}

export default FavoritesNavbar;
