 import React from 'react';
 import './App.css';
 import ArticleModify from './pages/articleModify/articleModify';
 import ModeratorPage from './pages/ModeratorPage/ModeratorPage';
import PopUp from './components/ModeratorPage/Popup/popUp';
import SignUp from './pages/SignPages/SignUp'



 function App() {
   return (
     <section className='App'>
      <ModeratorPage/>
       {/* <ArticleModify keywords={['un','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux','deux']} /> */}
       {/* <SignUp /> */}
     </section>
      
   );
 }


 export default App;