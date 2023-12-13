import React from 'react';
import TextFiled from '../components/TextFiled/TextFiled';
import LogInButton from '../components/LogInButton/LogInButton';
import Logo from '../components/Logo/Logo';
import Slogan from '../components/Slogan/Slogan';
import AuthentificationTitle from '../components/AuthentificationTitle/AuthentificationTitle';
import Sign from '../components/Sign/Sign';
import AuthImg from '../assets/AuthImage.svg';
import './Signing.css';


const SignIn = () => {
  return (
    <section>
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
            <AuthentificationTitle title='Log In' />
            <div className='MRightSide'>
              <TextFiled text='Email adress'/>
              <TextFiled text='Password'/>
            </div>
            <div className='BRightSide'>
              <LogInButton text='Log In' />
              <Sign account='Don t have an account?' sign='up'/>
            </div>
        </div>
    </section>
  )
}

export default SignIn