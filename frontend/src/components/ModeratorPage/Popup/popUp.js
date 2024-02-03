import React from 'react';
import './popUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Functional component for a pop-up window.
 * @param {Object} props - Component properties.
 * @param {boolean} props.trigger - Boolean indicating whether the pop-up is triggered.
 * @param {Function} props.setTrigger - Function to set the pop-up trigger.
 * @param {number} props.index - Index to determine the type of pop-up.
 * @param {string} props.titre - Title of the article.
 * @param {string} props.resume - Summary of the article.
 * @param {string[]} props.auteurs - Array of authors of the article.
 * @param {string[]} props.institutions - Array of institutions related to the article.
 * @param {string[]} props.mots_cles - Array of keywords related to the article.
 * @param {string} props.references - References related to the article.
 * @returns {JSX.Element} JSX element representing the pop-up window.
 */
const PopUp = (props) => {
  const navigate = useNavigate();

  /**
   * Handles the deletion of an article.
   * @async
   * @returns {Promise<void>} Promise that resolves after handling the deletion.
   */
  const handleDeleteArticle = async () => {
    try {
      const storedArticle = localStorage.getItem('selectedArticle');
      const article0 = storedArticle ? JSON.parse(storedArticle) : {};

      // Assuming article0 has the 'id' property representing the article ID
      const articleId = article0.id;
      console.log('ID de l\'article qui va être supprimé :', articleId);

      // Make a POST request to delete the article
      const response = await axios.post('http://127.0.0.1:8000/app/delete_article/', { article_id: articleId });

      // Check the response status and handle accordingly
      if (response.status === 200) {
        console.log('Article deleted successfully');
        navigate('/ModeratorSpace');
        // Perform any additional actions after successful deletion
      } else {
        console.error('Failed to delete article');
        // Handle failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Error deleting article', error);
      // Handle errors, show an error message, etc.
    }
  };

  /**
   * Prepares modified data for saving changes to an article.
   * @returns {Object} Modified data for the article.
   */
  const prepareModifiedData = () => {
    const storedArticle = localStorage.getItem('selectedArticle');
    const article0 = storedArticle ? JSON.parse(storedArticle) : {};

    console.log('voici l\'article0', article0);
    const modifiedData = {
      article_id: article0.id,
      title: props.titre,
      abstract: props.resume,
      full_text: article0.text,
      pdf_url: article0.pdf_url,
      references: props.references,
      validated: true,
      authors: props.auteurs.join(', '),
      institutions: props.institutions.join(', '),
      keywords: props.mots_cles.join(', '),
      date: article0.date,
    };

    return modifiedData;
  };

  /**
   * Handles saving changes to an article.
   * @async
   * @returns {Promise<void>} Promise that resolves after handling the save changes.
   */
  const handleSaveChanges = async () => {
    try {
      const modifiedData = prepareModifiedData();

      // Make a POST request to update the article
      const response = await axios.post('http://127.0.0.1:8000/app/modify_article/', modifiedData);

      // Check the response status and handle accordingly
      if (response.status === 200) {
        console.log('Article modified successfully');
        navigate('/ModeratorSpace');
        // Perform any additional actions after successful modification
      } else {
        console.error('Failed to modify article');
        // Handle failure, show an error message, etc.
      }
    } catch (error) {
      console.error('Error modifying article', error);
      // Handle errors, show an error message, etc.
    }
  };

  // Array of objects defining pop-up types
  const items = [
    { icon: faCircleXmark, h1: 'Delete', p: 'If you click on Delete, this article will be permanently deleted. Are you sure you want to proceed?', button: 'Delete', color: '#EE4A4A' },
    { icon: faFloppyDisk, h1: 'Validate', p: 'If you click on Validate, the article will be displayed for users and you won’t be able to edit it again. Are you sure you want to proceed?', button: 'Validate', color: '#3AC6EB' }
  ];

  // JSX structure for the pop-up window
  return ((props.trigger) ?
    <>
      <div className="popValidatePage">
        <div className='popValidate w-1/3 flex justify-center items-center flex-col max-sm:w-4/5'>
          <FontAwesomeIcon icon={items[props.index].icon} size='5x' color={items[props.index].color} />
          <h1>{items[props.index].h1}</h1>
          <p>{items[props.index].p}</p>
          <div className="buttttons flex justify-center items-center w-full">
            <button style={{ background: '#AEAEAE', }} onClick={() => props.setTrigger(false)} >Cancel</button>
            <button style={{ background: items[props.index].color, }}
              onClick={() => {
                if (props.index === 0) {
                  handleDeleteArticle();
                }
                else {
                  handleSaveChanges();
                }
                // Close the popup
                props.setTrigger(false);
              }}>{items[props.index].button}</button>
          </div>
        </div>
      </div>
    </>
    : ""
  );
};

export default PopUp;