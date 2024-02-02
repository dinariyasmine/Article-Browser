import React , {useState} from "react";
import ProfilePic from "../SearchPage/userPopUp";
import FavoritesButton from "../FavoritesPage/favoritesButton";




const DetailArticleNavbar =({title})=>{
  const [isFavorite,setIsFavorite]=useState(false);
  const addRemoveFavorite = () => {
    // Toggle the active state
    setIsFavorite((prev) => !prev);

    // Implement logic to send a post request here when prev == false
    //Implement logic to send a delete request here when prev == true

  };
    return (
        <div className="flex justify-between items-center p-4 ">
          {/* Left side of the navbar */}
          <div className="flex items-center">
          <div className="-ml-28 -mt-36 w-56 h-56 rounded-full bg-darkBlue"></div>
          </div>
    
          <div className="relative">
            <p className="text-3xl text-darkBlue font-bold mb-2 max-sm:text-xl max-sm:mt-32">{title}</p>
        {/* Underline effect using Tailwind CSS classes */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-pink"></div>
        </div>   
          {/* Right side of the navbar */}
          <div className="-mt-10 mr-5 max-sm:-mt-20">
            <FavoritesButton onClick={addRemoveFavorite}></FavoritesButton>
            <button>
              <ProfilePic/>
            </button>
          </div>
        </div>
      );
}
export default DetailArticleNavbar;