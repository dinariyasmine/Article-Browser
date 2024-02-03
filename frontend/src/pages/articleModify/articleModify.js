import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './articleModify.css';
import PopUp from '../../components/ModeratorPage/Popup/popUp';


/**
 * ArticleModify component for modifying article details.
 *
 * @component
 * @returns {JSX.Element} ArticleModify component
 */


const ArticleModify = () => {
  const storedArticle = localStorage.getItem('selectedArticle');
  const article0 = storedArticle ? JSON.parse(storedArticle) : {};
  console.log('Article stored in local :', article0);

  const [Title, setTitle] = useState(article0.title);
  const [Summary, setSummary] = useState(article0.abstract);
  const [Author, setAuthor] = useState(article0.authors.split(', '));
  const [Institution, setInstitution] = useState(article0.institutions.split(', '));
  const [Keywords, setKeywords] = useState(article0.keywords.split(', '));
  const [Date, setDate] = useState(article0.date);
  const [Reference, setReference] = useState(article0.references);
  
  const textareaRef = useRef(null);
  const input0Ref = useRef(null);
  const input2Refs = useRef(Author.map(() => React.createRef()));
  const input3Refs = useRef(Institution.map(() => React.createRef()));
  const input4Refs = useRef(Keywords.map(() => React.createRef()));
  const input5Ref = useRef(null);
  const input6Refs = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [Summary]);

  useEffect(() => {
    if (input0Ref.current) {
      input0Ref.current.style.height = 'auto';
      input0Ref.current.style.height = `${input0Ref.current.scrollHeight}px`;
    }
  }, [Title]);

  const handleChange0 = (e) => {
    setTitle(e.target.value);
  };
  const handleChange1 = (e) => {
    setSummary(e.target.value);
  };
  const handleChange2 = (index, e) => {
    const newValues = [...Author];
    newValues[index] = e.target.value;
    setAuthor(newValues);
  };
  const handleChange3 = (index, e) => {
    const newValues = [...Institution];
    newValues[index] = e.target.value;
    setInstitution(newValues);
  };
  const handleChange4 = (index, e) => {
    const newValues = [...Keywords];
    newValues[index] = e.target.value;
    setKeywords(newValues);
  };
  const handleChange5 = (e) => {
    setDate(e.target.value);
  };
  const handleChange6 = (e) => {
    setReference(e.target.value);
  };

  const [pop,setPop]=useState(false);
  const [ind,setInd]=useState(0);
  
  return (
    <>
      
      
      <div className="w-full" style={{filter: (pop)?'blur(5px)':'blur(0px)'}}>
        <div className='ArticleModify'>
            
          {/* <div className='titreArticleModify flex justify-center items-start gap-5 flex-col w-full'> */}
            {/* <div className="pdpArticleTitle flex justify-start items-center" style={{ width: '100%'}}> */}
              <div className='flex justify-center items-center gap-5' style={{ width: '50%', margin:'50px 0'}}>
                <textarea className='text-center Titre' ref={input0Ref} value={Title} onChange={handleChange0} style={{ width: '100%', minHeight: '20px', height: 'auto', resize: 'none'}}/>
                <FontAwesomeIcon icon={faPencil} size='xl'/>
              </div>
            {/* </div> */}

          <div className='contenuArticleModify containerArticleModify flex items-end flex-col'>
            <div className='w-full'>
              <h2 className='summaryTitle'>Article's summary :</h2>
              <textarea ref={textareaRef} value={Summary} onChange={handleChange1} style={{ width: '100%', minHeight: '50px', height: 'auto', resize: 'none'}}/>
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>
          </div>

          <div className='authorArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Authors</h2>
              {Author.map((author, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  ref={input2Refs.current[index]}
                  type="text"
                  value={Author[index]}
                  onChange={(e) => handleChange2(index, e)}
                />
              ))}
              {/* <input className='inputArticleModify' ref={input2Ref} type="text" value={Author} onChange={handleChange2}/> */}
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>
          </div>

          <div className='institutionsArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Institutions</h2>
              {Institution.map((institution, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  ref={input3Refs.current[index]}
                  type="text"
                  value={Institution[index]}
                  onChange={(e) => handleChange3(index, e)}
                />
              ))}
              {/* <input className='inputArticleModify' ref={input3Ref} type="text" value={Institution} onChange={handleChange3}/> */}
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>
          </div>

          <div className='keywordsArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Key-words</h2>
              {Keywords.map((keyword, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  ref={input4Refs.current[index]}
                  type="text"
                  value={Keywords[index]}
                  onChange={(e) => handleChange4(index, e)}
                />
              ))}
              {/* <input className='inputArticleModify' ref={input4Ref} type="text" value={Keywords} onChange={handleChange4}/> */}
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>  
          </div>

          {/* <div className='dateArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Date</h2>
              <input className='inputArticleModify' ref={input5Ref} type="date" value={Date} onChange={handleChange5}/>
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>
          </div> */}

          <div className='refsArticleModify containerArticleModify flex justify-between items-center'>
            <div className="w-full">
              <h2 className='summaryTitle'>References</h2>
              {/* {Reference.map((ref, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  ref={input6Refs.current[index]}
                  type="text"
                  value={Reference[index]}
                  onChange={(e) => handleChange6(index, e)}
                />
              ))} */}
              <textarea className='inputArticleModify' ref={input6Refs} type="text" value={Reference} onChange={handleChange6} style={{ width: '95%', minHeight: '80px', height: 'auto', resize: 'none'}}/>
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>  
          </div>

          </div>
          <div className="buttonsArticleModify flex justify-end items-center">
          <p onClick={()=>{setPop(true);setInd(0);}} style={{ cursor: 'pointer' }}>Delete article</p>
          <button onClick={()=>{setPop(true);setInd(1);}}>Validate</button>
          </div>
      </div>
      {/* PopUp component for additional actions */}
      <PopUp index={ind} trigger={pop} setTrigger={setPop} titre={Title} resume={Summary} mots_cles={Keywords} institutions={Institution} auteurs={Author} references={Reference} />
    </>
  );
};

export default ArticleModify;
