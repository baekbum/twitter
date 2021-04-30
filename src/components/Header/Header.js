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
import '../../css/Header/Header.scss';

const Header = ({ dispatch }) => {
    const history = useHistory();
    const onLogOutClick = useCallback(() => {
        authService.signOut();
        history.push('/');
        // eslint-disable-next-line
    },[]);

    return (
        <div className='header-container'>
            <nav className='div-nav'>
                <div className='div-logo'>
                    <FontAwesomeIcon icon={faTwitter} className='logo' size='2x' />
                </div>
                <div className='div-icon-web'>
                    <FontAwesomeIcon icon={faHome} size='lg' className='icon' onClick={dispatch.timelineShow.bind(this, 'WEB')} />
                    <FontAwesomeIcon icon={faPen}  size='lg' className='icon' onClick={dispatch.tweetShow.bind(this, 'WEB')} />
                    <FontAwesomeIcon icon={faSearch} size='lg' className='icon' onClick={dispatch.searchShow.bind(this, 'WEB')} />
                    <FontAwesomeIcon icon={faUserFriends} size='lg' className='icon' onClick={dispatch.followShow.bind(this, 'WEB')} />
                    <ProfileModal />
                    <FontAwesomeIcon icon={faSignOutAlt} size='lg' className='icon-last' onClick={onLogOutClick} />
                </div>
                <div className='div-icon-mobile'>
                    <FontAwesomeIcon icon={faHome} size='lg' className='icon' onClick={dispatch.timelineShow.bind(this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faPen} size='lg' className='icon' onClick={dispatch.tweetShow.bind(this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faSearch} size='lg' className='icon' onClick={dispatch.searchShow.bind (this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faUserFriends} size='lg' className='icon' onClick={dispatch.followShow.bind(this, 'MOBILE')} />
                    <ProfileModal />
                    <FontAwesomeIcon icon={faSignOutAlt} size='lg' className='icon-last' onClick={onLogOutClick} />
                </div>
            </nav>
        </div>        
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