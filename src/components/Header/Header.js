import React from "react";
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSignOutAlt, faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import * as actions from '../../action/Action';
import { authService } from "Database";
import { connect } from "react-redux";

const Header = ({ searchShow, followShow }) => {
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
                <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={searchShow} />
                <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} onClick={followShow} />
                <ProfileModal />
                <FontAwesomeIcon icon={faSignOutAlt} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw', cursor: 'pointer'}} onClick={onLogOutClick} />
            </div>
        </nav>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        searchShow: () => dispatch(actions.searchShow()),
        followShow: () => dispatch(actions.followShow())
    };
}

export default connect(null, mapDispatchToProps) (Header);