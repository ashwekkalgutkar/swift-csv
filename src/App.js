import React, { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";
import Table from "./components/Table";
import logo from "./utils/logo-transparent-png.png";

const App = () => {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleFileUpload = (data) => {
    if (data.length > 0) {
      setColumns(Object.keys(data[0]));
      setCsvData(data);
    }
  };  

  const handleRowSelect = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const handleColumnSelect = (columnIndex) => {
    setSelectedColumns((prev) =>
      prev.includes(columnIndex)
        ? prev.filter((index) => index !== columnIndex)
        : [...prev, columnIndex]
    );
  };

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Logo */}
      <div className="flex items-start mb-4 ">
        <img src={logo} alt="Logo" className="h-20 w-auto mt-5" />
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="max-w-4xl w-full">
          <FileUpload onFileUpload={handleFileUpload} />
          {csvData.length > 0 && (
            <Table
              data={csvData}
              columns={columns}
              onRowSelect={handleRowSelect}
              selectedRows={selectedRows}
              onColumnSelect={handleColumnSelect}
              selectedColumns={selectedColumns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
