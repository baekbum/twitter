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

const Home = ({userObj, isSearch, searchHide, isFollow, followHide}) => {
    const [tweets, setTweets] = useState([]);
    const [tweetWrite, setTweetWrite] = useState(false);

    const onTweetShow = () => {
        setTweetWrite((prev) => !prev);
    };

    useEffect(() => {
        dbService.collection('tweets').orderBy('createDt','desc').onSnapshot((snapshot) => {
            const tweeetArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id
            }));
            setTweets(tweeetArray);
        })
    }, []);

    return (
        <div className='main-container'>
            <div className='tweet-list'>
                <div style={{height: '5vh', backgroundColor: '#1c2938', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div> 
                        <FontAwesomeIcon icon={faHome} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw'}} />
                        <span style={{color: 'white', marginLeft: '0.5vw'}}>TimeLine</span>
                    </div>
                    <FontAwesomeIcon icon={faPen} color={'#04AAFF'} size='1x' style={{cursor: 'pointer', marginRight: '1vw'}} onClick={onTweetShow}/>
                </div>
                <div style={{ marginTop: '1vh', display: 'flex', flexDirection: 'column', height: '83vh', overflow: 'scroll', overflowX: 'hidden'}}>
                    {tweets.map((t) => <TweetList key={t.id} tweetObj={t} isOwner={t.userId === userObj.uid ? true : false} />)}
                </div>
            </div>
            { tweetWrite ? (
                <div className='tweet'>
                    <div style={{height: '5vh', backgroundColor: '#1c2938', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div> 
                            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw'}} />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>Tweet</span>
                        </div>
                    </div>
                    <Tweets />
                </div>
            ) : null }            
            <div className='message-list' style={{display: 'none'}}>
                DM
            </div>
            <div className='message' style={{display: 'none'}}>
                DM write
            </div>
            { isSearch ? (
                <div className='search'>
                    <div style={{height: '5vh', backgroundColor: '#1c2938', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div> 
                            <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw'}} />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>Search</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' style={{cursor: 'pointer', marginRight: '1vw'}} onClick={searchHide}/>
                    </div>
                    <div style={{ width: '100%', marginTop: '1vh', display: 'flex', flexDirection: 'column', height: '83vh', overflow: 'scroll', overflowX: 'hidden', overflowY: 'hidden'}}>
                        <Search />
                    </div>                    
                </div>
            ) : null }
            { isFollow ? (
                <div className='search'>
                    <div style={{height: '5vh', backgroundColor: '#1c2938', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div> 
                            <FontAwesomeIcon icon={faUserFriends} color={'#04AAFF'} size='lg' style={{marginLeft: '1vw'}} />
                            <span style={{color: 'white', marginLeft: '0.5vw'}}>follow info</span>
                        </div>
                        <FontAwesomeIcon icon={faTimes} color={'#04AAFF'} size='1x' style={{cursor: 'pointer', marginRight: '1vw'}} onClick={followHide}/>
                    </div>
                    <div style={{ width: '100%', marginTop: '1vh', display: 'flex', flexDirection: 'column', height: '83vh', overflow: 'scroll', overflowX: 'hidden', overflowY: 'hidden'}}>
                        <Follow />
                    </div>
                </div>
            ) : null }
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        userObj : state.userReducer.userObj,
        isSearch : state.searchReducer.isSearch,
        isFollow : state.followReducer.isFollow
    };
}

function mapDispatchToProps(dispatch) {
    return {
        searchHide: () => dispatch(actions.searchHide()),
        followHide: () => dispatch(actions.followHide())
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);