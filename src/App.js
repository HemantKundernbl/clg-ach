/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Components/Table";
import Header from "./Components/Header";
import Pagination from "./Components/Pagination";

const proxyUrl = "https://clgstaging.nablasol.net/rest/v11_1/"; // CORS proxy service URL
const apiUrl = "getAchPayments";

const App = () => {
  const date = new Date();
  const [selectedData, setSelectedData] = useState([]);
  const initToDate =
    date.getFullYear() + "-" + (date.getMonth() - 3) + "-" + date.getDate();
  const initFromDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const [fromDate, setFromDate] = useState(initFromDate);
  const [toDate, setToDate] = useState(initToDate);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const [activeFilter, setActiveFilter] = useState(null);

  const handleSelectionChange = (data) => {
    setSelectedData(data);
    console.log(data);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      // const collectedByUid = '9124058e-8c3f-11e9-afad-2e6dd8c53902';
      const url = `${proxyUrl}${apiUrl}?to_date=${toDate}&from_date=${fromDate}`;

      const response = await axios.get(url);

      const data = response.data;
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const Pagination = () => {
  //   const pageCount = apiData.length / 10
  //   const page = [];
  //   for (let i = 0; i < pageCount; i++) {
  //     page.push(i);
  //   }

  // function setData(page) {
  //   console.log("page + + + " , page);
  //    const data = apiData.slice(page * 10)
  //    console.log("data + + + " , data.length > 10 ?  data.slice(data , 10) : data);
  //    setActivePage(page)
  //   setPaginatedData( data.length > 10 ?  data.slice(data , 10) : data);
  // }

  //   return (<>
  //     <div>
  //       <span className='px-1 mx-1 border-2 rounded-sm hover:bg-red-100' style={{ borderColor: "rgb(110 38 58 / 30%)" }}>{'<'}</span>
  //       {
  //       page.length && page?.map((page, key) => {
  //         if( page < activePage + 3 )
  //         return (
  //           <span onClick={() => { setData(page)}} className={`px-1 mx-1 border-2 rounded-sm hover:bg-red-100 ${page === activePage && "bg-red-100"}`} style={{ borderColor: "rgb(110 38 58 / 30%)" }} key={key}>{page + 1}</span>
  //         )
  //       })}
  //        <span className='px-1 mx-1 border-2 rounded-sm hover:bg-red-100' style={{ borderColor: "rgb(110 38 58 / 30%)" }}>{'>'}</span>
  //       </div>
  //   </>)
  // }

  const filterData = (filterType) => {
    let filteredData = [...apiData];

    if (filterType === "Name") {
      filteredData.sort((a, b) => a.lead_name.localeCompare(b.lead_name));
    } else if (filterType === "Amount") {
      filteredData.sort((a, b) => a.collected_amt - b.collected_amt);
    } else if (filterType === "Date") {
      filteredData.sort(
        (a, b) => new Date(a.collected_date) - new Date(b.collected_date)
      );
    } else if (filterType === "CollectedBy") {
      filteredData.sort((a, b) => a.collected_by.localeCompare(b.collected_by));
    }

    setApiData(filteredData);
    setActiveFilter(filterType);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (toDate !== initToDate || fromDate !== initFromDate) {
      fetchData();
    }
  }, [fromDate, toDate]);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        {false ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-wrap md:justify-center md:items-center space-x-4 my-4">
              <p className="text-center">Filter:</p>
              {/* <button
                onClick={() => filterData('Name')}
                className={`${
                  activeFilter === 'Name'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded-lg`}
              >
                Name
              </button> */}
              <span>From-Date</span>{" "}
              <input
                type="date"
                style={{ borderColor: "rgb(110 38 58 / 30%)" }}
                className="border-2 rounded-sm px-4"
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="enter from date"
              />
              <span>To-Date</span>{" "}
              <input
                type="date"
                style={{ borderColor: "rgb(110 38 58 / 30%)" }}
                className="border-2 rounded-sm px-4"
                onChange={(e) => setToDate(e.target.value)}
                placeholder="enter to date"
              />
              {/* <button
                onClick={() => filterData('Amount')}
                className={`${
                  activeFilter === 'Amount'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded-lg`}
              >
                Amount
              </button>
              <button
                onClick={() => filterData('Date')}
                className={`${
                  activeFilter === 'Date'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded-lg`}
              >
                Date
              </button>
              <button
                onClick={() => filterData('CollectedBy')}
                className={`${
                  activeFilter === 'CollectedBy'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                } px-4 py-2 rounded-lg`}
              >
                Collected By
              </button> */}
            </div>

            <span>
              {/* <Pagination /> */}
              <Pagination
                apiData={apiData}
                setPaginatedData={setPaginatedData}
                paginatedData={paginatedData}
              />
            </span>
            <Table
              data={paginatedData.length ? paginatedData : apiData}
              onSelectionChange={handleSelectionChange}
            />
            <button className="mt-4" onClick={() => Table.getSelectedValues()}>
              Get Selected Values
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default App;
