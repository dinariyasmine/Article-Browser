import React from 'react';
import FavoritesArticle from './favoritesArticle';

const FavoritesArticleList = ({ articles }) => {
  return (
    <div className='mb-5'>
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
