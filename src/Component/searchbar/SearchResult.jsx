import React from 'react'
import "./SearchResult.css"
import axios from 'axios'

export const SearchResult = ({ result, setLeaveResults, setVisible }) => {

    // const [visible, setVisible] = React.useState(true);

    const fetchData = async (e) => {
        e.preventDefault();
        const response = await axios.get(`/Leave/userLeaves/${result.id}`)
        console.log(response.data);
        if (response.data) {
            // const data = 
            // console.log(response.data.isApproved);
            setLeaveResults(response.data);
            setVisible(false);
            console.log(response.data);
        } else {
            alert("No Leave Found");
            setLeaveResults([0]);
        }
        // .then((response => {
        // if (response) {

        // }
    }
    return (
        <div
            className="search-result"
            onClick={fetchData}>
            {result.firstName}
        </div>
    )
}
