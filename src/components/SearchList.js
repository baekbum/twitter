import { dbService, storageService } from 'Database';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from 'react-bootstrap';
import { connect } from 'react-redux';

const SearchList = ({obj, userObj}) => {
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>
                        <Image src={obj.photoURL} style={{height: '4vh', width: '4vh', cursor: 'pointer'}} roundedCircle />            
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center', paddingLeft: '1vw'}}>
                        <div>{obj.displayName}</div>
                        <div style={{ fontSize: '0.9em' }}>{obj.tagId}</div>
                    </div>                    
                </div>
                <div>
                    { obj.uid !== userObj.uid ? (
                        <FontAwesomeIcon icon={faUserPlus} color={'#04AAFF'} size='lg' style={{marginRight: '1vw', cursor: 'pointer'}} />
                    ) : null }                    
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

export default connect(mapStateToProps, null) (SearchList);