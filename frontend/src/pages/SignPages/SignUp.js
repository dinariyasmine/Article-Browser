import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextFiled from '../../components/Signing/TextFiled/TextFiled';
import LogInButton from '../../components/Signing/LogInButton/LogInButton';
import Logo from '../../components/Signing/Logo/Logo';
import Slogan from '../../components/Signing/Slogan/Slogan';
import AuthentificationTitle from '../../components/Signing/AuthentificationTitle/AuthentificationTitle';
import Sign from '../../components/Signing/Sign/Sign';
import AuthImg from '../../assets/AuthImage.svg';
import './Signing.css';

/**
 * SignUp component for user registration.
 *
 * @component
 * @returns {JSX.Element} SignUp component
 */

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * Handle change in the 'UserName' field.
   *
   * @param {Object} e - Event object
   */

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  /**
   * Handle change in the 'Email address' field.
   *
   * @param {Object} e - Event object
   */

  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    setEmail(updatedEmail);
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
   * Handle change in the 'Confirm Password' field.
   *
   * @param {Object} e - Event object
   */

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  /**
   * Handle form submission.
   *
   * @async
   */

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/auth/register/',
        {
          username: fullName,
          email: email,
          password1: password,
          password2: confirmPassword,
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
      navigate('/SignIn');
    } catch (error) {
      console.error('Error during registration:', error.response.data);
      console.log('Validation errors:', error.response.data.errors);
    }
  };

  /**
  * Redirect if the user is already logged in.
  */

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (storedUser.role === 0) {
        navigate('/UserSpace');
      } else if (storedUser.role === 1) {
        navigate('/ModeratorSpace');
      } else {
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
        <AuthentificationTitle title='Create Account' />
        <div className='MRightSide'>
          <TextFiled text='UserName' value={fullName} onChange={handleFullNameChange} />
          <TextFiled text='Email address' value={email} onChange={handleEmailChange} />
          <TextFiled text='Password' type='password' value={password} onChange={handlePasswordChange} />
          <TextFiled text='Confirm Password' type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className='BRightSide'>
          <LogInButton text='Get Started !' onClick={handleSubmit} />
          <Sign account='Already have an account?' sign='in' />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
