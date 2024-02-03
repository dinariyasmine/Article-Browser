import React from 'react';
import { Link } from 'react-router-dom';
import ArticleIcon from "../../assets/articleIcon.png";

/**
 * FavoritesArticle component for displaying a single favorite article.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.article - The article object containing information like title, keywords, publish date, authors, etc.
 * @returns {JSX.Element} React component
 */
const FavoritesArticle = ({ article }) => {
  
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
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    console.log('Article stored in local storage:', article);
  };

  return (
    <div className="mt-5">
      <button
        className={`mx-14 w-11/12 flex items-center bg-gray-50 rounded-3xl py-3 border transition duration-300 ease-in-out hover:bg-gray-200 relative max-sm:mx-4`}
        onClick={handleButtonClick}>

        {/* Left Side Content */}
        <div className='w-3/4 '>
          {/* Link to Article Details Page */}
          <Link to={{ pathname: `/UserSpace/ArticleDetails/${article.id}`, state: { article: article } }}>
            <p className="text-left pl-5 font-extrabold text-lg text-darkBlue">{article.title}</p>
          </Link>
          <p className="text-left pl-5 font text-lightBlue">{article.keywords}</p>
          <p className="text-left pl-5 font-thin text-darkBlue ">{`${day} ${month} ${year}`} , {article.authors}</p>
        </div>

        {/* Right Side Content */}
        <div className="w-1/4 ">
          {/* Article Icon */}
          <img
            src={ArticleIcon}
            alt="Article Icon"
            className="ml-auto mr-5"
          />
        </div>
      </button>
    </div>
  );
};

export default FavoritesArticle;
