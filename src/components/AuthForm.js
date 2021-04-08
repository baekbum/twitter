import { authService } from 'Database';
import React, { useState } from 'react';

const AuthForm = () => {
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
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name='email' type='text' placeholder='Enter email' value={email} onChange={onChange} className="authInput" required />
                <input name='password' type='password' placeholder='Enter password' value={password} onChange={onChange} className="authInput" required />
                <input type='submit' value={newAccount ? 'Create Account' : 'Sign In'} className="authInput authSubmit" />
                { errMessage ? <span className="authError">{errMessage}</span> : '' }
            </form>
            <span onClick={toggleAccout} className="authSwitch">{newAccount ? 'Sign In' : 'Create Account'}</span>
        </>
    )
};

export default AuthForm;