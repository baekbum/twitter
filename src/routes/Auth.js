import React, { useState } from 'react';
import {authService, firebaseInstance} from '../Database';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const onChange = (event) => {
        const {target : {name, value}} = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            setErrMessage(error.message);
            console.log(errMessage);
        }
        
    };
    const toggleAccout = () => {
        setNewAccount((prev) => !prev);
    };
    const onSocialClick = async (event) => {
        const name = event.target.name;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='text' placeholder='Enter email' value={email} onChange={onChange} required />
                <input name='password' type='password' placeholder='Enter password' value={password} onChange={onChange} required />
                <input type='submit' value={newAccount ? 'Create Account' : 'Sign In'} />
            </form>
            <span onClick={toggleAccout}>{newAccount ? 'Sign In' : 'Create Account'}</span>
            <div>
                <button onClick={onSocialClick} name='google'>Google</button>
                <button onClick={onSocialClick} name='github'>Github</button>
            </div>
        </div>
    )    
};

export default Auth;