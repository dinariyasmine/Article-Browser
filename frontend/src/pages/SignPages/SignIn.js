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

/**
 * SignIn component for user login.
 *
 * @component
 * @returns {JSX.Element} SignIn component
 */

const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handle change in the 'User Name' field.
   *
   * @param {Object} e - Event object
   */

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  /**
   * Handle change in the 'Password' field.
   *
   * @param {Object} e - Event object
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handle form submission.
   *
   * @async
   */
  
  const handleSubmit = async () => {
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

      // Set global variable indicating the user is logged in
      window.isLoggedIn = true;

      // Store the user in local storage
      localStorage.setItem('user', JSON.stringify(user));
      console.log('user', JSON.parse(localStorage.getItem('user')));
      console.log('Logged in?', window.isLoggedIn);

      // Navigate to the next page based on user role
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        if (storedUser.role === 0) {
          navigate('/UserSpace');
        } else if (storedUser.role === 1) {
          navigate('/ModeratorSpace');
        } else if (storedUser.role === 2) {
          navigate('/AdminSpace');
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

  // Redirect if the user is already logged in
  useEffect(() => {
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
