import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <h1
        className="text-xl ml-[60px] font-bold text-purple-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Review<span className="text-black">&RATE</span>
      </h1>
      <div className="flex items-center gap-12 mr-[100px]">
        <input
          type="text"
          placeholder="Search..."
          className="border w-[350px] h-[30px] px-4 py-2 rounded-md focus:outline-none"
        />
        <button className="text-gray-700">SignUp</button>
        <button className="text-gray-700">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
