import {authService, firebaseInstance} from '../../Database';
import React, { memo, useCallback, useState } from 'react';
import AuthModal from './AuthModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Form, Button } from 'react-bootstrap';
import '../../css/Auth/AuthForm.scss';
import { setUserDB } from '../../dbFuncion/UserInfo';

const AuthForm = memo( () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const onChange = useCallback((event) => {
        const {target : {name, value}} = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    },[]);

    const onSignIn = useCallback(async() => {
        let data;

        try {
            data = await authService.signInWithEmailAndPassword(email, password);

            console.log(data);
        } catch (error) {
            setErrMessage(error.message);
            console.log(errMessage);
        }
    },[email, password, errMessage]);

    const onSocialClick = useCallback(async (event) => {
        const name = event.target.name;
        let provider;

        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
        setUserDB();
    },[]);

    return (
        <>
            <Form className='div-form'>
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
                <Button variant="primary" className='btn-login' onClick={onSignIn} >
                    ?????????
                </Button>
            </Form>
            <div className='div-social'>
                <Button variant="outline-secondary" name="google" className='btn-login' onClick={onSocialClick}>
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </Button>
                <Button variant="outline-secondary" name="github" className='btn-login' onClick={onSocialClick}>
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </Button>
            </div>
            <AuthModal />
        </>
    )
});

export default AuthForm;