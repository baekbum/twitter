import { dbService, storageService } from 'Database';
import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';

const TweetList = ({tweetObj, isOwner}) => {
    const onDelete = async () => {
        const check = window.confirm('정말 삭제하시겠습니까?');
        
        if (check) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.fileUrl).delete();
        }
    }
    return (
        <Card style={{marginBottom: '1vh'}}>
            <Card.Header>
                {tweetObj.userName} ( {tweetObj.tagId} )
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {tweetObj.content}
                </Card.Text>
                { tweetObj.fileUrl ? <Image src={tweetObj.fileUrl} rounded style={{width: '100%', marginTop: '1vh'}}/> : null }
            </Card.Body>
            { isOwner ? (
                <Card.Footer className="text-muted" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button variant="outline-danger" size='sm' style={{ borderRadius: '1em'}} onClick={onDelete}>Delete</Button>
                </Card.Footer>
            ) : (
                null
            )}
        </Card>
    )
};

export default TweetList;