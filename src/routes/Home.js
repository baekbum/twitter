import Tweets from 'components/Tweets';
import TweetList from 'components/TweetList';
import { dbService } from 'Database';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPen, faHome } from "@fortawesome/free-solid-svg-icons";
import '../css/Home/Home.css';
import { connect } from 'react-redux';

const Home = ({userObj}) => {
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
        </div>
    )
}

function mapStateToProps(state) {
    return { userObj : state };
}

export default connect(mapStateToProps, null) (Home);