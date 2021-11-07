import React, { useContext, useState } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import { parsedEvents } from './calendarData.js';

const hastSearchCalendar = (str) => {
    const words = str
        .split(' ')
        .map(function (value, index) {
            return '(?=(.)*?\\b(' + value + ')\\b)';
        })
        .join('');
    const pattern = new RegExp(`${words}((.)+)`, 'g');
    /////////////////////////////
    const foundInd = [];
    parsedEvents.forEach((item, index) => {
        if (item.hashtags.join(' ').match(pattern) !== null) {
            foundInd.push(index);
        }
    });
    return foundInd;
};

const Search = () => {
    const { setSearchResult } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const changeHandler = (evt) => {
        const { value } = evt.target;
        //console.log(value);
        setSearchTerm(value);
        const indexArray = hastSearchCalendar(value);
        setSearchResult(indexArray);
        //console.log(indexArray);
    };
    return (
        <form action="/" method="get">
            <label htmlFor="header-search">
                {/* <span className="visually-hidden">Search</span> */}
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search..."
                name="search"
                value={searchTerm}
                onChange={changeHandler}
            />
            {/* <button onClick={hastSearchCalendar} type="submit">
                Search
            </button> */}
        </form>
    );
};
export default Search;
