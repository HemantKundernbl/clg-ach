import React, { useState } from 'react'

const Pagination = ({ apiData, setPaginatedData, paginatedData }) => {
    const [entries, setShowEntries] = useState(10);
    const [activePage, setActivePage] = useState(1)

    const pages = apiData.length / 10;
    const pageCount = [];
    for (let i = 1; i <= pages; i++) {
        pageCount.push(i);
    } 

    function setData(page, entries) {
        const data = apiData.slice(page * 10)
        setActivePage(page)
        setPaginatedData(data.length > 10 ? data.slice(data, entries) : data);
    }

    function setEntries(entries, activePage) {
        setShowEntries(entries);
        console.log()
        setData(activePage, entries)
    }

    return (
        <div className='flex my-2 align-middle justify-between'>
            <div className=''>
                <span>Show Entries: </span>
                <select
                    id="showEntriesSelect"
                    style={{ borderColor: "rgb(110 38 58 / 30%)" }}
                    className="border border-2 rounded-sm px-2 py-1"
                    value={entries}
                    onChange={(e) => setEntries(parseInt(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className='flex align-middle'>
                {activePage !== 1 && <span onClick={() => setEntries(entries, activePage - 1,)} className='px-1 py-0 mr-1 border-2 rounded-sm hover:bg-red-100' style={{ borderColor: "rgb(110 38 58 / 30%)" }}>{'<'}</span>}
                {
                    pageCount.length && pageCount?.map((page, key) => {
                            
                       if( activePage !== pageCount[activePage] + 2) {
                        return (
                            <span onClick={() => { setData(page, entries) }} className={`px-1 mx-1 border-2 rounded-sm hover:bg-red-100 ${page === activePage && "bg-red-100"}`} style={{ borderColor: "rgb(110 38 58 / 30%)" }} key={key}>{page}</span>
                        )
                       }
                    })
                }
                {activePage !== pageCount.length && <span onClick={() => setEntries(entries, activePage + 1,)} className='px-1 ml-1 border-2 rounded-sm hover:bg-red-100' style={{ borderColor: "rgb(110 38 58 / 30%)" }}>{'>'}</span>}
            </div>
        </div>
    )
}

export default Pagination