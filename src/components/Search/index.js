/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { search } from '../../utils/backendUtils';
import { useSelector } from 'react-redux';
import ScrollArea from 'react-scrollbar';

const Search = ({ my_id, my_groups, setUser, setIsSearching, enabled }) => {

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (my_groups) {
            setDefaultUsers([{ id: my_id, display_name: 'Me' }, ...my_groups]);
            if (queryVal == '') setUsers([{ id: my_id, display_name: 'Me' }, ...my_groups]);
        }
    },[my_groups]);

    const [queryVal, setQueryVal] = useState('');
    const [defaultUsers, setDefaultUsers] = useState([{ id: my_id, display_name: 'Me' }]);
    const [users, setUsers] = useState([{ id: my_id, display_name: 'Me' }]);

    const handleChange = (e) => {
        const { value } = e.target;
        setQueryVal(value)
        if(value.length > 0) {
            search(value, token).then(setUsers)
        } else {
            setUsers(defaultUsers)
        }
    };  

    const handleUserSelect = (user) => {
        setUser({ id: user.id, name: user.display_name })
        setIsSearching(false);
        setQueryVal('');
        setUsers(defaultUsers);
    }


    return (
        <>
        { enabled &&
            <div className="Search">
                <div className="Search-Top">
                    <svg onClick={() => setIsSearching(false)} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6691 3L3.00003 16.669L16.6691 30.3381" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input 
                        autoFocus
                        type="text" 
                        value={queryVal} 
                        onClick={() => setQueryVal('')}
                        onChange={handleChange}
                        className="Search-Bar"
                        placeholder="Search for a person or group"
                    />
                </div>
                <div className="Search-Results">
                    <ScrollArea
                        speed={0.8}
                        className="Search-Scroll"
                        contentClassName="content"
                        verticalScrollbarStyle={{ background: 'white' }}
                        horizontal={false}
                    >
                        {true && 
                            <div>
                                {users.map(user => (
                                    <div key={user.id} className="Search-Result" onClick={() => handleUserSelect(user)}>
                                        {/* TODO: svg should change to group logo if object is a group */}
                                        {user.isGroup ? 
                                        <svg width="31" height="22" viewBox="0 0 31 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8324 4.20955C10.5152 4.84489 10.3366 5.56179 10.3366 6.32045C10.3366 7.77352 10.9915 9.07344 12.0219 9.94043C9.66525 10.7167 8.05435 12.4965 8.05435 15.3057L8.00248 20.4057H22.1112L22.163 15.3057C22.163 12.4908 20.4917 10.7095 18.0973 9.93579C19.1245 9.0688 19.777 7.77093 19.777 6.32045C19.777 5.56179 19.5985 4.84489 19.2812 4.20955M10.8324 4.20955C11.6068 2.65889 13.2076 1.59412 15.0568 1.59412C16.906 1.59412 18.5069 2.65889 19.2812 4.20955M10.8324 4.20955C10.0439 3.6172 9.06412 3.26626 8.00248 3.26626C5.39559 3.26626 3.28229 5.38231 3.28229 7.99259C3.28229 9.44566 3.93717 10.7456 4.96751 11.6126C2.61091 12.3888 1 14.1686 1 16.9778V20.4057H15.1087H29.2174V16.9778C29.2174 14.163 27.546 12.3817 25.1516 11.6079C26.1788 10.7409 26.8314 9.44307 26.8314 7.99259C26.8314 5.38231 24.7181 3.26626 22.1112 3.26626C21.0495 3.26626 20.0698 3.6172 19.2812 4.20955" stroke="white" strokeWidth="2"/>
                                        </svg>                                    
                                        :
                                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.2319 19.8116V16.0493C17.2319 12.9598 15.4086 11.0047 12.7965 10.1555C13.9171 9.20392 14.6289 7.77943 14.6289 6.18744C14.6289 3.3225 12.3235 1 9.47964 1C6.63577 1 4.33035 3.3225 4.33035 6.18744C4.33035 7.78227 5.04476 9.20901 6.16877 10.1606C3.59793 11.0125 1.84058 12.966 1.84058 16.0493V19.8116H17.2319Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        }
                                        <h1>{user.display_name}</h1>
                                    </div>
                                ))}
                            </div> 
                        }   
                    </ScrollArea>
                </div>
            </div>
        }
        </>
    );
}

export default Search;