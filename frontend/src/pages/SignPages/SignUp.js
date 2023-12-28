import React from 'react';
import TextFiled from '../../components/Signing/TextFiled/TextFiled';
import LogInButton from '../../components/Signing/LogInButton/LogInButton';
import Logo from '../../components/Signing/Logo/Logo';
import Slogan from '../../components/Signing/Slogan/Slogan';
import AuthentificationTitle from '../../components/Signing/AuthentificationTitle/AuthentificationTitle';
import Sign from '../../components/Signing/Sign/Sign';
import AuthImg from '../../assets/AuthImage.svg';
import './Signing.css';

const SignUp = () => {
  return (
    <>
        <div className='LeftSide'>
          <div className='logo'>
            <Logo/>
          </div>
          <img src={AuthImg} alt='Authentification' />        
          <div className='slogan'>
            <Slogan/>
          </div>
        </div>
        <div className='RightSide'>
            <AuthentificationTitle title='Create Account' />
            <div className='MRightSide'>
              <TextFiled text='Full Name'/>
              <TextFiled text='Email adress'/>
              <TextFiled text='Password'/>
            </div>
            <div className='BRightSide'>
              <LogInButton text='Get Started !' />
              <Sign account='Already have an account?' sign='in'/>
            </div>
        </div>
    </>
  )
}

export default SignUp