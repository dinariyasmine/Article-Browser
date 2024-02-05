import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload, faTrash , faCheck} from '@fortawesome/free-solid-svg-icons';
import PopAdd from '../../components/AdminPage/popAddModerator/popAddModerator';
import PopRemove from '../../components/AdminPage/popRemove/popRemove';
import User from '../../components/SearchPage/userPopUp';

/**
 * AdminPage component for managing moderators and uploading articles.
 *
 * @component
 * @returns {JSX.Element} AdminPage component
 */

const AdminPage = () => {
  // State variables
  const [pop, setPop] = useState(false);
  const [popRemove, setPopRemove] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkMark, setCheckMark] = useState(false);

  

  // Handle file change
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setLoading(true);
        const response = await axios.post('http://127.0.0.1:8000/extraction/ext/', formData);
        console.log(response.data);
        // Handle backend response, update component state if needed
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle errors, inform the user, etc.
      }
      finally {
        setLoading(false); // Set loading to false regardless of success or failure
        setCheckMark(true); // Set check mark to true to display it

        // Automatically hide the check mark after 2 seconds (adjust the duration as needed)
        setTimeout(() => {
          setCheckMark(false);
        }, 2000);
      }
    } else {
      console.warn('No file selected.');
    }
  };

  // Fetch moderators on component mount or when 'items' state changes
  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/all_moderators/');
        const moderators = response.data.moderators;
        setItems(moderators);
      } catch (error) {
        console.error('Error fetching moderators:', error.response.data);
      }
    };
  
    fetchModerators();
  }, [items]);

  // Handle trash icon click
  const handleTrashClick = (user) => {
    setSelectedUser(user);
    setPopRemove(true);
  };

  // Handle removal of a user
  const handleRemove = (username) => {
    // Remove the user with the given username from the items array
    const updatedItems = items.filter((item) => item.username !== username);
    setItems(updatedItems);
  };

  // Handle adding a new moderator
  const handleAddModerator = (newModerator) => {
    // Add the new moderator to the items array
    setItems([...items, newModerator]);
  };

  

  // Render component
  return (
    <>
    <div className="admin" style={{ filter: pop || popRemove ? 'blur(5px)' : 'blur(0px)',}}>
      <div className="utilisateur w-16 max-sm:w-9"><User /></div>
        <h1>Moderators :</h1>
        <div className="buttons">
          <button onClick={() => setPop(true)}>Add moderator   <FontAwesomeIcon icon={faPlus} /></button>
          
          <div className="upload">
            {loading ? (
              <div className="load"></div>
            ) : (
                (checkMark)?
                <FontAwesomeIcon icon={faCheck} size='xl' />
                :<label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                  Upload article <FontAwesomeIcon icon={faUpload} />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </label>              
            )}
          </div>
        
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td className='p-3'>
                  <FontAwesomeIcon
                    onClick={() => handleTrashClick(item)}
                    icon={faTrash}
                    style={{ color: '#3AC6EB', fontSize: '1.4em' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PopAdd trigger={pop} setTrigger={setPop} handleAddModerator={handleAddModerator} selectedUser={selectedUser} />
      <PopRemove
        handleRemove={handleRemove}
        trigger={popRemove}
        setTrigger={setPopRemove}
        username={selectedUser ? selectedUser.username : ''}
        email={selectedUser ? selectedUser.email : ''}
      />
    </>
  );
};

export default AdminPage;
