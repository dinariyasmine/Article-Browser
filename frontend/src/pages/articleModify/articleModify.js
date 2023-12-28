import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './articleModify.css';
import PopUp from '../../components/ModeratorPage/Popup/popUp';

const ArticleModify = (props) => {
  const [Title, setTitle] = useState('');
  const [Summary, setSummary] = useState('');
  const [Author, setAuthor] = useState('');
  const [Institution, setInstitution] = useState('');
  const [Keywords, setKeywords] = useState('');
  const [Date, setDate] = useState('');

  const [bool0, setBool0] = useState(true);
  const [bool1, setBool1] = useState(true);
  const [bool2, setBool2] = useState(true);
  const [bool3, setBool3] = useState(true);
  const [bool4, setBool4] = useState(true);
  const [bool5, setBool5] = useState(true);
  
  const textareaRef = useRef(null);
  const input0Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [Summary]);
  useEffect(() => {
    // Ajuster la largeur de l'input en fonction de la longueur du texte
    if (input0Ref.current) {
      input0Ref.current.style.width = `${input0Ref.current.scrollWidth}px`;
    }
  }, [Title]);

  const handleChange0 = (e) => {
    setTitle(e.target.value);
  };
  const handleChange1 = (e) => {
    setSummary(e.target.value);
  };
  const handleChange2 = (e) => {
    setAuthor(e.target.value);
  };
  const handleChange3 = (e) => {
    setInstitution(e.target.value);
  };
  const handleChange4 = (e) => {
    setKeywords(e.target.value);
  };
  const handleChange5 = (e) => {
    setDate(e.target.value);
  };

  const handleIconClick0 = () => {
    setBool0(!bool0);
    if (input0Ref.current) {
      input0Ref.current.focus();
    }
  };
  const handleIconClick1 = () => {    
    setBool1(!bool1);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  const handleIconClick2 = () => {
    setBool2(!bool2);
    if (input2Ref.current) {
      input2Ref.current.focus();
    }
  };
  const handleIconClick3 = () => {
    setBool3(!bool3);
    if (input3Ref.current) {
      input3Ref.current.focus();
    }
  };
  const handleIconClick4 = () => {
    setBool4(!bool4);
    if (input4Ref.current) {
      input4Ref.current.focus();
    }
  }
  const handleIconClick5 = () => {
    setBool5(!bool5);
    if (input5Ref.current) {
      input5Ref.current.focus();
    }
  };

  const handleBlur0 = () => {
    setBool0(true);
  };
  const handleBlur1 = () => {
    setBool1(true);
  };
  const handleBlur2 = () => {
    setBool2(true);
  };
  const handleBlur3 = () => {
    setBool3(true);
  };
  const handleBlur4 = () => {
    setBool4(true);
  };
  const handleBlur5 = () => {
    setBool5(true);
  };

  const [pop,setPop]=useState(false);
  const [ind,setInd]=useState(0);

  

  

  return (
    <>
      <div className="w-full" style={{filter: (pop)?'blur(5px)':'blur(0px)'}}>
        <div className='ArticleModify'>

          <div className='titreArticleModify flex justify-center items-start gap-5 flex-col'>
            <div className='flex justify-center items-center gap-5'>
              <input className='text-center' onBlur={handleBlur0} ref={input0Ref} type="text" value={Title} onChange={handleChange0} readOnly={bool0} />
              <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick0}/>
            </div>
            <div className="ligne" style={{width: '100%', height: '2px', 'background-color' : '#EE4A6A'}}></div>
          </div>

          <div className='contenuArticleModify containerArticleModify flex items-end flex-col'>
            <div className='w-full'>
              <h2 className='summaryTitle'>Article's summary :</h2>
              <textarea ref={textareaRef} value={Summary} onBlur={handleBlur1} onChange={handleChange1} readOnly={bool1} style={{ width: '100%', minHeight: '50px', height: 'auto', resize: 'none'}}/>
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick1}/>
          </div>

          <div className='authorArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Authors</h2>
              
              <input className='inputArticleModify' onBlur={handleBlur2} ref={input2Ref} type="text" value={Author} onChange={handleChange2} readOnly={bool2} />
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick2}/>
          </div>

          <div className='institutionsArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Institutions</h2>
              <input className='inputArticleModify' onBlur={handleBlur3} ref={input3Ref} type="text" value={Institution} onChange={handleChange3} readOnly={bool3} />
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick3}/>
          </div>

          <div className='keywordsArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Key-words</h2>
              {props.keywords.map((keyword, index) => (
                <input
                  key={index}
                  className='inputArticleModify'
                  onBlur={handleBlur2}
                  ref={input2Ref}
                  type="text"
                  value={keyword}  
                  onChange={handleChange2}
                  readOnly={bool2}
                />
              ))}
              {/* <input className='inputArticleModify' onBlur={handleBlur4} ref={input4Ref} type="text" value={Keywords} onChange={handleChange4} readOnly={bool4} /> */}
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick4}/>  
          </div>

          <div className='dateArticleModify containerArticleModify flex justify-between items-center'>
            <div>
              <h2 className='summaryTitle'>Date</h2>
              <input className='inputArticleModify' onBlur={handleBlur5} ref={input5Ref} type="date" value={Date} onChange={handleChange5} readOnly={bool5} />
            </div>
            <FontAwesomeIcon icon={faPencil} size='xl' onClick={handleIconClick5}/>
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
