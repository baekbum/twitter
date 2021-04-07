import Tweet from 'components/Tweet';
import { dbService } from 'Database';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState('');
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
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection('tweets').add({
            content : tweet,
            createDt : Date.now(),
            userId : userObj.uid
        })
        setTweet('');
    };
    const onChange = (event) => {
        const value = event.target.value;
        setTweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' placeholder='내용을 입력해주세요.' maxLength={120} value={tweet} onChange={onChange}/>
                <input type='submit' value='Tweet' />
            </form>
            <div>
                {tweets.map((t) => <Tweet key={t.id} tweetObj={t} isOwner={t.userId === userObj.uid ? true : false} />)}
            </div>
        </div>
    )
}

export default Home;