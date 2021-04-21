import React from "react";
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt, faPen, faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import * as actions from '../../action/Action';
import { authService } from "Database";
import { connect } from "react-redux";
import '../../css/Header/Header.css';

const Header = ({ dispatch }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    return (
        <nav className='header-nav'>
            <div className='header-logo'>
                <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x' />
            </div>
            <div className='header-icon'>
                <FontAwesomeIcon icon={faPen} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.tweetShow} />
                <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.searchShow} />
                <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.followShow} />
                <ProfileModal />
                <FontAwesomeIcon icon={faSignOutAlt} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw', cursor: 'pointer'}} onClick={onLogOutClick} />
            </div>
        </nav>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            tweetShow: () => dispatch(actions.tweetShow()),
            searchShow: () => dispatch(actions.searchShow()),
            followShow: () => dispatch(actions.followShow())
        }        
    };
}

export default connect(null, mapDispatchToProps) (Header);