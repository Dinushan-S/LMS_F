import React from 'react'
import "./SearchResult.css"
import axios from 'axios'

export const SearchResult = ({ result, setLeaveResults }) => {

    const [visible, setVisible] = React.useState(true);

    const fetchData = async (e) => {
        e.preventDefault();
        await axios.get(`http://localhost:7185/api/Leave/LeaveRequests/${result.id}`)
            .then((response => {
                setLeaveResults(response.data);
                console.log(response.data);
                console.log(result.id);
                console.log();
                setVisible(false);
                console.log(visible);

            }))


    }
    return (
        <div
            aria-disabled={visible}
            className="search-result"
            onClick={fetchData}>
            {result.firstName}
        </div>
    )
}
