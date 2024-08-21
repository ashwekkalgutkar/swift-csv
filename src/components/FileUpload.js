import React, { useState } from "react";
import Papa from "papaparse";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length === 0) {
            alert("The CSV file is empty.");
            return;
          }
          onFileUpload(results.data);
        },
        error: () => {
          alert("There was an error parsing the CSV file.");
        },
      });
    } else {
      alert("Please upload a CSV file.");
    }
  };

  return (
    <div className="mt-10 mb-4">
      <input
        type="file"
        accept=".csv"
        className="px-4 py- border border-gray-300 rounded-md"
        onChange={handleFileChange}
      />
      <button
        className="px-4 py-2.5 bg-green-500 text-white rounded-md ml-2"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
