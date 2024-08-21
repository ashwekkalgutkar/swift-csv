import React, { useState } from "react";
import { Pagination as FlowbitePagination } from "flowbite-react"; // Assuming pagination is supported

const Table = ({
  data,
  columns,
  onRowSelect,
  selectedRows,
  onColumnSelect,
  selectedColumns,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [highlightTable, setHighlightTable] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null); // State for the selected column

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle checkbox change
  const handleCheckboxChange = (rowIndex) => {
    const isChecked = !selectedRows.includes(rowIndex);
    const newSelectedRows = isChecked
      ? [...selectedRows, rowIndex]
      : selectedRows.filter((index) => index !== rowIndex);

    onRowSelect(newSelectedRows); // Pass selected rows to parent component
    setHighlightTable(newSelectedRows.length > 0); // Highlight table if any row is selected
    console.log("Row Index:", rowIndex, "Checked:", isChecked); // Debugging
  };

  // Handle 'select all' checkbox
  const handleSelectAllChange = () => {
    const allSelected = currentTableData.every((_, index) =>
      selectedRows.includes(index + currentPage * rowsPerPage)
    );
    const newSelectedRows = allSelected
      ? selectedRows.filter(
          (index) =>
            index < currentPage * rowsPerPage ||
            index >= (currentPage + 1) * rowsPerPage
        )
      : [
          ...selectedRows,
          ...currentTableData.map(
            (_, index) => index + currentPage * rowsPerPage
          ),
        ];

    onRowSelect(newSelectedRows); // Pass selected rows to parent component
    setHighlightTable(newSelectedRows.length > 0); // Highlight table if any row is selected
    console.log("Select All:", allSelected); // Debugging
  };

  const currentTableData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-x-auto ${
        highlightTable ? "border-4 border-blue-500" : ""
      }`}
    >
      <table className="w-full min-w-max table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={
                  currentTableData.length > 0 &&
                  currentTableData.every((_, index) =>
                    selectedRows.includes(index + currentPage * rowsPerPage)
                  )
                }
              />
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left font-bold cursor-pointer ${
                  selectedColumn === index ? "bg-blue-100" : "" // Highlight header
                }`}
                onClick={() => {
                  onColumnSelect(index);
                  setSelectedColumn(index); // Update selected column
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b hover:bg-gray-100 ${
                selectedRows.includes(rowIndex + currentPage * rowsPerPage)
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(
                    rowIndex + currentPage * rowsPerPage
                  )}
                  onChange={() =>
                    handleCheckboxChange(rowIndex + currentPage * rowsPerPage)
                  }
                />
              </td>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 ${
                    selectedColumn === colIndex ? "bg-blue-100" : "" // Highlight column data
                  }`}
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <FlowbitePagination
          currentPage={currentPage + 1}
          totalPages={Math.ceil(data.length / rowsPerPage)}
          onPageChange={(page) => handlePageChange(page - 1)}
        />
      </div>
    </div>
  );
};

export default Table;
