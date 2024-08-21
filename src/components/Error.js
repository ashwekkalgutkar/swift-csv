import React from "react";

const Error = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
      {message}
    </div>
  );
};

export default Error;
