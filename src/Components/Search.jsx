import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // Main stylesheet for react-date-range
import "react-date-range/dist/theme/default.css"; // Theme styles for react-date-range
import { DateRangePicker } from "react-date-range";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks the open dropdown or date picker

  const categoryOptions = [
    "Technology",
    "Business",
    "Health",
    "Sports",
    "Entertainment",
  ];
  const sourceOptions = [
    "BBC",
    "CNN",
    "Reuters",
    "Al Jazeera",
    "The New York Times",
  ];

  const handleDropdownToggle = (dropdownKey) => {
    setOpenDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
  };

  const handleSelectChange = (type, selectedOptions) => {
    if (type === "category") {
      setCategories(selectedOptions);
    } else if (type === "source") {
      setSources(selectedOptions);
    }
  };

  const handleSave = (type) => {
    if (type === "category") {
      setOpenDropdown(null); // Close the category dropdown
    } else if (type === "source") {
      setOpenDropdown(null); // Close the source dropdown
    }
  };

  const handleSearch = () => {
    const startDate = dateRange.startDate.toISOString().split("T")[0];
    const endDate = dateRange.endDate.toISOString().split("T")[0];

    console.log({ keyword, categories, sources, startDate, endDate });
    // Perform the final search/filter logic here with all the collected data
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Search Preferred Articles
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("category")}
            className="w-full text-left border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.length ? categories.join(", ") : "Select Category"}
          </button>
          {openDropdown === "category" && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 text-black rounded-md shadow-md z-10">
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center   ${
                    categories.includes(option) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setCategories((prev) =>
                      prev.includes(option)
                        ? prev.filter((item) => item !== option)
                        : [...prev, option]
                    );
                  }}
                >
                  <span
                    className={` flex w-4 h-4 rounded-full mr-2 ${
                      categories.includes(option)
                        ? "bg-blue-500"
                        : "bg-transparent border border-gray-300"
                    }`}
                  >
                    {categories.includes(option) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white flex justify-center items-center m-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 4.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </div>
              ))}
              <button
                onClick={() => handleSave("category")}
                className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("source")}
            className="w-full text-left border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sources.length ? sources.join(", ") : "Select Source"}
          </button>
          {openDropdown === "source" && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 text-black rounded-md shadow-md z-10">
              {sourceOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100 ${
                    sources.includes(option) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setSources((prev) =>
                      prev.includes(option)
                        ? prev.filter((item) => item !== option)
                        : [...prev, option]
                    );
                  }}
                >
                  <span
                    className={`flex w-4 h-4 rounded-full mr-2 ${
                      sources.includes(option)
                        ? "bg-blue-500"
                        : "bg-transparent border border-gray-300"
                    }`}
                  >
                    {sources.includes(option) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-white flex justify-center items-center m-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 4.293a1 1 0 00-1.414 0L8 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  {option}
                </div>
              ))}
              <button
                onClick={() => handleSave("source")}
                className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle("datePicker")}
            className="rounded border p-2 w-full bg-gray-200"
          >
            {openDropdown === "datePicker"
              ? "Hide Date Picker"
              : "Select Date Range"}
          </button>
          {openDropdown === "datePicker" && (
            <div className="absolute left-0 top-full mt-2 w-full z-10">
              <label className="block text-white mb-1">Select Date Range</label>
              <DateRangePicker
                ranges={[dateRange]}
                onChange={(ranges) => setDateRange(ranges.selection)}
                className="rounded border p-2 w-full bg-white justify-between"
              />
              <button
                onClick={() => setOpenDropdown(null)} // Close date picker on save
                className="mt-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
