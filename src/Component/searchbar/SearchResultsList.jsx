import React from 'react'
import "./SearchResultList.css"
import { SearchResult } from "./SearchResult"

export const SearchResultsList = ({ result, setLeaveResults, setVisible }) => {
    return (
        <div className='results-list'>
            {
                result.map((result, id) => {
                    //return <div key={id}>{result.name}</div>
                    return <SearchResult result={result} key={id} setLeaveResults={setLeaveResults} setVisible={setVisible} />
                })
            }
        </div>
    )
}
