import Tweet from 'components/Tweet';
import TweetForm from 'components/TweetForm';
import { dbService } from 'Database';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [tweets, setTweets] = useState([]);
    /* const getTweets = async () => {
       const getDatas = await dbService.collection('tweets').get();
       getDatas.forEach((doc) => {
           const tweetObj = {
               ...doc.data(),
               id: doc.id
           };
            setTweets((prev) => [tweetObj, ...prev]);
       });
    } */
    useEffect(() => {
        //getTweets();
        dbService.collection('tweets').orderBy('createDt','desc').onSnapshot((snapshot) => {
            const tweeetArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id
            }));
            setTweets(tweeetArray);
        })
    }, []);
    return (
        <div className='container'>
            <TweetForm userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {tweets.map((t) => <Tweet key={t.id} tweetObj={t} isOwner={t.userId === userObj.uid ? true : false} />)}
            </div>
        </div>
    )
}

export default Home;