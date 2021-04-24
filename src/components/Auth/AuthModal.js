import { authService } from 'Database';
import React, { useCallback, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { setUserDB } from '../../dbFuncion/UserInfo';

const AuthModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const onHandleModal = useCallback((show) => {
        setShow(show);
    },[]);
    
    const onChange = useCallback((event) => {
        const {target : {name, value}} = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    },[]);

    const onSignUp = useCallback(async () => {
        let data; 

        try {
            data = await authService.createUserWithEmailAndPassword(email, password);
            setUserDB();
            alert('가입 되었습니다.');
            console.log(data);
        } catch (error) {
            setErrMessage(error.message);
            console.log(errMessage);
        }
    },[email, password, errMessage]);
    return (
      <>
        <Button variant="outline-secondary" style={{ width: '100%', marginTop: '2vh'}} onClick={onHandleModal.bind(this, true)}>
            가입하기
        </Button>
  
        <Modal show={show} onHide={onHandleModal.bind(this, false)} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>회원가입</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter password" onChange={onChange} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        { errMessage ? {errMessage} : '' }
                    </Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onSignUp}>가입하기</Button>
                <Button variant="secondary" onClick={onHandleModal.bind(this, false)}>
                    닫기
                </Button>            
            </Modal.Footer>
        </Modal>
      </>
    );
}

export default AuthModal;