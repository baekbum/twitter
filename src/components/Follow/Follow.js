import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import FollowList from './FollowList';

const Follow = ({following, follower}) => {
    return ( 
        <Tabs defaultActiveKey="following" id="followTab" style={{backgroundColor: '#d1d3e6'}}>
            <Tab eventKey="following" title="팔로잉">
                {following.map((o) => <FollowList key={o.uid} type={'following'} obj={o} />)}
            </Tab>
            <Tab eventKey="follower" title="팔로워">
                {follower.map((o) => <FollowList key={o.uid} type={'follower'} obj={o} />)}
            </Tab>
        </Tabs>
    );
};

function mapStateToProps(state) {
    return {
        following : state.followReducer.following,
        follower : state.followReducer.follower
    };
}

export default connect(mapStateToProps, null) (Follow);