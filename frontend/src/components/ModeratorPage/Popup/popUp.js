import React from 'react'
import './popUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark , faFloppyDisk} from '@fortawesome/free-regular-svg-icons';

const PopUp = (props) => {
    const items=[
        {icon : faCircleXmark, h1 : 'Delete article', p: 'If you click on Delete, this article will be permanently deleted.  Are you sure you want to proceed?', button:'Delete', color:'#EE4A4A'},
        {icon : faFloppyDisk,h1 : 'Save changes', p: 'If you click on Save, the article will be displayed for users and you won’t be able to edit it again. Are you sure you want to proceed?', button:'Save', color:'#3AC6EB'}
    ];
  return ((props.trigger)?
    <>
      <div className="popupPage">
        <div className='popup flex justify-center items-center flex-col'>
          <FontAwesomeIcon icon={items[props.index].icon} size='5x' color={items[props.index].color}/>
          <h1>{items[props.index].h1}</h1>
          <p>{items[props.index].p}</p>
          <div className="buttons flex justify-center items-center w-full">
              <button style={{background : '#AEAEAE', }} onClick={() => props.setTrigger(false)} >Cancel</button>
              <button style={{background : items[props.index].color, }}>{items[props.index].button}</button>
          </div>
        </div>
      </div>
    </>
    :""
  )
}

export default PopUp