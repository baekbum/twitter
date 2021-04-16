import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {  dbService } from 'Database';
import SearchList from './SearchList';

const Search = () => {
    const [result, setResult] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const onChange = (event) => {
        const value = event.target.value;

        setSearchVal(value);
    };
    const onSearch = async() => {
        const userList = await dbService.collection('userInfo').where('tagId','==',searchVal).get();        

        const userArray = userList.docs.map((doc) => ({
            ...doc.data(),
            id : doc.id
        }));

        setResult(userArray);    
    };
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Form>
                    <Form.Group style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.5em' }}>
                        <Form.Control name="search" type="text" onChange={onChange} />
                        <FontAwesomeIcon icon={faSearch} color={'#04AAFF'} size='1x' style={{cursor: 'pointer', marginLeft: '0.5vw'}} onClick={onSearch}/>
                    </Form.Group>
                </Form>
            </div>
            <div style={{ display: 'flex' }}>
                {result.map((t) => <SearchList key={t.uid} searchObj={t} />)}
            </div>
        </>
    );
};

export default Search;