import { dbService, storageService } from 'Database';
import React, { memo, useCallback } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import '../../css/Tweet/TweetList.scss';

const TweetList = memo( ({tweetObj, isOwner}) => {
    const onDelete = useCallback(async () => {
        const check = window.confirm('정말 삭제하시겠습니까?');
        
        if (check) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.fileUrl).delete();
        }
    },[tweetObj]);

    return (
        <Card className='div-card'>
            <Card.Header>
                {tweetObj.userName} ( {tweetObj.tagId} )
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {tweetObj.content}
                </Card.Text>
                { tweetObj.fileUrl ? <Image src={tweetObj.fileUrl} rounded className='img-content' /> : null }
            </Card.Body>
            { isOwner ? (
                <Card.Footer className="text-muted div-footer">
                    <Button variant="outline-danger" size='sm' className='btn-delete' onClick={onDelete}>Delete</Button>
                </Card.Footer>
            ) : (
                null
            )}
        </Card>
    )
}, areEqual);

function areEqual(prevProps, nextProps) {
    return (
        prevProps.tweetObj === nextProps.tweetObj
        && prevProps.isOwner === nextProps.isOwner
    );
}

export default TweetList;