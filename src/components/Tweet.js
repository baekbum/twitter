import { dbService } from 'Database';
import React, { useState } from 'react';

const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [editTweet, setEditTweet] = useState(tweetObj.content);
    const onDeleteClick = async () => {
        const check = window.confirm('정말 삭제하시겠습니까?');
        
        if (check) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
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
        <div>
            { editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type='text' value={editTweet} onChange={onChange} required/>
                        <input type='submit' value='수정' />
                    </form>
                    <button onClick={toggleEditting}>취소</button>
                </>
            ) : (
                    <>
                        <h4>{tweetObj.content}</h4>
                        { isOwner ?  
                            <>
                                <button onClick={toggleEditting}>수정</button>
                                <button onClick={onDeleteClick}>삭제</button>
                            </>  
                        : ''}
                    </>
            )}
        </div>
    )
};

export default Tweet;