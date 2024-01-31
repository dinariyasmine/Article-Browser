import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextFiled from '../../components/Signing/TextFiled/TextFiled';
import LogInButton from '../../components/Signing/LogInButton/LogInButton';
import Logo from '../../components/Signing/Logo/Logo';
import Slogan from '../../components/Signing/Slogan/Slogan';
import AuthentificationTitle from '../../components/Signing/AuthentificationTitle/AuthentificationTitle';
import Sign from '../../components/Signing/Sign/Sign';
import AuthImg from '../../assets/AuthImage.svg';
import './Signing.css';

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    console.log("Username :",userName);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("I was clicked!");
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/login/',
        {
          username: userName,
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

      // Assuming the response contains user information
      const user = response.data.user;

      // Set global variable indicating user is logged in
      window.isLoggedIn = true;
      

      // Store user in local storage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('user', JSON.parse(localStorage.getItem('user')));
      console.log('Logged in?', window.isLoggedIn);
      //navigate to the next page
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        if (storedUser.role === 0) {
          navigate('/UserSpace');
        } else if (storedUser.role === 1) {
          navigate('/ModeratorSpace');
        } else {
          // Handle other roles or scenarios
          console.error('Unsupported role:', storedUser.role);
        }
      }


      // Handle the response as needed, for example, navigate to a new page
      // or update the UI to reflect the user being logged in
    } catch (error) {
      console.error('Error during login:', error.response.data);
      // Handle login error, display a message to the user, etc.
    }
  };

  useEffect(() => {
    // Redirect based on the user's role
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (storedUser.role === 0) {
        navigate('/UserSpace');
      } else if (storedUser.role === 1) {
        navigate('/ModeratorSpace');
      } else {
        // Handle other roles or scenarios
        console.error('Unsupported role:', storedUser.role);
      }
    }
  }, [navigate]);

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
          <TextFiled text='User Name' value={userName} onChange={handleUserNameChange} />
          <TextFiled text='Password' type='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className='BRightSide' >
          
          <LogInButton text='Log In' onClick={handleSubmit}/>
          <div>
          <Sign account="Don't have an account?" sign='up' />
          <Link to="/SignUp"></Link>
          </div>
         
          
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;
