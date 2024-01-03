import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ArticleModify from './pages/articleModify/articleModify';
import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import SignUp from './pages/SignPages/SignUp'
import SignIn from './pages/SignPages/SignIn'
import SearchPage from './pages/searchPage';
import DetailArticle from './pages/detailArticle';
import FavoritesPage from './pages/favoritesPage';




 function App() {
   return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailArticle/>} />
        <Route path="/favorites/" element={<FavoritesPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/moderator" element={<ModeratorPage/>} />
        <Route path="/articlemodif/:id" element={<ArticleModify/>} />*/}
        <Route path="/" element={<SignUp />}> </Route>
        
      </Routes>
    </Router>
   );
 }

 export default App;