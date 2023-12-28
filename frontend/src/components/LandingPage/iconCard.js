import React from "react";
const iconCard=({imgUrl})=>{
    return(
        <div className="bg-gray-100 rounded-full h-fit w-fit">
                  <img src={imgUrl} alt="Icon" className="p-3"/>
        </div>
  
    )


}
export default iconCard;