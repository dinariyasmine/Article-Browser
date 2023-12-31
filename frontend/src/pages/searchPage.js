import React,{useState} from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../components/SearchPage/searchBar";
import FilterBar from "../components/SearchPage/filterBar";
import DateButton from "../components/SearchPage/dateButton";
import ClosedArticleList from "../components/SearchPage/closedArticleList";
import searchPic from "../assets/searchPic.png";
import ProfilePic from "../components/SearchPage/userPopUp";
import favoritesPic from "../assets/fullHeart.png";

const optionsList = ['word 1', 'word 2', 'word 3'];
const User = {
  UserName:'JaneDoe',
  EmailAdress:'jdoe@gmail.com'
}


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

  const handleSearchButtonClick = (query) => {
    // Set the search query and proceed with the search
    setSearchQuery(query);
    setShowFoundArticlesList(true);
    setShowFoundArticlesList(query !== '');
    // Add any additional logic you need for searching
  };
  

    const showClosedArticleList = closedArticles.length > 0;
    return(
        <div className="font-montserrat flex">
             <div className="bg-lightBlue h-screen w-4/6 fixed overflow-y-auto no-scrollbar">
                <p className="text-3xl font-bold text-darkBlue mt-16 mb-5 ml-20">What are you looking for ?</p>
                <SearchBar onSearch={handleSearchButtonClick} />
                {showClosedArticleList && showFoundArticlesList ? (  <ClosedArticleList articles={closedArticles} />) : (
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
                    <ProfilePic UserName={User.UserName} EmailAdress={User.EmailAdress}/>
                    </button>
                   
                </div>
                <FilterBar title={"Keywords"} listOfOptions={optionsList}/>
                <FilterBar title={"Authors"} listOfOptions={optionsList}/>
                <FilterBar title={"Institutions"} listOfOptions={optionsList}/> 
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