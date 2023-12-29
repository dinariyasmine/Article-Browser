import React from "react";
import profilePic from "../../assets/userIcon.png";
import favoritesPic from "../../assets/emptyHeart.png";



const DetailArticle =()=>{
    return (
        <div className="flex justify-between items-center p-4 ">
          {/* Left side of the navbar */}
          <div className="flex items-center">
          <div className="-ml-28 -mt-36 w-56 h-56 rounded-full bg-darkBlue"></div>
          </div>
    
          <div className="relative">
            <p className="text-3xl text-darkBlue font-bold mb-2">{"Favorites Articles"}</p>
        </div>   
          {/* Right side of the navbar */}
          <div className="-mt-5 mr-5">
            <button>
              <img src={profilePic} alt="Profile" className="w-10 h-10" />
            </button>
          </div>
        </div>
      );
}
export default DetailArticle;