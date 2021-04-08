import { dbService, storageService } from 'Database';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] = useState(tweetObj.content);
    const onDeleteClick = async () => {
        const check = window.confirm('정말 삭제하시겠습니까?');
        
        if (check) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.fileUrl).delete();
        }
    };
    const toggleEditting = () => {
        setEditing((prev) => !prev);
    };
    const onChange = (event) => {
        const value = event.target.value;
        setEditTweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            content : editTweet
        });
        setEditing(false);
    };
    return (
        <div className="tweet">
            { editing ? (
                <>
                    <form onSubmit={onSubmit} className="container tweetEdit">
                        <input type='text' value={editTweet} onChange={onChange} className="formInput" autoFocus required/>
                        <input type='submit' value='수정' className="formBtn"/>
                    </form>
                    <button onClick={toggleEditting} className="formBtn cancelBtn">취소</button>
                </>
            ) : (
                    <>
                        <h4>{tweetObj.content}</h4>
                        { tweetObj.fileUrl ? <img src={tweetObj.fileUrl} alt='이미지' /> : ''}
                        { isOwner ?
                            <div className="tweet__actions">
                                <span onClick={toggleEditting}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>                                
                            </div> 
                        : ''}
                    </>
            )}
        </div>
    )
};

export default Tweet;