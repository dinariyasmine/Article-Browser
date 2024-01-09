// SignUp.js
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

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log("Handling email change...");
    console.log("Event:", e);  // Log the entire event object for additional details
    setEmail(e.target.value);
    console.log("Email:", email);  // Log the updated email state
  };
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("mot de passe :",password);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Email:",email);
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
      // Handle the response as needed
    } catch (error) {
      console.error('Error during registration:', error.response.data);
      console.log('Validation errors:', error.response.data.errors); // Add this line
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
        <AuthentificationTitle title='Create Account' />
        <div className='MRightSide'>
          <TextFiled text='Full Name' value={fullName} onChange={handleFullNameChange} />
          <TextFiled text='Email address' value={email} onChange={handleEmailChange} />
          <TextFiled text='Password' type='password' value={password} onChange={handlePasswordChange} />
          <TextFiled text='Confirm Password' type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </div>
        <div className='BRightSide' onClick={handleSubmit}>
          <LogInButton text='Get Started !'  />
          <Sign account='Already have an account?' sign='in' />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
