import { authService } from 'Database';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName||'');
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };
    /* const getMyTweets = async () => {
        const tweets = await dbService.collection('tweets').where('userId', '==', userObj.uid).orderBy('createDt','desc').get();
        console.log(tweets.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyTweets();
    }, []); */
    const onChange = (event) => {
        const value = event.target.value;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
           await userObj.updateProfile({
               displayName : newDisplayName
           });
           refreshUser();
        }
    };
    return (
        <div className='container'>
            <form onSubmit={onSubmit} className='profileForm'>
                <input onChange={onChange} type='text' autoFocus placeholder='이름' value={newDisplayName} className='formInput' />
                <input type='submit' value='업데이트' className='formBtn' style={{ marginTop: 10 }}/>
            </form>
            <span className='formBtn cancelBtn logOut' onClick={onLogOutClick}> Log Out </span>
        </div>
    )
}

export default Profile;