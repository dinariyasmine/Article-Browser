import React from 'react';
import ArticleIcon from "../../assets/articleIcon.png";

const ClosedArticle = ({ title,keywords,PublishDate,Author }) => {
    const formattedKeywords = keywords.join(' , ');
  return (
    <div className="mt-10">
      <div
        className={`ml-14 w-4/6 flex items-center bg-white rounded-3xl py-3 border transition duration-300 ease-in-out hover:bg-gray-100 relative`}
      >
        <div className='w-3/4'>
        <p className="text-left pl-5 font-extrabold text-lg text-darkBlue">{title}</p>
        <p className="text-left pl-5 font text-lightBlue">{formattedKeywords}</p>
        <p className="text-left pl-5 font-thin text-darkBlue ">{PublishDate} , {Author}</p>
        </div>

        
        <div className="w-1/4 ">
          <img
            src={ArticleIcon}
            alt="Search Loope Icon"
            className="ml-auto mr-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ClosedArticle;
