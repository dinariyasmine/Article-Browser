import React from 'react';
import './ModeratorPage.css';
import Article from '../../components/ModeratorPage/Article/Article';
import imgProfil from '../../assets/AuthImage.svg'

const ModeratorPage = () => {
  const items = [
    { id: 1, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 2, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 3, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 4, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 5, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 6, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 7, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 8, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
    { id: 9, title: 'Hello world !', keywords: 'Hello world !', date: 'Hello world !', author: 'Youcef OUIK' },
  ];

  return (
    <div className='moderatorPage'>
      <div className='Up'>
        <h1 className='TITLE'>Rencently uploaded articles</h1>
        <img src={imgProfil} alt='Profil' className='imgProfil'/>
      </div>
      
      <div className='listArticles'>
        {items.map((element) => (
          <Article key={element.id} title={element.title} keywords={element.keywords} date={element.date} author={element.author} />
        ))}
      </div>
    </div>
  );
};

export default ModeratorPage;
