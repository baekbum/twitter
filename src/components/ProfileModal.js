import React, { useState } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { authService, storageService } from 'Database';
import { connect } from 'react-redux';
import { fnUser } from 'store/store';

const ProfileModal = ({userObj, dispatch}) => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [imageName, setImageName] = useState('');

    const onChange = (event) => {
        const {target : {name, value}} = event;

        if (name === 'name') {
            setName(value);
        } else if (name === 'phoneNumber'){
            setPhoneNumber(value);
        }
    };
    const onFileChange = async (event) => {
        const files = event.target.files;
        const file = files[0];
        if (file) {
            await storageService.refFromURL(userObj.photoURL).delete();

            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const result = finishedEvent.currentTarget.result;
                setImageFile(result);
            }
            setImageName(file.name);
            reader.readAsDataURL(file);
        }        
    };
    const onEdit = async (event) => {
        if (name === '') {
            return;
        }

        let fileUrl = userObj.photoURL;
        
        if (imageFile) {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
            const fileInstance = await fileRef.putString(imageFile, 'data_url');
            fileUrl = await fileInstance.ref.getDownloadURL();
        }

        await userObj.updateProfile({
            displayName : name,
            phoneNumber : phoneNumber,
            photoURL : fileUrl
        });

        const curUser = authService.currentUser;
        dispatch(fnUser.initUser(curUser));
    };
    const onClearImage = async () => {
        setImageName('');
        setImageFile('');

        await userObj.updateProfile({
            photoURL : null
        });

        const curUser = authService.currentUser;
        dispatch(fnUser.initUser(curUser));
    };
    const onToggleEdit = () => {
        setEditMode((prev) => !prev);
    };
    const onHandleModal = (show) => {
        if (show === false) {
            setEditMode(false);
        }
        setShow(show);
    };
    return (
        <>  
            <Image src={userObj.photoURL} style={{height: '4vh', width: '4vh', cursor: 'pointer'}} onClick={onHandleModal.bind(this, true)} roundedCircle />            

            <Modal show={show} onHide={onHandleModal.bind(this, false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Modal.Title>프로필</Modal.Title>
                    <Button variant="outline-primary" size="sm" onClick={onToggleEdit} style={{ marginLeft: '1vw'}}>EditMode</Button>    
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{display: 'flex', flexDirection: 'column', paddingBottom: '1vh'}}>
                        <div style={{height: '35vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{height: '20vh', width: '20vh'}}>
                                <Image src={userObj.photoURL} roundedCircle style={{width: '100%', height: '100%'}}/>
                            </div>                            
                            <span style={{fontSize: '2em'}}>{userObj.displayName}</span>
                        </div>
                    </div>
                    { editMode ? (
                        <div style={{ paddingTop: '1vh', borderTop: '0.5vh solid #dee2e6'}}>
                            <Form style={{paddingBottom: '1vh', borderBottom: '0.5vh solid #dee2e6'}}>
                                <Form.Group controlId="name">
                                    <Form.Label>Edit name</Form.Label>
                                    <Form.Control name="name" type="text" placeholder="Enter name" onChange={onChange} defaultValue={userObj.displayName} />
                                </Form.Group>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>Edit phoneNumber</Form.Label>
                                    <Form.Control name="phoneNumber" type="text" placeholder="Enter phoneNumber" onChange={onChange} defaultValue={userObj.phoneNumber} />
                                </Form.Group>
                                <Form.Group controlId="profileImage">
                                    <Form.Label>Edit profile image</Form.Label>
                                    <div style={{display: 'flex'}}>
                                        <Form.File id="image-file" label={ imageName === '' ? 'Edit profile image' : imageName } accept='image/*' custom onChange={onFileChange} />
                                        <Button variant="outline-secondary" onClick={onClearImage}>Clear</Button>
                                    </div>                                    
                                </Form.Group>                                
                            </Form>
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1vh'}}>
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
    return { userObj : state };
}

function mapDispatchToProps(dispatch) {
    return {dispatch};
  }

export default connect(mapStateToProps, mapDispatchToProps) (ProfileModal);