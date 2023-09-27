import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../Component/searchbar/SearchBar';
import { SearchResultsList } from '../../Component/searchbar/SearchResultsList';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { TextField } from '@mui/material';


const Report = () => {
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState([])
    const [leaveResults, setLeaveResults] = useState([])
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);
    var AnnualLeave = 0;
    var SickLeave = 0;
    var MaternityLeave = 0;
    var PaternityLeave = 0;
    var UnpaidLeave = 0;
    // useEffect(() => {
    //     fetchData();
    // }, [])

    const fetchData = async () => {
        await axios.get(`/Leave/LeaveRequests/`)
            .then((response => {
                setLeaveResults(response.data);
                console.log(response.data);
                console.log(result.id);
            }))
    }

    return (
        <div className='report'>
            <div className='search-bar-container'>
                <SearchBar setResult={setResult} setVisible={setVisible} />
                {visible && <SearchResultsList result={result} setLeaveResults={setLeaveResults} setVisible={setVisible} />}
            </div>
            {/* <table>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>type</th>

                </tr>
                {leaveResults.map((results, index) => (
                    <tr>
                        <td>{results.name}</td>
                        <td>{results.startDate}</td>
                        <td>{results.endDate}</td>
                        <td>{results.reason}</td>
                        <td>
                            {results.type === 1 ? casulLeave++ : null}
                            {results.type === 2 ? sickLeave++ : null}
                            {results.type === 3 ? annualLeave++ : null}
                            {results.type === 4 ? otherleave++ : null}
                        </td>
                    </tr>
                ))}
            </table> */}
            <div>Total Leave : {leaveResults.length}</div>
            <div>

                {leaveResults.map((results, index) => (
                    <div style={{ color: " white" }}>
                        {show && results.type === 0 ? AnnualLeave++ : null}
                        {show && results.type === 1 ? SickLeave++ : null}
                        {show && results.type === 2 ? MaternityLeave++ : null}
                        {show && results.type === 3 ? PaternityLeave++ : null}
                        {show && results.type === 4 ? UnpaidLeave++ : null}
                    </div>
                ))}


                <div>Annual Leave : {AnnualLeave}</div>
                <div>Sick Leave : {SickLeave}</div>
                <div>Maternity Leave : {MaternityLeave}</div>
                <div>Paternity Leave : {PaternityLeave}</div>
                <div>Unpaid Leave : {UnpaidLeave}</div>
            </div>

        </div>
    )
};

export default Report;

