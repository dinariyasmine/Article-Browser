import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';
import PopAdd from '../../components/AdminPage/popAddModerator/popAddModerator';
import PopRemove from '../../components/AdminPage/popRemove/popRemove';
import User from '../../components/SearchPage/userPopUp';

const AdminPage = () => {
  const [pop, setPop] = useState(false);
  const [popRemove, setPopRemove] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file)

      axios.post('http://127.0.0.1:8000/extraction/ext/', formData)
        .then(response => {
          console.log(response.data);
          // Gérer la réponse du backend, peut-être mettre à jour l'état du composant pour refléter le succès.
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du fichier:', error);
          // Gérer les erreurs, informer l'utilisateur, etc.
        });
    } else {
      // Gérer le cas où aucun fichier n'est sélectionné
      console.warn('Aucun fichier sélectionné.');
    }
  };

  // const handleUpload = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   if (selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     console.log(selectedFile)

  //     axios.post('http://127.0.0.1:8000/extraction/ext/', formData)
  //       .then(response => {
  //         console.log(response.data);
  //         // Gérer la réponse du backend, peut-être mettre à jour l'état du composant pour refléter le succès.
  //       })
  //       .catch(error => {
  //         console.error('Erreur lors de l\'envoi du fichier:', error);
  //         // Gérer les erreurs, informer l'utilisateur, etc.
  //       });
  //   } else {
  //     // Gérer le cas où aucun fichier n'est sélectionné
  //     console.warn('Aucun fichier sélectionné.');
  //   }
  // };

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/auth/all_moderators/');
        const moderators = response.data.moderators; // Assuming the response contains moderators data
        setItems(moderators);
      } catch (error) {
        console.error('Error fetching moderators:', error.response.data);
      }
    };
  
    fetchModerators();
  }, [items]); // Now the effect will run when the 'items' state changes
   // The empty dependency array ensures the effect runs once when the component mounts

  const handleTrashClick = (user) => {
    setSelectedUser(user);
    setPopRemove(true);
  };

  const handleRemove = (username) => {
    // Remove the user with the given username from the items array
    const updatedItems = items.filter((item) => item.username !== username);
    setItems(updatedItems);
  };

  // Inside the handleAddModerator function in AdminPage component
  const handleAddModerator = (newModerator) => {
  // Add the new moderator to the items array
  setItems([...items, newModerator]);
};

  

  return (
    <>
      <div className="admin" style={{ filter: pop || popRemove ? 'blur(5px)' : 'blur(0px)' }}>
        <User />
        <h1>Moderators :</h1>
        <div className="buttons">
          <button onClick={() => setPop(true)}>Add moderator   <FontAwesomeIcon icon={faPlus} /></button>
          <div className="upload">
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
              Upload article <FontAwesomeIcon icon={faUpload} />
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </label>
          </div>
          {/* <button>Upload article    <FontAwesomeIcon icon={faUpload} /></button> */}
          {/* <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange}/> */}
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
