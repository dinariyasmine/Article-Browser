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
// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [showPopup, setShowPopup] = useState(false);

//   const openPopup = () => {
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div className="App">
//       <button onClick={openPopup}>Cliquez-moi</button>

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <span className="close" onClick={closePopup}>&times;</span>
//             <p>Contenu de votre popup ici.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
