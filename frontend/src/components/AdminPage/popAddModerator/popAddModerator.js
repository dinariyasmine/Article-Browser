import React, { useState,useEffect } from 'react';
import './popAddModerator.css';
import axios from 'axios';

const PopAdd = (props) => {
  const [userName, setUserName] = useState(props.selectedUser ? props.selectedUser.username : '');

  useEffect(() => {
    setUserName(props.selectedUser ? props.selectedUser.username : '');
  }, [props.selectedUser]);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAddModerator = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/add_moderator/',
        { username: userName }
      );
  
      console.log('Response:', response.data);
  
      // Check if the 'success' property exists in the response data
      const successMessage = response.data ? response.data.success : '';
  
      console.log(successMessage);
  
      // Pass user information to the function passed from the parent
      props.handleAddModerator({ userName });
  
      // Close the PopAdd component
      props.setTrigger(false);
      setUserName('');
    } catch (error) {
      console.error('Error during adding moderator:', error.response ? error.response.data : error.message);
      // Handle error, display a message to the user, etc.
    }
  };
  

  const handleCancel = () => {
    // Reset the userName state to clear the input
    setUserName('');
    // Close the PopAdd component
    props.setTrigger(false);
  };

  return (
    props.trigger ? (
      <>
        <div className="popAddPage">
          <div className="popAdd">
            <p>Fill The Following Fields To Add a New Moderator :</p>
            <div className="inputs">
              <label>
                User Name :
                <input type="text" value={userName} placeholder="User Name" onChange={handleUserNameChange} />
              </label>
            </div>
            <div className='buts'>
              <button style={{ background: '#AEAEAE' }} onClick={handleCancel}>Cancel</button>
              <button style={{ background: '#3AC6EB' }} onClick={handleAddModerator}>Add Moderator</button>
            </div>
          </div>
        </div>
      </>
    ) : null
  );
};

export default PopAdd;
