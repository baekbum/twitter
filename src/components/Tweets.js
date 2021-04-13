import { dbService, storageService } from 'Database';
import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

const Tweets = ({userObj}) => {
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [imageName, setImageName] = useState('');
    const onTextChange = (event) => {
        const value = event.target.value;
        setText(value);
    };
    const onFileChange = (event) => {
        const files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const result = finishedEvent.currentTarget.result;
            setImageFile(result);
        }
        setImageName(file.name);
        reader.readAsDataURL(file);
    };
    const onClearImage = () => {
        setImageName('');
        setImageFile('');
    };
    const onTweet = async () => {
        if (text === '') {
            return;
        }

        let fileUrl = '';
        if (imageFile) {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
            const fileInstance = await fileRef.putString(imageFile, 'data_url');
            fileUrl = await fileInstance.ref.getDownloadURL();
        }

        const tweetObj = {
            content : text,
            createDt : Date.now(),
            userId : userObj.uid,
            userName : userObj.displayName,
            fileUrl : fileUrl
        }

        await dbService.collection('tweets').add(tweetObj);
        setText('');
        onClearImage();
    };
    return (
        <>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows={10} style={{marginTop: '1vh'}} onChange={onTextChange} value={text} />
                    { imageFile ? <Image src={imageFile} rounded style={{width: '100%', marginTop: '1vh', height: '39vh'}}/> : null }
                </Form.Group>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                        <Form.File id="image-file" label={ imageName === '' ? 'Add image' : imageName } accept='image/*' custom onChange={onFileChange} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '2vh'}}>
                        <Button variant="primary" style={{ borderRadius: '1em', marginRight: '0.5vw'}} onClick={onClearImage}>Image clear</Button>
                        <Button variant="primary" style={{ borderRadius: '1em'}} onClick={onTweet}>Tweet</Button>
                    </div>                    
                </div>                
            </Form>
        </>
    );
}

function mapStateToProps(state) {
    return { userObj : state };
}

export default connect(mapStateToProps, null) (Tweets);