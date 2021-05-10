import { dbService } from 'Database';
import React, { memo, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHome, faSearch, faTimes, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import * as actions from '../action/Action';
import * as types from '../action/ActionTypes';
import '../css/Home/Home.scss';
import { connect } from 'react-redux';
import { getFollowing, getFollower } from '../dbFuncion/Follow';
import Tweets from '../components/Tweet/Tweets';
import TweetList from '../components/Tweet/TweetList';
import Search from '../components/Search/Search';
import Follow from '../components/Follow/Follow';

const Home = memo( ({ state, dispatch }) => {
    const [isFrist, setIsFrist] = useState(true);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        async function init (uid) {
            const following = await getFollowing(uid);
            const followingId = following.map((o) => o.uid);
            followingId.push(uid);            
            const follower = await getFollower(uid);
            await dispatch.saveFollow(following, follower);            

            if (isFrist) {
                dbService.collection('tweets').where('userId','in',followingId).orderBy('createDt','desc').onSnapshot((snapshot) => {
                    const tweeetArray = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id : doc.id
                    }));
                    setTweets(tweeetArray);
                });
                setIsFrist(false);
            }            
        };
        init(state.userObj.uid);
        // eslint-disable-next-line
    }, [state.userObj]);

    return (
        <div className='home-container'>
            <div className={state.isTimeLine ? 'div-item-box-active' : 'div-item-box'}>
                <div className='div-header'>
                    <div> 
                        <FontAwesomeIcon icon={faHome} size='lg' className='icon' />
                        <span className='title'>TimeLine</span>
                    </div> 
                    <FontAwesomeIcon icon={faTimes} size='1x' className='icon-close' onClick={dispatch.timelineHide.bind(this, 'WEB')}/>
                </div>
                <div className='div-content'>
                    {tweets.map((t) => <TweetList key={t.id} tweetObj={t} isOwner={t.userId === state.userObj.uid ? true : false} />)}
                </div>
            </div>
            <div className={state.isTweet ? 'div-item-box-active' : 'div-item-box'}>
                <div className='div-header'>
                    <div> 
                        <FontAwesomeIcon icon={faTwitter} size='lg' className='icon' />
                        <span className='title'>Tweet</span>
                    </div>
                    <FontAwesomeIcon icon={faTimes} size='1x' className='icon-close' onClick={dispatch.tweetHide.bind(this, 'WEB')}/>
                </div>
                <div className='div-content-no-scroll'>
                    <Tweets />
                </div>
            </div>
            <div className={state.isSearch ? 'div-item-box-active' : 'div-item-box'}>
                <div className='div-header'>
                    <div> 
                        <FontAwesomeIcon icon={faSearch} size='lg' className='icon' />
                        <span className='title'>Search</span>
                    </div>
                    <FontAwesomeIcon icon={faTimes} size='1x' className='icon-close' onClick={dispatch.searchHide.bind(this, 'WEB')}/>
                </div>
                <div className='div-content-no-scroll'>
                    <Search />
                </div>                    
            </div>
            <div className={state.isFollow ? 'div-item-box-active' : 'div-item-box'}>
                <div className='div-header'>
                    <div> 
                        <FontAwesomeIcon icon={faUserFriends} size='lg' className='icon' />
                        <span className='title'>Follow info</span>
                    </div>
                    <FontAwesomeIcon icon={faTimes} size='1x' className='icon-close' onClick={dispatch.followHide.bind(this, 'WEB')}/>
                </div>
                <div className='div-content-no-scroll'>
                    <Follow /> 
                </div>
            </div>
        </div>
    )
}, areEqual);

function areEqual(prevProps, nextProps) {
    return (
        prevProps.state.userObj === nextProps.state.userObj
        && prevProps.state.isTimeLine === nextProps.state.isTimeLine
        && prevProps.state.isTweet === nextProps.state.isTweet
        && prevProps.state.isSearch === nextProps.state.isSearch
        && prevProps.state.isFollow === nextProps.state.isFollow
    );
}

function mapStateToProps(state) {
    return { 
        state : {
            userObj : state.userReducer.userObj,
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
            timelineHide: (display) => dispatch(actions.componentShowHide(types.TIMELINE_HIDE, display)),
            tweetHide: (display) => dispatch(actions.componentShowHide(types.TWEET_HIDE, display)),
            searchHide: (display) => dispatch(actions.componentShowHide(types.SEARCH_HIDE, display)),
            followHide: (display) => dispatch(actions.componentShowHide(types.FOLLOW_HIDE, display)),
            saveFollow: (following, follower) => dispatch({ type: actions.saveFollow(), following: following, follower: follower})
        }        
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);