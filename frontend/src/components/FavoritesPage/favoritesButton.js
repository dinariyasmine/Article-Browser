import React , {useState} from "react";
import favoritesPic from "../../assets/emptyHeart.png";
import activeFavoritesPic from "../../assets/redHeart.png";



const DetailArticle =({title})=>{
  const [isFavorite,setIsFavorite]=useState(false);
  const handleOnclickFavorite = () => {
    // Toggle the active state to fill/ empty the heart
    setIsFavorite((prev) => !prev);
  };
    return (
            <button onClick={handleOnclickFavorite}>
              <img src={isFavorite? activeFavoritesPic:favoritesPic} alt="Favorites" className="w-10 h-10 mr-6 mb-1 max-sm:w-8 max-sm:h-8 " />
            </button>
        
      );
}
export default DetailArticle;