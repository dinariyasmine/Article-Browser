import React,{useState} from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchPage/searchBar";
import FilterBar from "../components/SearchPage/filterBar";
import DateButton from "../components/SearchPage/dateButton";
import ClosedArticleList from "../components/SearchPage/closedArticleList";
import searchPic from "../assets/searchPic.png";
import ProfilePic from "../components/SearchPage/userPopUp";
import favoritesPic from "../assets/fullHeart.png";


//Random data  for testing purposes
const optionsList = ['word 1', 'word 2', 'word 3'];
const closedArticles = [
    {
      id:'00',
      title: 'Article 1',
      Institutions :['Hello','Hello2'],
      keywords: ['React', 'JavaScript'],
      PublishDate: '2023-01-01',
      Authors: ['Author1','Author2'],
      Abstract:'Incididunt laboris deserunt in sint ad non quis ex consequat nulla adipisicing.',
      IntegralText:'Commodo ut quis minim laboris in proident occaecat enim tempor mollit eu cillum. Occaecat irure consequat cillum ut dolore. Excepteur ipsum eiusmod veniam pariatur. Ad laboris aliquip ea cupidatat aute. Mollit dolor sunt nostrud occaecat sunt cillum sunt et anim consequat laboris. Minim id sit cupidatat qui exercitation voluptate dolore. Ad ea aliquip laborum non aliqua.',
      References: ['Reference1','Reference2'],
    },
    {
      id:'01',
      title: 'Article 2',
      Institutions :['Hello','Hello2'],
      keywords: ['React', 'JavaScript'],
      PublishDate: '2023-01-01',
      Authors: ['Author1','Author2'],
      Abstract:'Incididunt laboris deserunt in sint ad non quis ex consequat nulla adipisicing.',
      IntegralText:'Commodo ut quis minim laboris in proident occaecat enim tempor mollit eu cillum. Occaecat irure consequat cillum ut dolore. Excepteur ipsum eiusmod veniam pariatur. Ad laboris aliquip ea cupidatat aute. Mollit dolor sunt nostrud occaecat sunt cillum sunt et anim consequat laboris. Minim id sit cupidatat qui exercitation voluptate dolore. Ad ea aliquip laborum non aliqua.',
      References: ['Reference1','Reference2'],
      },
      {
        id:'02',
        title: 'Article 3',
        Institutions :['Hello','Hello2'],
        keywords: ['React', 'JavaScript'],
        PublishDate: '2023-01-01',
        Authors: ['Author1','Author2'],
        Abstract:'Incididunt laboris deserunt in sint ad non quis ex consequat nulla adipisicing.',
        IntegralText:'Commodo ut quis minim laboris in proident occaecat enim tempor mollit eu cillum. Occaecat irure consequat cillum ut dolore. Excepteur ipsum eiusmod veniam pariatur. Ad laboris aliquip ea cupidatat aute. Mollit dolor sunt nostrud occaecat sunt cillum sunt et anim consequat laboris. Minim id sit cupidatat qui exercitation voluptate dolore. Ad ea aliquip laborum non aliqua.',
        References: ['Reference1','Reference2'],
      },
      {
        id:'03',
        title: 'Article 4',
        Institutions :['Hello','Hello2'],
        keywords: ['React', 'JavaScript'],
        PublishDate: '2023-01-01',
        Authors: ['Author1','Author2'],
        Abstract:'Incididunt laboris deserunt in sint ad non quis ex consequat nulla adipisicing.',
        IntegralText:'Commodo ut quis minim laboris in proident occaecat enim tempor mollit eu cillum. Occaecat irure consequat cillum ut dolore. Excepteur ipsum eiusmod veniam pariatur. Ad laboris aliquip ea cupidatat aute. Mollit dolor sunt nostrud occaecat sunt cillum sunt et anim consequat laboris. Minim id sit cupidatat qui exercitation voluptate dolore. Ad ea aliquip laborum non aliqua.',
        References: ['Reference1','Reference2'],
      }
   
  ];


  
const SearchPage =()=>{

  const [showFoundArticlesList, setShowFoundArticlesList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [institutionsList, setinstitutionsList] = useState('');
  const [authorsList, setauthorsList] = useState('');
  const [keywordsList, setKeywordsList] = useState('');

  const handleSearchButtonClick = (response) => {
    console.log("I am getting in !");
    
    // Check if the response and response.data are defined
    if (response && response.data) {
      // Access the entire response object and handle it accordingly
      // You can access response.data, response.status, etc.
  
      // Check if articles are present in the response
      const articles = response.data.articles;
  
      if (articles) {
        // Format the articles to match the closedArticles structure
        const formattedArticles = articles.map((article, index) => ({
          id: index.toString(),
          title: article.title,
          Institutions: article.institutions,
          keywords: article.keywords,
          PublishDate: article.publishDate,
          Authors: article.authors,
          Abstract: article.abstract,
          IntegralText: article.integralText,
          References: article.references,
        }));
        console.log("here too !");
        console.log("articles : ", formattedArticles);
  
        // Extract arrays of unique values
        const allInstitutions = Array.from(new Set(formattedArticles.flatMap(article => article.Institutions)));
        const allAuthors = Array.from(new Set(formattedArticles.flatMap(article => article.Authors)));
        const allKeywords = Array.from(new Set(formattedArticles.flatMap(article => article.keywords)));
  
        // Put the options lists in the corresponding state variables
        setauthorsList(allAuthors);
        setinstitutionsList(allInstitutions);
        setKeywordsList(allKeywords);
  
        console.log("All Institutions:", allInstitutions);
        console.log("All Authors:", allAuthors);
        console.log("All Keywords:", allKeywords);
        // Set the search query and proceed with the search
        setSearchQuery(formattedArticles);
        setShowFoundArticlesList(true);
        
      } else {
        // No articles found in the response
        setShowFoundArticlesList(false);
      }
    } else {
      // Invalid or empty response
      setShowFoundArticlesList(false);
      console.error('Invalid or empty response.');
    }
  };
  
  
  
  

    const showClosedArticleList = closedArticles.length > 0;
    return(
        <div className="font-montserrat flex">
             <div className="bg-lightBlue h-screen w-4/6 fixed overflow-y-auto no-scrollbar">
                <p className="text-3xl font-bold text-darkBlue mt-16 mb-5 ml-20">What are you looking for ?</p>
                <SearchBar onSearch={handleSearchButtonClick} />
                {showClosedArticleList && showFoundArticlesList ? (  <ClosedArticleList articles={searchQuery} />) : (
                <img src={searchPic} alt="Search Page Pic" className="w-1/3 mt-10 ml-48" />)}      
            </div>
            <div className="font-montserrat flex flex-col mt-5 ml-auto mr-14 no-scrollbar">
                <div className="flex mb-20 ml-auto no-scrollbar">
                <Link to={{ pathname: `/favorites` }}>
                    <button>
                    <img src={favoritesPic} alt="Search Page Pic" className="w-12 h-12 mr-6" />
                    </button>
                    </Link>
                    <button>
                    <ProfilePic />
                    </button>
                   
                </div>
                <FilterBar title={"Keywords"} listOfOptions={keywordsList}/>
                <FilterBar title={"Authors"} listOfOptions={authorsList}/>
                <FilterBar title={"Institutions"} listOfOptions={institutionsList}/> 
                <DateButton date={"Start Date"}/>
                <DateButton date={"End Date"}/>
                <button className="mt-3">
                     <p className="bg-pink text-white rounded-full py-2 hover:bg-pink-700">Filtrer Resultat</p>   
                </button>
            </div>
        </div>

    );
}
export default SearchPage;