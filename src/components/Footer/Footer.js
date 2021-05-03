import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen, faSearch, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import * as actions from '../../action/Action';
import * as types from '../../action/ActionTypes';
import { connect } from "react-redux";
import '../../css/Footer/Footer.scss';

const Footer = ({ state, dispatch }) => {
    return (
        <div className='footer-container'>
            <nav className='div-nav'>
                <div className='div-icon'>
                    <FontAwesomeIcon icon={faHome} size='lg' className={state.isTimeLine ? 'icon-active' : 'icon'} onClick={dispatch.timelineShow.bind(this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faPen} size='lg' className={state.isTweet ? 'icon-active' : 'icon'} onClick={dispatch.tweetShow.bind(this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faSearch} size='lg' className={state.isSearch ? 'icon-active' : 'icon'} onClick={dispatch.searchShow.bind (this, 'MOBILE')} />
                    <FontAwesomeIcon icon={faUserFriends} size='lg' className={state.isFollow ? 'icon-active' : 'icon'} onClick={dispatch.followShow.bind(this, 'MOBILE')} />
                </div>
            </nav>
        </div>        
    );
}

function mapStateToProps(state) {
    return { 
        state : {
            isTimeLine : state.isShowReducer.isTimeLine,
            isTweet : state.isShowReducer.isTweet,
            isSearch : state.isShowReducer.isSearch,
            isFollow : state.isShowReducer.isFollow
        }
    };
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

export default connect(mapStateToProps, mapDispatchToProps) (Footer);