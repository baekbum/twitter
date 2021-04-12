import {authService, firebaseInstance} from '../../Database';
import React, { useState } from 'react';
import AuthModal from './AuthModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Form, Button } from 'react-bootstrap';
import '../../css/Auth/AuthForm.css';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const onChange = (event) => {
        const {target : {name, value}} = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };
    const onSignIn = async () => {
        let data;        
        try {
            data = await authService.signInWithEmailAndPassword(email, password);
            
            console.log(data);
        } catch (error) {
            setErrMessage(error.message);
            console.log(errMessage);
        }
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
        <>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={onChange} />
                </Form.Group>
                <Form.Text className="text-muted">
                    { errMessage ? {errMessage} : '' }
                </Form.Text>
                <Button variant="primary" style={{ width: '100%'}} onClick={onSignIn} >
                    로그인
                </Button>
            </Form>
            <div className='auth-btns'>
                <Button variant="outline-secondary" name="google" style={{ width: '100%'}} onClick={onSocialClick}>
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </Button>
                <Button variant="outline-secondary" name="github" style={{ width: '100%'}} onClick={onSocialClick}>
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </Button>
            </div>
            <AuthModal />
        </>
    )
};

export default AuthForm;