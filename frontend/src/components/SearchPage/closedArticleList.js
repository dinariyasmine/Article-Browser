import React from 'react';
import ClosedArticle from './closedArticle';

const ClosedArticleList = ({ articles }) => {
  
  return (
    <div className='mb-5'>
      {articles.map((article) => (
        <ClosedArticle
          key={article.id}  // Use the unique id as the key
          article={article}  // Pass the entire article object as a prop
        />
      ))}
    </div>
  );
};

export default ClosedArticleList;
