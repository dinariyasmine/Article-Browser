import React,{useState} from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchPage/searchBar";
import FilterBar from "../components/SearchPage/filterBar";
import DateButton from "../components/SearchPage/dateButton";
import ClosedArticleList from "../components/SearchPage/closedArticleList";
import searchPic from "../assets/searchPic.png";
import ProfilePic from "../components/SearchPage/userPopUp";
import favoritesPic from "../assets/fullHeart.png";


/**
 * SearchPage component for displaying the main search page.
 * @returns {JSX.Element} React component
 */
const SearchPage =()=>{
  // State for filtering lists
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // Callback functions to update StartDate and EndDate
  const handleStartDateSelect = (selectedDate) => {
    setStartDate(selectedDate);
  };

  const handleEndDateSelect = (selectedDate) => {
    setEndDate(selectedDate);
  };
  const handleKeywordSelect = (selectedOptions) => {
    console.log("Selected Keywords:", selectedOptions);
    setSelectedKeywords(selectedOptions);
    
  };
  
  
  const handleAuthorSelect = (selectedOptions) => {
    console.log("Selected Keywords:", selectedOptions);
    setSelectedAuthors(selectedOptions);
  };
  
  const handleInstitutionSelect = (selectedOptions) => {
    setSelectedInstitutions(selectedOptions);
  };
  

  
   // State for search results
  const [showFoundArticlesList, setShowFoundArticlesList] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [institutionsList, setinstitutionsList] = useState('');
  const [authorsList, setauthorsList] = useState('');
  const [keywordsList, setKeywordsList] = useState('');

  // Use this function to convert comma-separated strings into arrays
  const convertStringToArray = (str) => {
    return str.split(',').map((item) => item.trim());
  };

  // Callback function to handle search button click
  const handleSearchButtonClick = (response) => {
    // Check if the response and response.data are defined
    if (response && response.data && response.data.result) {
      // Access the array of articles
      const articles = response.data.result;
  
      // Check if articles are present in the response
      if (articles && Array.isArray(articles)) {
        // Format the articles to match the closedArticles structure
        const formattedArticles = articles.map((article, index) => ({
          id: index.toString(),
          id2: article.id,
          title: article.title,
          institutions: article.institutions,
          keywords: article.keywords,
          publishDate: article.date,
          authors: article.authors,
          abstract: article.abstract,
          integralText: article.text,
          references: article.references,
        }));
  
        
  
        // Extract arrays of unique values
          const allInstitutions = formattedArticles.length > 0
          ? Array.from(new Set(formattedArticles.flatMap(article => convertStringToArray(article.institutions))))
          : [];
        const allAuthors = formattedArticles.length > 0
          ? Array.from(new Set(formattedArticles.flatMap(article => convertStringToArray(article.authors))))
          : [];
        const allKeywords = formattedArticles.length > 0
          ? Array.from(new Set(formattedArticles.flatMap(article => convertStringToArray(article.keywords))))
          : [];
  
        // Put the options lists in the corresponding state variables
        setauthorsList(allAuthors);
        setinstitutionsList(allInstitutions);
        setKeywordsList(allKeywords);

  
        // Set the search query and proceed with the search
        setSearchQuery(formattedArticles);
        setShowFoundArticlesList(true);
      } else {
        // No valid articles found in the response
        setShowFoundArticlesList(false);
        console.error('Invalid or empty articles array in the response.');
          }
        } else {
          // Invalid or empty response
          setShowFoundArticlesList(false);
          console.error('Invalid or empty response.');
        }
  };
  

  
  // Callback function to filter articles based on selected filters
  const filterArticles = () => {
  
    // Filter articles based on selected keywords, authors, and institutions
    setSearchQuery(searchQuery.filter((article) => {
      const keywordCondition = selectedKeywords.length === 0 || selectedKeywords.every((keyword) =>
        article.keywords.includes(keyword)
      );

      const authorCondition = selectedAuthors.length === 0 || selectedAuthors.every((author) =>
        article.authors.includes(author)
      );

      const institutionCondition = selectedInstitutions.length === 0 || selectedInstitutions.every((institution) =>
        article.institutions.includes(institution)
      );

      // Date filtering conditions
      const articleDate = new Date(article.publishDate);
      const startDateCondition = !startDate || articleDate >= new Date(startDate).setHours(0, 0, 0, 0);
      const endDateCondition = !endDate || articleDate <= new Date(endDate).setHours(0, 0, 0, 0) + 86400000; // Add 24 hours to include the end date
  
  
      // Return true only if all conditions are met
      return keywordCondition && authorCondition && institutionCondition && startDateCondition && endDateCondition;
    }));
  };
  
  
    const showClosedArticleList = searchQuery.length > 0;


    return (
      <div className="font-montserrat  h-screen flex flex-col-reverse sm:flex-row">
      {/* First Column */}
      <div className="sticky bg-lightBlue h-screen overflow-y-auto w-full sm:w-4/6 sm:mb-14 max-sm:h-full">
        <p className="text-3xl font-bold text-darkBlue mt-16 mb-5 ml-20 max-sm:ml-16 max-sm:text-2xl max-sm:mb-7">What are you looking for?</p>
        <SearchBar onSearch={handleSearchButtonClick} />
        {showClosedArticleList && showFoundArticlesList ? (
          <ClosedArticleList articles={searchQuery} />
        ) : (
          <img src={searchPic} alt="Search Page Pic" className="w-1/3 mt-10 ml-48 max-sm:ml-28 max-sm:mb-20" />
        )}
      </div>

      {/* Second Column for the filters and Navbar */}
      <div className="font-montserrat mt-5 h-screen ml-auto mr-14 overflow-y-auto no-scrollbar max-sm:ml-24 max-sm:mb-8">
        <div className="flex mb-20 ml-32 max-sm:ml-40 max-sm:mb-14">
          <Link to={{ pathname: `/favorites` }}>
            <button>
              <img src={favoritesPic} alt="Search Page Pic" className="w-12 h-12 mr-6" />
            </button>
          </Link>
          <button>
            <ProfilePic />
          </button>
        </div>

        {/* Rest of your second column content */}
        <FilterBar title={"Keywords"} listOfOptions={keywordsList} onSelect={handleKeywordSelect} />
        <FilterBar title={"Authors"} listOfOptions={authorsList} onSelect={handleAuthorSelect} />
        <FilterBar title={"Institutions"} listOfOptions={institutionsList} onSelect={handleInstitutionSelect} />
        <DateButton date={"Start Date"} onDateSelect={handleStartDateSelect} />
        <DateButton date={"End Date"} onDateSelect={handleEndDateSelect} />

        <button className="mt-3 flex items-center" onClick={filterArticles}>
          <p className="bg-pink text-white rounded-full w-64 max-sm:w-64 py-2 max-sm:py-3 hover:bg-pink-700">Filtrer Resultat</p>
        </button>
        </div>
      </div>
          );
          
      }
      export default SearchPage;

