import React, { useState, useEffect } from "react";
import favoritesPic from "../../assets/emptyHeart.png";
import activeFavoritesPic from "../../assets/redHeart.png";
import axios from 'axios';

/**
 * FavoritesButton component for adding/removing an article from user favorites.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the article.
 * @param {string} props.articleId - The ID of the article.
 * @param {string} props.userId - The ID of the user.
 * @returns {JSX.Element} React component
 */
const FavoritesButton = ({ title, articleId, userId }) => {
  // State to track whether the article is in favorites or not
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get user and selected article from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const article = JSON.parse(localStorage.getItem('selectedArticle'));

  // Function to handle adding/removing from favorites
  const handleOnclickFavorite = async () => {
    try {
      if (isFavorite) {
        // If already in favorites, remove from favorites
        const response = await axios.post(
          'http://127.0.0.1:8000/app/delete_from_favorites/',
          {
            user_id: user.id,
            article_id: article.id2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setIsFavorite(false);
          console.log(response.data.status);
        } else {
          console.error(response.data.status);
        }
      } else {
        // If not in favorites, add to favorites
        const response = await axios.post(
          'http://127.0.0.1:8000/app/add_to_favorites/',
          {
            user_id: user.id,
            article_id: article.id2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setIsFavorite(true);
          console.log(response.data.status);
        } else {
          console.error(response.data.status);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Effect to check if the article is in favorites when the component mounts
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/app/is_favorite/',
          {
            user_id: user.id,
            article_id: article.id2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          // Set isFavorite based on the response
          setIsFavorite(response.data.is_favorite);
        } else {
          console.error(response.data.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Call the function to check if the article is a favorite
    checkIfFavorite();
  }, [user.id, article.id2]);

  // Render the favorites button with appropriate image based on isFavorite state
  return (
    <button onClick={handleOnclickFavorite} className="max-sm:-mt-20 max-sm:mr-4 ">
      <img
        src={isFavorite ? activeFavoritesPic : favoritesPic}
        alt="Favorites"
        className="w-10 h-10 mr-6 mb-1 max-sm:w-20 max-sm:h-12 "
      />
    </button>
  );
};

export default FavoritesButton;
