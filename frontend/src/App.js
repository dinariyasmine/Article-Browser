import React from 'react';
import './App.css';
import ArticleModify from './pages/articleModify/articleModify';
import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import SignUp from './pages/SignPages/SignUp'
import SignIn from './pages/SignPages/SignIn'
import SearchPage from './pages/searchPage';
import DetailArticle from './pages/detailArticle';
import FavoritesPage from './pages/favoritesPage';
import LandingPage from './pages/landingPage';
import AdminSpace from './pages/adminPage/adminPage';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';


/**
 * App component serves as the main entry point for the React application.
 * It defines the routes for different pages and navigational elements.
 * @returns {JSX.Element} JSX element for the App component.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Sign In and Sign Up Pages */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* User Space */}
        <Route path="/UserSpace" element={<SearchPage/>} />
        <Route path="/UserSpace/ArticleDetails/:id" element={<DetailArticle />} />

        {/* Favorites Page */}
        <Route path="/favorites" element={<FavoritesPage />} />

        {/* Moderator Space */}
        <Route path="/ModeratorSpace" element={<ModeratorPage />} />
        <Route path="/ModeratorSpace/:id" element={<ArticleModify />} />

        {/* Admin Space */}
        <Route path="/AdminSpace" element={<AdminSpace />} />

        
      </Routes>
    </Router>
  );
}

export default App;
