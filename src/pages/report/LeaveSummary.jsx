import React from 'react'
import Report from './report'
import "./summary.css"
import { useNavigation, Routes, Route, useNavigate } from 'react-router-dom';
import "./summary.css"
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Overview from './Overview'
import Nav from './Nav';
import { useState } from 'react';
import TimesOffLeave from './TimeOffLeave';
import LeaveReport from './LeaveReport'

const LeaveSummary = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [page, setPage] = useState();

    function handleClick(event) {
        const linkText = event.target.textContent;
        setShow(true);
        if (linkText === "OverView") {
            setPage(<Overview />);
        } else if (linkText === "TimesOffLeave") {
            setPage(<TimesOffLeave />)
        } else if (linkText === "Leave Report") {
            setPage(<LeaveReport />)
        }
        console.log(linkText);

    }
    // console.log(page)
    return (
        <>
            <div className='container'>
                <div className='nav'>
                    <ul >
                        <li className='nav-item'>
                            <Link onClick={handleClick}>OverView</Link>
                        </li>
                        <li className='nav-item'>
                            <Link onClick={handleClick}>TimesOffLeave</Link>
                        </li>
                        <li className='nav-item'>
                            <Link onClick={handleClick}>Leave Report</Link>
                        </li>

                    </ul>
                </div>
                <div className='content'>
                    <div style={{ backgroundColor: "black" }}>
                        {show ? page : null}
                    </div>
                </div>
            </div>
        </>

    );
};

export default LeaveSummary;
