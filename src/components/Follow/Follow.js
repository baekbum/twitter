import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const Follow = () => {
    return ( 
        <Tabs defaultActiveKey="following" id="followTab" style={{backgroundColor: '#d1d3e6'}}>
            <Tab eventKey="following" title="팔로잉">
                팔로잉
            </Tab>
            <Tab eventKey="follower" title="팔로워">
                팔로워
            </Tab>
        </Tabs>
    );
};

export default Follow;