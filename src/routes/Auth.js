import AuthForm from 'components/Auth/AuthForm';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/Auth/Auth.css';

const Auth = () => { 
    return (
        <div className='auth-container'>
            <div style={{ width: '25vw', display: 'flex', flexDirection: 'column'}}>
                <div className='auth-twitter-icon'>
                    <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='3x' style={{ marginBottom: '3vh' }}/>
                </div>
                <div className='auth-login-span'>
                    <span>로그인</span>
                </div>
                <AuthForm />
            </div>
        </div>
    )    
};

export default Auth;