import React from 'react';
import { Link } from 'react-router-dom';
import ArticleIcon from "../../assets/articleIcon.png";


const FavoritesArticle = ({ article }) => {
  const formattedKeywords = article.keywords.join(' , ');

  const handleButtonClick = () => {
    // Store the article object in local storage
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    console.log('Article stored in local storage:', article);
  };

  return (
    <div className="mt-5 ">
      <Link to={{ pathname: `/detail/${article.id}`, state: { article: article } }}>
      <button
        className={`mx-14 w-11/12 flex items-center bg-gray-50 rounded-3xl py-3 border transition duration-300 ease-in-out hover:bg-gray-200 relative max-sm:mx-4`}
        onClick={handleButtonClick}> 
        <div className='w-3/4  '>
        <p className="text-left pl-5 font-extrabold text-lg text-darkBlue">{article.title}</p>
        <p className="text-left pl-5 font text-lightBlue">{formattedKeywords}</p>
        <p className="text-left pl-5 font-thin text-darkBlue ">{article.PublishDate} , {article.Authors}</p>
        </div>

        
        <div className="w-1/4 ">
          <img
            src={ArticleIcon}
            alt="Search Loope Icon"
            className="ml-auto mr-5"
          />
        </div>
      </button>
      </Link>
    </div>
  );
};

export default FavoritesArticle;
