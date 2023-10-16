import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import "./SearchBar.css"
import { json } from 'react-router-dom';
import axios from 'axios';

export const SearchBar = ({ setResult, setVisible }) => {
    // const [search, setSearch] = useState('')
    const [input, setInput] = useState("")

    const fetchData = async (value) => {
        const dataSet = await axios.get('/Leave/LeaveAllRequests')
            .then((response) => {
                return response.data.map((user) => user.userId)
            });
        console.log(dataSet);
        await axios.get("/Auth/allUsers")
            .then((response) => {
                const result = response.data.filter((user) => {
                    if (dataSet.includes(user.id)) {
                        return (
                            value &&
                            user &&
                            user.firstName &&
                            user.firstName.toLowerCase().includes(value)
                        );
                    }
                })
                console.log(result.map((results, index) => (results)));
                //console.log(result);
                setResult(result);
            })
    }

    const handleChange = (value) => {
        //e.preventDefault();
        setInput(value);
        fetchData(value);
        // setInput(inputValue);
    }

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />
            <input
                type="search"
                placeholder='Search'
                onChange={(e) => handleChange(e.target.value)}
                value={input}
                onFocus={() => setVisible(true)}
            />
        </div>
    )
};