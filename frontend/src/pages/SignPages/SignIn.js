import React, { useState } from 'react';
import axios from 'axios';
import TextFiled from '../../components/Signing/TextFiled/TextFiled';
import LogInButton from '../../components/Signing/LogInButton/LogInButton';
import Logo from '../../components/Signing/Logo/Logo';
import Slogan from '../../components/Signing/Slogan/Slogan';
import AuthentificationTitle from '../../components/Signing/AuthentificationTitle/AuthentificationTitle';
import Sign from '../../components/Signing/Sign/Sign';
import AuthImg from '../../assets/AuthImage.svg';
import './Signing.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log("Username:",username);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Post request to login to the path : localhost/auth/login
  const handleSubmit = async () => {
    console.log("Username:", username);
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login/',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.csrfToken,
          },
          withCredentials: true,
        }
      );
      console.log('Response:', response.data);
      // Handle the response as needed
    } catch (error) {
      console.error('Error during login:', error.response.data);
      console.log('Validation errors:', error.response.data.errors); 
    }
  };
  
  


  return (
    <div className='h-screen flex justify-between items-center'>
      <div className='LeftSide'>
        <div className='logo'>
          <Logo />
        </div>
        <img src={AuthImg} alt='Authentification' />
        <div className='slogan'>
          <Slogan />
        </div>
      </div>
      <div className='RightSide'>
        <AuthentificationTitle title='Log In' />
        <div className='MRightSide'>
          <TextFiled text='UserName' value={username} onChange={handleUsernameChange} />
          <TextFiled text='Password' type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className='BRightSide' onClick={handleSubmit}>
          <LogInButton text='Log In' />
          <Sign account="Don't have an account?" sign='up' />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
