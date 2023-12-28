import React from 'react';
import ClosedArticle from './closedArticle'; 

const ClosedArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <ClosedArticle
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

export default ClosedArticleList;
