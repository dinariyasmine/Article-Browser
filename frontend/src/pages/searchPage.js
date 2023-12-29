import React from "react";
import SearchBar from "../components/SearchScreen/serachBar";
import FilterBar from "../components/SearchScreen/filterBar";
import DateButton from "../components/SearchScreen/dateButton";
import ClosedArticleList from "../components/SearchScreen/closedArticleList";
import searchPic from "../assets/searchPic.png";
import profilePic from "../assets/userIcon.png";
import favoritesPic from "../assets/fullHeart.png";

const optionsList = ['word 1', 'word 2', 'word 3'];

const closedArticles = [
    {
      title: 'Article 1',
      keywords: ['React', 'JavaScript'],
      PublishDate: '2023-01-01',
      Author: 'John Doe',
    },
    {
        title: 'Article 2',
        keywords: ['React', 'JavaScript'],
        PublishDate: '2023-01-01',
        Author: 'John Doe',
      },
      {
        title: 'Article 3',
        keywords: ['React', 'JavaScript'],
        PublishDate: '2023-01-01',
        Author: 'John Doe',
      },
      {
        title: 'Article 4',
        keywords: ['React', 'JavaScript'],
        PublishDate: '2023-01-01',
        Author: 'John Doe',
      }
   
  ];

const SearchScreen =()=>{
    const showClosedArticleList = closedArticles.length > 0;
    return(
        <div className="font-montserrat flex">
             <div className="bg-lightBlue h-screen w-4/6 fixed overflow-y-auto no-scrollbar">
                <p className="text-3xl font-bold text-darkBlue mt-16 mb-5 ml-20">What are you looking for ?</p>
                <SearchBar/>
                {showClosedArticleList ? (  <ClosedArticleList articles={closedArticles} />) : (
                <img src={searchPic} alt="Search Page Pic" className="w-1/3 mt-10 ml-48" />)}      
            </div>
            <div className="font-montserrat flex flex-col mt-5 ml-auto mr-14 no-scrollbar">
                <div className="flex mb-20 ml-auto no-scrollbar">
                    <button>
                    <img src={favoritesPic} alt="Search Page Pic" className="w-10 h-10 mr-6" />
                    </button>
                    <button>
                    <img src={profilePic} alt="Search Page Pic" className="w-10 h-10" />
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
export default SearchScreen;