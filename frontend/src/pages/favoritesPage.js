import React from "react";
import FavoritesArticleList from "../components/FavoritesPage/favoritesArticleList";
import searchPic from "../assets/searchPic.png";
import Navbar from "../components/FavoritesPage/favoritesNavbar";

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

const FavoritesPage =()=>{
    const showClosedArticleList = closedArticles.length > 0;
    return(
        <div className="font-montserrat">
        <Navbar UserName={User.UserName} EmailAdress={User.EmailAdress}/>
        {showClosedArticleList ? (  <FavoritesArticleList articles={closedArticles} />) : (
                <img src={searchPic} alt="Search Page Pic" className="w-1/3 mt-10 ml-48" />)}      
        </div>

    );
}
export default FavoritesPage;