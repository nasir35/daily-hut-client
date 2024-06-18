import React from "react";

const UserType = ({ title, children }) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 font-bold text-xl">
        {title}
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default UserType;
