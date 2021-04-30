import AuthForm from '../components/Auth/AuthForm';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/Auth/Auth.scss';

const Auth = () => { 
    return (
        <div className='auth-container'>
            <div>
                <div className='div-icon'>
                    <FontAwesomeIcon icon={faTwitter} size='3x' className='icon'/>
                </div>
                <div className='div-span'>
                    <span>로그인</span>
                </div>
                <AuthForm />
            </div>
        </div>
    )    
};

export default Auth;