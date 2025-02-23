import React from "react";

const NoRecordsFound = ({ message = "No records found." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-gray-600 text-lg font-medium">{message}</p>
    </div>
  );
};

export default NoRecordsFound;
