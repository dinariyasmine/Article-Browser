import React, { useState } from "react";
import ProfilePic from "../SearchPage/userPopUp";
import FavoritesButton from "../FavoritesPage/favoritesButton";
import axios from 'axios';

const DetailArticleNavbar = ({ title }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const articleEnCours = JSON.parse(localStorage.getItem('selectedArticle'));
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = async () => {
    try {
      console.log('here')
      const response = await axios.post(
        'http://127.0.0.1:8000/app/add_to_favorites/',
        {
          user_id: user.id,
          article_id: articleEnCours.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.csrfToken,
          },
          withCredentials: true,
        }
      );

      console.log('Response:', response.data);

      // Update the state based on the response
      setIsFavorite(response.data.status === 'Added to favorites');

    } catch (error) {
      console.error('Error adding to favorites:', error.response.data);
      // Handle the error as needed
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      {/* Left side of the navbar */}
      <div className="flex items-center">
        <div className="-ml-28 -mt-36 w-56 h-56 rounded-full bg-darkBlue"></div>
      </div>
      <div className="relative">
        <p className="text-xl text-darkBlue font-bold mb-2 max-sm:text-xl max-sm:mt-32">{title}</p>
        {/* Underline effect using Tailwind CSS classes */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-pink"></div>
      </div>
      {/*Right side of the navbar*/}
      <div className="flex flex-row -mt-10 mr-5 max-sm:-mt-20">
        <FavoritesButton isFavorite={isFavorite} onClick={handleAddToFavorites} />
        <button>
          <ProfilePic />
        </button>
      </div>
    </div>
  );
}

export default DetailArticleNavbar;
