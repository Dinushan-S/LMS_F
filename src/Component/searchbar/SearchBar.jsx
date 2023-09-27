import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import "./SearchBar.css"
import { json } from 'react-router-dom';
import axios from 'axios';

export const SearchBar = ({ setResult, setVisible }) => {
    // const [search, setSearch] = useState('')
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then((response) => response.json())
        //     .then(json => {
        //         const result = json.filter((user) => {
        //             return (
        //                 //value &&
        //                 user &&
        //                 user.name &&
        //                 user.name.toLowerCase().includes(value)
        //             );
        //         });
        //         console.log(result);
        //         setResult(result);
        //     })
        axios.get("/Auth/allUsers")
            .then((response) => {
                const result = response.data.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.firstName &&
                        user.firstName.toLowerCase().includes(value)
                    );
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

    // if (search.length > 0) {
    //     countries.filter((country) => {
    //         return country.name.match(search);
    //     })
    // }

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