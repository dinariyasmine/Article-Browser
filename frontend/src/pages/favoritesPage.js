import React from "react";
import FavoritesArticleList from "../components/SearchScreen/favoritesArticleList";
import searchPic from "../assets/searchPic.png";
import Navbar from "../components/SearchScreen/favoritesNavbar";


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

const FavoritesPage =()=>{
    const showClosedArticleList = closedArticles.length > 0;
    return(
        <div className="font-montserrat">
        <Navbar/>
        {showClosedArticleList ? (  <FavoritesArticleList articles={closedArticles} />) : (
                <img src={searchPic} alt="Search Page Pic" className="w-1/3 mt-10 ml-48" />)}      
        </div>

    );
}
export default FavoritesPage;