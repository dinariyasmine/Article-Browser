import React from 'react';
import DatePicker from '../SearchPage/datePicker';


/**
 * DateButton component for displaying a date and a DatePicker.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.date - The selected date to be displayed.
 * @param {function} props.onDateSelect - The function to be called when a date is selected in the DatePicker.
 * @returns {JSX.Element} React component
 */
const DateButton = ({date, onDateSelect}) => {
   
    return (
        <div>
            {/* Display the selected date */}
            <p className='text-sm ml-5'>{date}</p>
            {/* Render the DatePicker component */}
            <DatePicker onDateSelect={onDateSelect}/>
        </div>
       
      
    );
  };
  
  export default DateButton;