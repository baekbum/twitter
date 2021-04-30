import { dbService, storageService } from 'Database';
import React, { useCallback, useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import '../../css/Tweet/Tweet.scss';

const Tweets = ({state}) => {
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [imageName, setImageName] = useState('');

    const onTextChange = useCallback((event) => {
        const value = event.target.value;
        setText(value);
    },[]);

    const onFileChange = useCallback((event) => {
        const files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const result = finishedEvent.currentTarget.result;
            setImageFile(result);
        }
        setImageName(file.name);
        reader.readAsDataURL(file);
    },[]);

    const onClearImage = useCallback(() => {
        setImageName('');
        setImageFile('');
    },[]);

    const onTweet = useCallback(async () => {
        if (text === '') {
            return;
        }

        let fileUrl = '';
        if (imageFile) {
            const fileRef = storageService.ref().child(`${state.userObj.uid}/${uuid()}`);
            const fileInstance = await fileRef.putString(imageFile, 'data_url');
            fileUrl = await fileInstance.ref.getDownloadURL();
        }

        const tweetObj = {
            content : text,
            createDt : Date.now(),
            userId : state.userObj.uid,
            tagId : state.userObj.tagId,
            userName : state.userObj.displayName,
            fileUrl : fileUrl
        }

        await dbService.collection('tweets').add(tweetObj);
        setText('');
        onClearImage();
        // eslint-disable-next-line
    },[state.userObj, imageFile, text]);

    return (
        <Form className='div-form'>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={10} className='input-textarea' onChange={onTextChange} value={text} />
                { imageFile ? <Image src={imageFile} rounded className='img-attached' /> : null }
            </Form.Group>
            <div className='div-img-attachment'>
                <div>
                    <Form.File id="image-file" label={ imageName === '' ? 'Add image' : imageName } accept='image/*' custom onChange={onFileChange} />
                </div>
                <div className='div-btns'>
                    <Button variant="primary" className='btn-clear' onClick={onClearImage}>Image clear</Button>
                    <Button variant="primary" className='btn-tweet' onClick={onTweet}>Tweet</Button>
                </div>                    
            </div>                
        </Form>
    );
}

function mapStateToProps(state) {
    return { 
        state : {
            userObj : state.userReducer.userObj 
        }        
    };
}

export default connect(mapStateToProps, null) (Tweets);