import React, { useState, useEffect } from 'react';
import './ModeratorPage.css';
import Article from '../../components/ModeratorPage/Article/Article';
import ProfilePic from "../../components/SearchPage/userPopUp";
import axios from 'axios';

/**
 * ModeratorPage component for displaying recently uploaded articles.
 *
 * @component
 * @returns {JSX.Element} ModeratorPage component
 */
const ModeratorPage = () => {
  // State variable to store the list of articles
  const [articles, setArticles] = useState([]);

  // Fetch articles from the Django backend API when the component mounts
  useEffect(() => {
    // Define the Django backend API endpoint for retrieving articles
    const apiUrl = 'http://127.0.0.1:8000/app/not_validated/';

    // Fetch articles using Axios
    axios.get(apiUrl)
      .then(response => {
        // Assuming the response structure has a 'result' key containing the articles
        setArticles(response.data.result);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className='moderatorPage'>
      <div className='Up flex justify-between items-center'>
        <div style={{ width: '5%' }}></div>
        <h1 className='TITLE'>Recently Uploaded Articles</h1>
        <div className="image-container">
          <button>
            {/* Display the profile picture component */}
            <ProfilePic />
          </button>
        </div>
      </div>

      <div className='listArticles w-full'>
        {articles.map((article, index) => (
          <Article
            key={index} // Assuming 'index' is a suitable unique key for the Article component
            index={index}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default ModeratorPage;
