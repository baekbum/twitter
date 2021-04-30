import React, { useCallback, useState } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { dbService, storageService } from 'Database';
import { connect } from 'react-redux';
import { refreshUserObj } from '../../dbFuncion/UserInfo';
import defaultImage from '../../image/default.png';
import '../../css/Header/ProfileModal.scss';

const ProfileModal = ({state, dispatch}) => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [tagId, setTagId] = useState(state.userObj.tagId);
    const [name, setName] = useState(state.userObj.displayName);
    const [phoneNumber, setPhoneNumber] = useState(state.userObj.phoneNumber);    
    const [imageFile, setImageFile] = useState('');
    const [imageName, setImageName] = useState('');

    const onChange = useCallback((event) => {
        const {target : {name, value}} = event;

        if (name === 'name') {
            setName(value);
        } else if (name === 'phoneNumber'){
            setPhoneNumber(value);
        } else if (name === 'tagId'){
            setTagId(value);
        }
    },[]);

    const onFileChange = useCallback(async (event) => {
        const files = event.target.files;
        const file = files[0];
        const dImage = defaultImage;
        if (file) {
            if (state.userObj.photoURL !== dImage) {
                await storageService.refFromURL(state.userObj.photoURL).delete();
            }            

            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const result = finishedEvent.currentTarget.result;
                setImageFile(result);
            }
            setImageName(file.name);
            reader.readAsDataURL(file);
        }
    },[state.userObj.photoURL]);

    const onEdit = useCallback(async (event) => {
        if (name === '') {
            return;
        }        
        
        let fileUrl = imageFile === '' ? state.userObj.photoURL : imageFile;
        
        if (imageFile) {
            const fileRef = storageService.ref().child(`${state.userObj.uid}/${uuid()}`);
            const fileInstance = await fileRef.putString(imageFile, 'data_url');
            fileUrl = await fileInstance.ref.getDownloadURL();
        }

        await dbService.doc(`userInfo/${state.userObj.id}`).update({
            tagId : tagId,
            displayName : name,
            phoneNumber : phoneNumber,
            photoURL : fileUrl
        });

        dispatch.refreshUser(state.userObj.uid);

        alert('수정 되었습니다.');
    },[dispatch, imageFile, tagId, name, phoneNumber, state.userObj]);

    const onClearImage = useCallback(async () => {
        setImageName('');
        setImageFile('');

        await dbService.doc(`userInfo/${state.userObj.id}`).update({
            photoURL : null
        });

        dispatch.refreshUser(state.userObj.uid);

        alert('수정 되었습니다.');
    },[dispatch, state.userObj]);

    const onToggleEdit = useCallback(() => {
        setEditMode((prev) => !prev);
    },[]);

    const onHandleModal = useCallback((show) => {
        if (show === false) {
            setEditMode(false);
        }
        setShow(show);
    },[]);

    return (
        <>  
            <Image src={state.userObj.photoURL} className='img-icon' onClick={onHandleModal.bind(this, true)} roundedCircle />

            <Modal show={show} onHide={onHandleModal.bind(this, false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton className='div-header'>
                    <Modal.Title>프로필</Modal.Title>
                    <Button variant="outline-primary" size="sm" onClick={onToggleEdit} className='btn-edit'>EditMode</Button>    
                </Modal.Header>
                <Modal.Body className='div-body'>
                    <div className='div-profile'>
                        <div>
                            <div className='div-img'>
                                <Image src={state.userObj.photoURL} roundedCircle />
                            </div>
                            <span className='span-name'>{state.userObj.displayName}</span>
                            <span className='span-id'>{state.userObj.tagId}</span>
                        </div>
                    </div>
                    { editMode ? (
                        <div className='div-input'>
                            <Form className='div-form'>
                                <Form.Group controlId="tagId">
                                    <Form.Label>Edit tagId</Form.Label>
                                    <Form.Control name="tagId" type="text" placeholder="Enter tagId" onChange={onChange} defaultValue={state.userObj.tagId} />
                                    <Form.Text className="text-muted">tagId의 시작은 @로 시작되어야합니다.</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Edit name</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="Enter name" onChange={onChange} defaultValue={state.userObj.displayName} />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Edit phoneNumber</Form.Label>
                                    <Form.Control name="phoneNumber" type="text" placeholder="Enter phoneNumber" onChange={onChange} defaultValue={state.userObj.phoneNumber} />
                                </Form.Group>
                                <Form.Group controlId="profileImage">
                                    <Form.Label>Edit profile image</Form.Label>
                                    <div className='div-select-img'>
                                        <Form.File id="image-file" label={ imageName === '' ? 'Edit profile image' : imageName } accept='image/*' custom onChange={onFileChange} />
                                        <Button variant="outline-secondary" onClick={onClearImage}>Clear</Button>
                                    </div>                                    
                                </Form.Group>                                
                            </Form>
                            <div className='div-edit'>
                                <Button variant="primary" onClick={onEdit}>Edit</Button>
                            </div> 
                        </div>
                    ) : null }
                </Modal.Body>
            </Modal>
        </>
    );
}

function mapStateToProps(state) {
    return { 
        state : {
            userObj : state.userReducer.userObj
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            refreshUser : async (uid) => dispatch(await refreshUserObj(uid))
        }        
    };
  }

export default connect(mapStateToProps, mapDispatchToProps) (ProfileModal);