 import React from 'react';
 import './App.css';
 import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
 import SearchPage from './pages/searchPage';
 import DetailArticle from './pages/detailArticle';
 import FavoritesPage from './pages/favoritesPage';




 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailArticle/>} />
        <Route path="/favorites/" element={<FavoritesPage/>} />
      </Routes>
    </Router>
  );
 }


 export default App;