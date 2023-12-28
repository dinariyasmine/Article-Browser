import React from 'react';
import DatePicker from '../SearchScreen/datePicker';



const DateButton = ({date}) => {
   
    return (
        <div>
            <p className='text-sm ml-5'>{date}</p>
            <DatePicker/>
        </div>
       
      
    );
  };
  
  export default DateButton;