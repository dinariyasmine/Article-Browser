import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './articleModify.css';
import PopUp from '../../components/ModeratorPage/Popup/popUp';
import imgProfil from '../../assets/userIcon.png'

const ArticleModify = () => {
  const storedArticle = localStorage.getItem('selectedArticle');
  const article0 = storedArticle ? JSON.parse(storedArticle) : {};
  console.log('Article stored in local :', article0);

  const [Title, setTitle] = useState(article0.title);
  const [Summary, setSummary] = useState(article0.IntegralText);
  const [Author, setAuthor] = useState(article0.authors);
  const [Institution, setInstitution] = useState(article0.Institutions);
  const [Keywords, setKeywords] = useState(article0.keywords);
  const [Date, setDate] = useState(article0.date);
  const [Reference, setReference] = useState(article0.References);
  // const [bool0, setBool0] = useState(true);
  // const [bool1, setBool1] = useState(true);
  // const [bool2, setBool2] = useState(true);
  // const [bool3, setBool3] = useState(true);
  // const [bool4, setBool4] = useState(true);
  // const [bool5, setBool5] = useState(true);

  //const inputRefs = useRef(keywords.map(() => React.createRef()));
  //const [inputValues, setInputValues] = useState(keywords.map(() => ''));
  
  const textareaRef = useRef(null);
  const input0Ref = useRef(null);
  const input2Refs = useRef(article0.authors.map(() => React.createRef()));
  const input3Refs = useRef(article0.Institutions.map(() => React.createRef()));
  const input4Refs = useRef(article0.keywords.map(() => React.createRef()));
  const input5Ref = useRef(null);
  const input6Refs = useRef(article0.References.map(() => React.createRef()));


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

  // useEffect(() => {
  //   if (input0Ref.current) {
  //     console.log('width : ' ,input0Ref.current.offsetWidth);
  //     console.log('width WINDOW: ' ,window.innerWidth*0.5);
  //     if(input0Ref.current.offsetWidth<window){
  //       input0Ref.current.style.width = `${input0Ref.current.scrollWidth}px`;
  //     }
        
  //   }
  // }, [Title]);


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
  const handleChange6 = (index, e) => {
    const newValues = [...Reference];
    newValues[index] = e.target.value;
    setReference(newValues);
  };

  // const handleIconClick0 = () => {
  //   setBool0(!bool0);
  //   if (input0Ref.current) {
  //     input0Ref.current.focus();
  //   }
  // };
  // const handleIconClick1 = () => {    
  //   setBool1(!bool1);
  //   if (textareaRef.current) {
  //     textareaRef.current.focus();
  //   }
  // };
  // const handleIconClick2 = () => {
  //   setBool2(!bool2);
  //   if (input2Ref.current) {
  //     input2Ref.current.focus();
  //   }
  // };
  // const handleIconClick3 = () => {
  //   setBool3(!bool3);
  //   if (input3Ref.current) {
  //     input3Ref.current.focus();
  //   }
  // };
  // const handleIconClick4 = () => {
  //   setBool4(!bool4);
  //   if (input4Ref.current) {
  //     input4Ref.current.focus();
  //   }
  // }
  // const handleIconClick5 = () => {
  //   setBool5(!bool5);
  //   if (input5Ref.current) {
  //     input5Ref.current.focus();
  //   }
  // };

  // const handleBlur0 = () => {
  //   setBool0(true);
  // };
  // const handleBlur1 = () => {
  //   setBool1(true);
  // };
  // const handleBlur2 = () => {
  //   setBool2(true);
  // };
  // const handleBlur3 = () => {
  //   setBool3(true);
  // };
  // const handleBlur4 = () => {
  //   setBool4(true);
  // };
  // const handleBlur5 = () => {
  //   setBool5(true);
  // };

  const [pop,setPop]=useState(false);
  const [ind,setInd]=useState(0);

  

  

  return (
    <>
      
      
      <div className="w-full" style={{filter: (pop)?'blur(5px)':'blur(0px)'}}>
        <div className='ArticleModify'>
            
          {/* <div className='titreArticleModify flex justify-center items-start gap-5 flex-col w-full'> */}
            <div className="pdpArticleTitle" style={{ width: '100%'}}>
              {/* <div  style={{ width: '10%'}}></div> */}
              <div className='flex justify-center items-center gap-5' style={{ width: '50%', 'margin-right': '18%'}}>
                <textarea className='text-center Titre' ref={input0Ref} value={Title} onChange={handleChange0} style={{ width: '100%', minHeight: '20px', height: 'auto', resize: 'none'}}/>
                {/* <input className='text-center' ref={input0Ref} type="text" value={Title} onChange={handleChange0}/> */}
                <FontAwesomeIcon icon={faPencil} size='xl'/>
              </div>
              <div className="image-container">
                <img src={imgProfil} alt='Profil' className='image-ronde'/>
              </div>
            </div>
            {/* <div className="ligne" style={{width: '70%', height: '2px', 'background-color' : '#EE4A6A'}}></div> */}
          {/* </div>           */}

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

          <div className='dateArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Date</h2>
              <input className='inputArticleModify' ref={input5Ref} type="date" value={Date} onChange={handleChange5}/>
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>
          </div>

          <div className='refsArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>References</h2>
              {Reference.map((ref, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  ref={input6Refs.current[index]}
                  type="text"
                  value={Reference[index]}
                  onChange={(e) => handleChange6(index, e)}
                />
              ))}
              {/* <input className='inputArticleModify' ref={input4Ref} type="text" value={Keywords} onChange={handleChange4}/> */}
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl'/>  
          </div>

          </div>
          <div className="buttonsArticleModify flex justify-end items-center">
          <p onClick={()=>{setPop(true);setInd(0);}}>Delete article</p>
          <button onClick={()=>{setPop(true);setInd(1);}}>Save changes</button>
          </div>
      </div>
      <PopUp index={ind} trigger={pop} setTrigger={setPop}/>
    </>
  );
};

export default ArticleModify;
