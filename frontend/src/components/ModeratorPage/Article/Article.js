import React from 'react';
import './Article.css';
import ArticleIcon from "../../../assets/articleIcon.png";
import { Link } from 'react-router-dom';

/**
 * Article component for displaying article information and linking to details.
 *
 * @component
 * @param {Object} props - The properties of the Article component.
 * @param {number} props.index - The index of the article.
 * @param {Object} props.article - The article object containing information.
 * @returns {JSX.Element} Article component
 */
const Article = (props) => {

  const formattedKeywords = props.article.keywords;
  const formattedauthors = props.article.authors;

  /**
   * Handles button click to store the article object in local storage.
   */
  const handleButtonClick = () => {
    // Store the article object in local storage
    localStorage.setItem('selectedArticle', JSON.stringify(props.article));
    console.log('Article stored in local storage:', props.article);
    console.log('Article ID:', props.article.id);
  };

  // Extract publish date information
  const publishDate = new Date(props.article.date);
  const day = publishDate.getDate();
  const month = publishDate.toLocaleString('default', { month: 'long' });
  const year = publishDate.getFullYear();

  return (
    <Link to={{ pathname: `/ModeratorSpace/${props.index}`, state: props.article }} className='w-full flex justify-center items-center flex-col'>
      <div id='ArticleDiv' onClick={handleButtonClick}>
        <div id='ArticlesInfos'>
          <h2 id='ArticleTitle'>{props.article.title}</h2>
          <p id='Keywords'>{formattedKeywords}</p>
          <p id='dateAuthor'>{day} {month} {year}, {formattedauthors}</p>
        </div>
        <img
          src={ArticleIcon}
          alt="Search Loope Icon"
          className="ml-auto mr-5"
        />  
      </div>
    </Link>
  );
}

export default Article;
