import React from "react";
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import { authService } from "Database";

const Header = ({userObj, refreshUser}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    return (
        <nav style={{display: "flex", height: '100%', backgroundColor: '#1c2938', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{marginLeft: '1vw'}}>
                <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x' />
            </div>
            <div style={{marginRight: '1vw'}}>
                <ProfileModal userObj={userObj} refreshUser={refreshUser} />
                <FontAwesomeIcon icon={faSignOutAlt} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw', cursor: 'pointer'}} onClick={onLogOutClick} />
            </div>
        </nav>
    );
}

export default Header;