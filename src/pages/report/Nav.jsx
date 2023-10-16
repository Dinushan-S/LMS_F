import React from 'react'
import Report from './report'
import { Routes, Route } from 'react-router-dom';
import "./summary.css"
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
// import OverView from './Overview'
import TimesOffLeave from './TimeOffLeave';
import OverView from './Overview';


export default function Nav(setPage) {

    const handleChange = () => {
        setPage()
    }
    return (
        <>hi</>
    )
}

function NavBar({ to, setPage, children, ...props }) {
    const resolvePath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvePath.pathname, end: true });
    return (
        <nav className='nav'>
            <ul className="nav-item">
                <li className={isActive ? "active" : ""}>
                    <Link setPage={to} {...props}>{children}</Link>
                </li>
            </ul>
        </nav>
    )
}
