import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoritesArticleList from "../components/FavoritesPage/favoritesArticleList";
import searchPic from "../assets/searchPic.png";
import Navbar from "../components/FavoritesPage/favoritesNavbar";

/**
 * FavoritesPage component for displaying the user's favorite articles.
 * @returns {JSX.Element} React component
 */
const FavoritesPage = () => {
  // State for storing favorite articles
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  // Fetch favorite articles from the server when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchFavoriteArticles = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/app/get_favorite_articles/", {
          user_id: user.id,
        });
    
        console.log("Server Response:", response.data.favorite_articles);
    
        if (response.data.favorite_articles) {
          // Format the received favorite articles data
          const formattedFavoriteArticles = response.data.favorite_articles.map((article, index) => ({
            id: index.toString(),
            id2: article.id2, 
            title: article.title,
            institutions: article.institutions,
            keywords: article.keywords,
            publishDate: article.date,
            authors: article.authors,
            abstract: article.abstract,
            integralText: article.text,
            references: 'xxxx',
          }));
    
          console.log("Favorite Articles heeeeeere:", formattedFavoriteArticles);
    
          // Set the formatted favorite articles to the state
          setFavoriteArticles(formattedFavoriteArticles);
        } else {
          console.error('Invalid or empty favorite articles array in the response.');
        }
      } catch (error) {
        console.error("Error fetching favorite articles:", error);
      }
    };

    fetchFavoriteArticles();
  }, []); // Empty dependency array to run the effect once when the component mounts

  // Check if there are favorite articles to display
  const showFavoriteArticleList = favoriteArticles.length > 0;

  return (
    <div className="font-montserrat max-sm:text-sm h-full ">
      {/* Favorites Navbar */}
      <Navbar />

      {/* Display either the list of favorite articles or a search pic */}
      {showFavoriteArticleList ? (
        <FavoritesArticleList articles={favoriteArticles} />
      ) : (
        <div className="flex justify-center items-center w-full">
          <img src={searchPic} alt="Search Page Pic" className="w-1/3 max-sm:w-4/5" />
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
