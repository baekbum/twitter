import React, { useCallback } from "react";
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt, faHome, faPen, faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import * as actions from '../../action/Action';
import * as types from '../../action/ActionTypes';
import { authService } from "Database";
import { connect } from "react-redux";
import '../../css/Header/Header.css';

const Header = ({ dispatch }) => {
    const history = useHistory();
    const onLogOutClick = useCallback(() => {
        authService.signOut();
        history.push('/');
        // eslint-disable-next-line
    },[]);

    return (
        <nav className='header-nav'>
            <div className='header-logo'>
                <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x' />
            </div>
            <div className='header-icon-web'>
                <FontAwesomeIcon icon={faHome} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.timelineShow.bind(this, 'WEB')} />
                <FontAwesomeIcon icon={faPen} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.tweetShow.bind(this, 'WEB')} />
                <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.searchShow.bind(this, 'WEB')} />
                <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.followShow.bind(this, 'WEB')} />
                <ProfileModal />
                <FontAwesomeIcon icon={faSignOutAlt} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw', cursor: 'pointer'}} onClick={onLogOutClick} />
            </div>
            <div className='header-icon-mobile'>
                <FontAwesomeIcon icon={faHome} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.timelineShow.bind(this, 'MOBILE')} />
                <FontAwesomeIcon icon={faPen} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.tweetShow.bind(this, 'MOBILE')} />
                <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.searchShow.bind (this, 'MOBILE')} />
                <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={dispatch.followShow.bind(this, 'MOBILE')} />
                <ProfileModal />
                <FontAwesomeIcon icon={faSignOutAlt} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw', cursor: 'pointer'}} onClick={onLogOutClick} />
            </div>
        </nav>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch : {
            timelineShow: (display) => dispatch(actions.componentShowHide(types.TIMELINE_SHOW, display)),
            tweetShow: (display) => dispatch(actions.componentShowHide(types.TWEET_SHOW, display)),
            searchShow: (display) => dispatch(actions.componentShowHide(types.SEARCH_SHOW, display)),
            followShow: (display) => dispatch(actions.componentShowHide(types.FOLLOW_SHOW, display))
        }        
    };
}

export default connect(null, mapDispatchToProps) (Header);