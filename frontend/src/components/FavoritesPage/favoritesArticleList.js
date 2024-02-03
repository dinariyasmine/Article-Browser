import React from 'react';
import FavoritesArticle from './favoritesArticle';

/**
 * FavoritesArticleList component for displaying a list of favorite articles.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.articles - An array of article objects to be displayed in the list.
 * @returns {JSX.Element} React component
 */
const FavoritesArticleList = ({ articles }) => {
  return (
    <div className='mb-5'>
      {/* Map through the articles array and render each favorite article */}
      {articles.map((article) => (
        <FavoritesArticle
          key={article.id}  
          article={article}  
        />
      ))}
    </div>
  );
};

export default FavoritesArticleList;
