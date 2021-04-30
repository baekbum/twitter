import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {  dbService } from 'Database';
import SearchList from './SearchList';
import '../../css/Search/Search.scss';

const Search = () => {
    const [result, setResult] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const onChange = useCallback((event) => {
        const value = event.target.value;

        setSearchVal(value);
    },[]);

    const onSearch = useCallback(async () => {
        const userList = await dbService.collection('userInfo').where('tagId','==',searchVal).get();        

        const userArray = userList.docs.map((doc) => ({
            ...doc.data(),
            id : doc.id
        }));

        setResult(userArray);
    },[searchVal]);

    return (
        <div className='div-search'>
            <div className='div-search-box'>
                <Form>
                    <Form.Group className='div-form'>
                        <Form.Control name="search" type="text" onChange={onChange} />
                        <FontAwesomeIcon icon={faSearch} size='1x' className='icon' onClick={onSearch}/>
                    </Form.Group>
                </Form>
            </div>
            <div className='div-search-list-box' >
                {result.map((t) => <SearchList key={t.uid} searchObj={t} />)}
            </div>
        </div>
    );
};

export default Search;