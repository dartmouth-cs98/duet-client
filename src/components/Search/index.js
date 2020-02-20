/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { search } from '../../utils/backendUtils';

const Search = ({ setUser, setIsSearching, enabled }) => {

    const [queryVal, setQueryVal] = useState('');
    const [users, setUsers] = useState([]);
    

    const handleChange = (e) => {
        const { value } = e.target;
        setQueryVal(value)
        if(value.length > 0) {
            search(value).then(setUsers)
        } else {
            setUsers([])
        }
    };  

    const handleUserSelect = (user) => {
        setUser({ id: user.id, name: user.display_name })
        setIsSearching(false);
        setQueryVal('');
    }


    return (
        <>
        { enabled &&
            <div className="Search">
                <div className="Search-Top">
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6691 3L3.00003 16.669L16.6691 30.3381" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input 
                        type="text" 
                        value={queryVal} 
                        onClick={() => setQueryVal('')}
                        onChange={handleChange}
                        className="Search-Bar"
                        placeholder="Search for a person or group"
                    />
                </div>
                <div className="Search-Results">
                    {true && 
                        <div>
                            {users.map(user => (
                                <div key={user.id} className="Search-Result" onClick={() => handleUserSelect(user)}>
                                    {/* TODO: svg should change to group logo if object is a group */}
                                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.2319 19.8116V16.0493C17.2319 12.9598 15.4086 11.0047 12.7965 10.1555C13.9171 9.20392 14.6289 7.77943 14.6289 6.18744C14.6289 3.3225 12.3235 1 9.47964 1C6.63577 1 4.33035 3.3225 4.33035 6.18744C4.33035 7.78227 5.04476 9.20901 6.16877 10.1606C3.59793 11.0125 1.84058 12.966 1.84058 16.0493V19.8116H17.2319Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <h1>{user.display_name}</h1>
                                </div>
                            ))}
                        </div> 
                    }   
                </div>
            </div>
        }
        </>
    );
}

export default Search;