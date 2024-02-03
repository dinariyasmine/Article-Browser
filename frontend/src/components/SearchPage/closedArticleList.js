import React from 'react';
import ClosedArticle from './closedArticle';
/**
 * ClosedArticleList component for displaying a list of closed (non-expandable) articles.
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.articles - An array of article objects to be displayed in the list.
 * @returns {JSX.Element} React component
 */

const ClosedArticleList = ({ articles }) => {
  
  return (
    <div className='mb-5'>
      {/* Map through the articles array and render each closed article */}
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
