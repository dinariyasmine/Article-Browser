import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import ArticleModify from './pages/articleModify/articleModify';
import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import PopUp from './components/ModeratorPage/Popup/popUp';
import SignUp from './pages/SignPages/SignUp'
import SignIn from './pages/SignPages/SignIn'



 function App() {
   return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/moderator" element={<ModeratorPage/>} />
        <Route path="/articlemodif/:id" element={<ArticleModify/>} />
      </Routes>
    </Router>
   );
 }

 export default App;