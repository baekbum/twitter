import Tweets from 'components/Tweet/Tweets';
import TweetList from 'components/Tweet/TweetList';
import { dbService } from 'Database';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPen, faHome, faSearch, faTimes, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import * as actions from '../action/Action';
import '../css/Home/Home.css';
import { connect } from 'react-redux';
import Search from 'components/Search/Search';
import Follow from 'components/Follow/Follow';
import { getFollowing, getFollower } from '../dbFuncion/Follow';

const Home = ({ state, dispatch }) => {
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
    }, [state.userObj]);

    return (
        <div className='main-container'>
            { state.isTimeLine ? (
                <div className='item-layout'>
                    <div className='item-header'>
                        <div> 
                            <FontAwesomeIcon icon={faHome} color={'#04AAFF'} size='lg' className='title-icon' />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>TimeLine</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' className='item-close' onClick={dispatch.timelineHide}/>
                    </div>
                    <div className='item-content'>
                        {tweets.map((t) => <TweetList key={t.id} tweetObj={t} isOwner={t.userId === state.userObj.uid ? true : false} />)}
                    </div>
                </div>
            ) : null }            
            { state.isTweet ? (
                <div className='item-layout'>
                    <div className='item-header'>
                        <div> 
                            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='lg' className='title-icon' />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>Tweet</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' className='item-close' onClick={dispatch.tweetHide}/>
                    </div>
                    <Tweets />
                </div>
            ) : null }
            { state.isSearch ? (
                <div className='item-layout'>
                    <div className='item-header'>
                        <div> 
                            <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' className='title-icon' />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>Search</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' className='item-close' onClick={dispatch.searchHide}/>
                    </div>
                    <div className='item-content' style={{ overflowY: 'hidden' }}>
                        <Search />
                    </div>                    
                </div>
            ) : null }
            { state.isFollow ? (
                <div className='item-layout'>
                    <div className='item-header'>
                        <div> 
                            <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' className='title-icon' />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>Follow info</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' className='item-close' onClick={dispatch.followHide}/>
                    </div>
                    <div className='item-content' style={{ overflowY: 'hidden' }}>
                        <Follow /> 
                    </div>
                </div>
            ) : null }
        </div>
    )
}

function mapStateToProps(state) {
    return { state : {
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
            timelineHide: () => dispatch(actions.timelineHide()),
            tweetHide: () => dispatch(actions.tweetHide()),
            searchHide: () => dispatch(actions.searchHide()),
            followHide: () => dispatch(actions.followHide()),
            saveFollow: (following, follower) => dispatch({ type: actions.saveFollow(), following: following, follower: follower})
        }        
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);