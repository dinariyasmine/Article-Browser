import React, { useState, useEffect } from "react";
import ProfilePic from "../SearchPage/userPopUp";
import FavoritesButton from "../FavoritesPage/favoritesButton";
import axios from 'axios';


/**
 * DetailArticleNavbar component represents the navbar for the detail article page.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the article.
 * @returns {JSX.Element} JSX element for the DetailArticleNavbar component.
 */

const DetailArticleNavbar = ({ title }) => {
  // Retrieve user information from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Retrieve the selected article from local storage
  const articleEnCours = JSON.parse(localStorage.getItem('selectedArticle'));
  console.log("id of article stored", articleEnCours.id);

  // State to track whether the article is marked as a favorite
  const [isFavorite, setIsFavorite] = useState(false);


  /**
   * useEffect hook to fetch the favorite status of the article when the component mounts.
   */
  useEffect(() => {
    // Fetch the favorite articles of the user
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/app/get_favorite_articles/", {
          user_id: user.id,
        });

        console.log('Response:', response.data);

        // Check if the current article is in the user's favorite articles
        if (response.data.favorite_articles) {
          const favoriteArticleIds = response.data.favorite_articles.map(article => article.id);
          console.log('Favorite Article IDs:', favoriteArticleIds);
          setIsFavorite(favoriteArticleIds.includes(articleEnCours.id));
        }
      } catch (error) {
        console.error("Error fetching favorite articles:", error);
      }
    };

    fetchFavoriteStatus();
  }, [user.id, articleEnCours.id]);


  /**
   * handleAddToFavorites function handles the addition/removal of the article to/from favorites.
   */
  const handleAddToFavorites = async () => {
    try {
      console.log('here');
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
        {/* The favorite add/remove button */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-pink"></div>
      </div>
      {/* Right side of the navbar */}
      <div className="flex flex-row -mt-10 mr-5">
        <FavoritesButton isFavorite={isFavorite} onClick={handleAddToFavorites} />
        <button>
          <ProfilePic />
        </button>
      </div>
    </div>
  );
}

export default DetailArticleNavbar;
