import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { dbService, storageService } from 'Database';
import { v4 as uuid } from 'uuid';

const TweetForm = ({userObj}) => {
    const [tweet, setTweet] = useState('');
    const [imageFile, setImageFile] = useState('');
    const onSubmit = async (event) => {
        if (tweet === '') {
            return;
        }

        event.preventDefault();
        let fileUrl = '';
        if (imageFile) {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
            const fileInstance = await fileRef.putString(imageFile, 'data_url');
            fileUrl = await fileInstance.ref.getDownloadURL();
        }
        const tweetObj = {
            content : tweet,
            createDt : Date.now(),
            userId : userObj.uid,
            fileUrl : fileUrl
        } 

        await dbService.collection('tweets').add(tweetObj);
        setTweet('');
    };
    const onChange = (event) => {
        const value = event.target.value;
        setTweet(value);
    };
    const onFileChange = (event) => {
        const files = event.target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const result = finishedEvent.currentTarget.result;
            setImageFile(result);
        }
        reader.readAsDataURL(file);
    }
    const onClearImage = () => {
        setImageFile('');
    }
    return (
        <>
            <form onSubmit={onSubmit} className='tweetForm'>
                <div className='tweetInput__container'>
                    <input type='text' placeholder='내용을 입력해주세요.' maxLength={120} value={tweet} onChange={onChange} className='tweetInput__input'/>
                    <input type='submit' value='&rarr;' className='tweetInput__arrow'/>
                </div>
                <label htmlFor='attach-file' className='tweetInput__label'>
                    <span>사진 첨부</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input type='file' id='attach-file' accept='image/*' onChange={onFileChange} style={{opacity: 0}} />
                { imageFile ? (
                    <div className='tweetForm__file'>
                        <img src={imageFile} style={{ backgroundImage: imageFile}} alt='이미지' />
                        <div className='tweetForm__clear' onClick={onClearImage}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                ) : '' }
            </form>
        </>   
    )
};

export default TweetForm;