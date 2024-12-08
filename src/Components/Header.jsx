import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-lg rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">NEWS SYNC</h1>
        </Link>

        <div className="flex items-center w-[600px] ">
          <input
            type="text"
            placeholder="Search articles..."
            className="p-2 rounded-md text-gray-800 h-[55px] shadow-sm w-full "
          />
        </div>
        <Link
          to="/search"
          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md  w-full md:w-auto"
        >
          News Preferences
        </Link>
      </div>
    </header>
  );
}

export default Header;
