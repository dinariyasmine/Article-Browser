import React from 'react';
import { Link } from 'react-router-dom';
import ArticleIcon from "../../assets/articleIcon.png";

/**
 * ClosedArticle component for displaying a closed (non-expandable) article in the list.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.article - The article object containing information like title, keywords, publish date, authors, etc.
 * @returns {JSX.Element} React component
 */

const ClosedArticle = ({ article }) => {
  // Format keywords as a string
  let formattedKeywords;
  let formattedAuthors;

  if (Array.isArray(article.keywords)) {
    formattedKeywords = article.keywords.join(' , ');
  } else {
    formattedKeywords = article.keywords ? article.keywords : ''; // Assuming it's a single keyword or undefined
  }

  // Format authors as a string
  if (Array.isArray(article.authors)) {
    formattedAuthors = article.authors.join(', ');
  } else {
    formattedAuthors = article.authors ? article.authors : ''; // Assuming it's a single author or undefined
  }

  // Extract day, month, and year from the publishDate
  const publishDate = new Date(article.publishDate);
  const day = publishDate.getDate();
  const month = publishDate.toLocaleString('default', { month: 'long' });
  const year = publishDate.getFullYear();


  /**
     * Handles the click event on the button.
     * Stores the article object in local storage.
     */
  const handleButtonClick = () => {
    // Store the article object in local storage
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    console.log('Article stored in local storage:', article);
  };

  return (
    <div className="mt-5">
      <button
        className={`ml-14 w-4/6 flex items-center bg-white rounded-3xl py-3 border transition duration-300 ease-in-out hover:bg-gray-100 relative`}
        onClick={handleButtonClick}>
        <div className='w-3/4'>
          <Link to={{ pathname: `/UserSpace/ArticleDetails/${article.id}`, state: { article: article } }}>
            <p className="text-left pl-5 font-extrabold text-lg text-darkBlue">{article.title}</p>
          </Link>
          <p className="text-left pl-5 font text-lightBlue">{formattedKeywords}</p>
          <p className="text-left pl-5 font-thin text-darkBlue ">{`${day} ${month} ${year}`} , {formattedAuthors}</p>
        </div>
        <div className="w-1/4 ">
          <img
            src={ArticleIcon}
            alt="Search Loope Icon"
            className="ml-auto mr-5"
          />
        </div>
      </button>
    </div>
  );
};

export default ClosedArticle;
