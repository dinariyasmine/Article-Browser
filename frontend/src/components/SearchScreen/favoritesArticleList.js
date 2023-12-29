import React from 'react';
import FavoritesArticle from './favoritesArticle'; 

const FavoritesArticleList = ({ articles }) => {
  return (
    <div className='mb-5'>
      {articles.map((article, index) => (
        <FavoritesArticle
          key={index}
          title={article.title}
          keywords={article.keywords}
          PublishDate={article.PublishDate}
          Author={article.Author}
        />
      ))}
    </div>
  );
};

export default FavoritesArticleList;
