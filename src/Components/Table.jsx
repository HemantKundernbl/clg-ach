import React, { useMemo, useEffect, useRef } from "react";
import { useTable, useRowSelect, useSortBy } from "react-table";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Table = ({ data, onSelectionChange }) => {
  const columns = useMemo(
    () => [
      { Header: "Lead ID", accessor: "lead_id" },
      { Header: "Name", accessor: "name" },
      { Header: "Collected Amount", accessor: "amount" },
      { Header: "Collected Date", accessor: "payment_date" },
      { Header: "Collected By", accessor: "collected_by" },
      {
        Header: "App/Rev/Rej",
        accessor: "menu",
        Cell: ({ row }) => (
          <div className="flex flex-row gap-2 justify-between">
            <button
              className="btn-accept bg-site-theme p-1 rounded-lg"
              onClick={() => handleAccept(row)}
            >
              <CheckIcon className="text-white text-sm" />
            </button>
            <button
              className="btn-reject bg-site-theme p-1 rounded-lg"
              onClick={() => handleReject(row)}
            >
              <CloseIcon className="text-white text-sm" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy, // Use the useSortBy hook for column sorting
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input
              type="checkbox"
              {...getToggleAllRowsSelectedProps()}
              className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          ),
          Cell: ({ row }) => (
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
              className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  const selectedRowIdsRef = useRef();
  useEffect(() => {
    selectedRowIdsRef.current = selectedRowIds;
  });

  const handleAccept = (row) => {
    // Implement the logic for handling "Accept" button click
    console.log("Accepted:", row.original);
  };

  const handleReject = (row) => {
    // Implement the logic for handling "Reject" button click
    console.log("Rejected:", row.original);
  };

  const getSelectedValues = () => {
    const selectedRows = rows.filter(
      (row) => selectedRowIdsRef.current[row.id]
    );
    const selectedData = selectedRows.map((row) => row.original);
    onSelectionChange(selectedData);
  };

  const isSelectedAll =
    Object.keys(selectedRowIds).length === rows.length && rows.length > 0;

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())} // Add getSortByToggleProps to enable sorting
                  className="px-6 py-3 border-b-2 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
                >
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <span>&darr;</span>
                    ) : (
                      <span>&uarr;</span>
                    )
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={isSelectedAll}
          onChange={toggleAllRowsSelected}
          className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
        />
        <span className="text-sm text-gray-700">
          Select All ({rows.length})
        </span>
      </div>
    </div>
  );
};

export default Table;
