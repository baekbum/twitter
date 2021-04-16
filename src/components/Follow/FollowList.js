import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fnUserTimes } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isFollow, setFollow } from '../../dbFuncion/Follow';

const FollowList = ({followList, userObj}) => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Image src={searchObj.photoURL} style={{height: '4vh', width: '4vh'}} roundedCircle />            
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center', paddingLeft: '1vw'}}>
                        <div>{searchObj.displayName}</div>
                        <div style={{ fontSize: '0.9em' }}>{searchObj.tagId}</div>
                    </div>
                </div>               
            </Card.Body>
        </Card>
    )
};

function mapStateToProps(state) {
    return { 
        userObj : state.userReducer.userObj,
    };
}

export default connect(mapStateToProps, null) (FollowList);