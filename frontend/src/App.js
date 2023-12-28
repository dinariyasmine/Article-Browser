 import React from 'react';
 import './App.css';
 import ArticleModify from './pages/articleModify/articleModify';
 import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import PopUp from './components/ModeratorPage/Popup/popUp';


 function App() {
   return (
     <section className='App'>
       <ArticleModify keywords={['un','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux']} />
     </section>
      
   );
 }


 export default App;