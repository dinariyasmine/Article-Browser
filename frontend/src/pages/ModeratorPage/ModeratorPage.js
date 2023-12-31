import React from 'react';
import './ModeratorPage.css';
import Article from '../../components/ModeratorPage/Article/Article';
import imgProfil from '../../assets/userIcon.png'

const ModeratorPage = () => {
  const items = [
    {
      id:'03',
      title: 'Article 4',
      Institutions :['Hello','Hello2'],
      keywords: ['React', 'JavaScript'],
      date: '2023-01-01',
      authors: ['Author1','Author2'],
      Abstract:'Incididunt laboris deserunt in sint ad non quis ex consequat nulla adipisicing.',
      IntegralText:'Commodo ut quis minim laboris in proident occaecat enim tempor mollit eu cillum. Occaecat irure consequat cillum ut dolore. Excepteur ipsum eiusmod veniam pariatur. Ad laboris aliquip ea cupidatat aute. Mollit dolor sunt nostrud occaecat sunt cillum sunt et anim consequat laboris. Minim id sit cupidatat qui exercitation voluptate dolore. Ad ea aliquip laborum non aliqua.',
      References: ['Reference1','Reference2'],
    }
    // { id: 1, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 2, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 3, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 4, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 5, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 6, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 7, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 8, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
    // { id: 9, title: 'Hello world !', keywords: ['Hello world !','hey'], date: 'Hello world !', author: ['You','ouik'] },
  ];

  return (
    <div className='moderatorPage'>
      <div className='Up flex justify-between items-center'>
        <div style={{width : '5%'}}></div>
        <h1 className='TITLE'>Rencently uploaded articles</h1>
        <div className="image-container">
          <img src={imgProfil} alt='Profil' className='image-ronde'/>
        </div>
      </div>
      
      <div className='listArticles w-full'>
        {items.map((element,index) => (    
          <Article  
            key={element.id}
            article={element}
          />
        ))}
      </div>
    </div>
  );
};

export default ModeratorPage;