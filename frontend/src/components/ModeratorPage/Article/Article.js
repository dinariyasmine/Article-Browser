import React from 'react'
import './Article.css'
import ArticleIcon from "../../../assets/articleIcon.png";
import { Link } from 'react-router-dom';


const Article = (props) => {
  const formattedKeywords = props.article.keywords.join(' , ');
  const formattedauthors = props.article.authors.join(' , ');
  const handleButtonClick = () => {
    // Store the article object in local storage
    localStorage.setItem('selectedArticle', JSON.stringify(props.article));
    console.log('Article stored in local storage:', props.article);
  };

  return (
    <Link to={{ pathname: `/articlemodif/${props.article.id}`, state: props.article }} className='w-full flex justify-center items-center flex-col'>
      <div id='ArticleDiv' onClick={handleButtonClick}>
        <div id='ArticlesInfos'>
            <h2 id='ArticleTitle'>{props.article.title}</h2>
            <p id='Keywords'>{formattedKeywords}</p>
            <p id='dateAuthor'>{props.article.date}, {formattedauthors}</p>
        </div>
        <img
          src={ArticleIcon}
          alt="Search Loope Icon"
          className="ml-auto mr-5"
        />  
      </div>
    </Link>
  )
}

export default Article

