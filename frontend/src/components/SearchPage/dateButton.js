import React from 'react';
import DatePicker from '../SearchPage/datePicker';



const DateButton = ({date, onDateSelect}) => {
   
    return (
        <div>
            <p className='text-sm ml-5'>{date}</p>
            <DatePicker onDateSelect={onDateSelect}/>
        </div>
       
      
    );
  };
  
  export default DateButton;