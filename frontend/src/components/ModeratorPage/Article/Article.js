import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Article.css'

const Article = (Props) => {
  return (
    <div id='ArticleDiv'>
        <div id='ArticlesInfos'>
            <h2 id='ArticleTitle'>{Props.title}</h2>
            <p id='Keywords'>{Props.keywords}</p>
            <p id='dateAuthor'>{Props.date}, {Props.author}</p>
        </div>
        <FontAwesomeIcon icon={faBars} size="3x"/>
    </div>
  )
}

export default Article