import { authService } from 'Database';
import React from 'react';
import { useHistory } from 'react-router';

const Profile = ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };    
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Profile;