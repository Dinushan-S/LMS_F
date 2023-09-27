import React from 'react'
import "./SearchResult.css"
import axios from 'axios'

export const SearchResult = ({ result, setLeaveResults, setVisible }) => {

    // const [visible, setVisible] = React.useState(true);

    const fetchData = async (e) => {
        e.preventDefault();
        await axios.get(`/Leave/userLeaves/${result.id}`)
            .then((response => {
                if (response.data.length > 0) {
                    setLeaveResults(response.data);
                    setVisible(false);
                    console.log(response.data);
                }
                else {
                    alert("No Leave Found");
                    setLeaveResults([0]);
                }

            }))


    }
    return (
        <div
            className="search-result"
            onClick={fetchData}>
            {result.firstName}
        </div>
    )
}
