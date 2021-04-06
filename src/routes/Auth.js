import React, { useState } from 'react';
import {authService} from '../Database';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
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
            console.log(error);
        }
        
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='text' placeholder='Enter email' value={email} onChange={onChange} required />
                <input name='password' type='password' placeholder='Enter password' value={password} onChange={onChange} required />
                <input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
            </form>
            <div>
                <button>Google</button>
                <button>Github</button>
            </div>
        </div>
    )    
};

export default Auth;