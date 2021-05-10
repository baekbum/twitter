import React, { memo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import FollowList from './FollowList';
import '../../css/Follow/Follow.scss';

const Follow = memo( ({state}) => {
    return ( 
        <Tabs defaultActiveKey="following" id="followTab">
            <Tab eventKey="following" title="팔로잉">
                {state.following.map((o) => <FollowList key={o.uid} type={'following'} obj={o} />)}
            </Tab>
            <Tab eventKey="follower" title="팔로워">
                {state.follower.map((o) => <FollowList key={o.uid} type={'follower'} obj={o} />)}
            </Tab>
        </Tabs>
    );
}, areEqual);

function areEqual(prevProps, nextProps) {
    return (
        prevProps.state.following === nextProps.state.following
        && prevProps.state.follower === nextProps.state.follower
    );
}

function mapStateToProps(state) {
    return {
        state : {
            following : state.followReducer.following,
            follower : state.followReducer.follower
        }        
    };
}

export default connect(mapStateToProps, null) (Follow);