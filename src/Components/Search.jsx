import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchNews, clearSearchResults } from "../redux/newsSlice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchResults = useSelector((state) => state.news.searchResults);

  // Get initial search term from navigation state or default to empty string
  const [keyword, setKeyword] = useState(location.state?.searchTerm || "");

  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  // Initialize dateRange without setting default dates
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

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

  const handleSearch = () => {
    // Clear any previous search results first
    dispatch(clearSearchResults());

    // If keyword is empty, do nothing
    if (!keyword.trim()) return;

    // Dispatch search action with keyword
    dispatch(searchNews(keyword));

    // Mark search as performed
    setIsSearchPerformed(true);
    // Reset filter-related states
    setIsFilterApplied(false);
    setFilteredResults([]);
  };

  // Apply filters and update results
  const applyFilters = () => {
    // Check if any filter is applied
    const hasFilters =
      categories.length > 0 ||
      sources.length > 0 ||
      (dateRange.startDate && dateRange.endDate);

    if (hasFilters) {
      // Filter results based on selected criteria
      const filtered = searchResults.filter((article) => {
        // Category filter
        const categoryMatch =
          categories.length === 0 ||
          (article.category &&
            categories.some(
              (cat) => article.category.toLowerCase() === cat.toLowerCase()
            ));

        // Source filter
        const sourceMatch =
          sources.length === 0 ||
          sources.some((src) =>
            article.source.name.toLowerCase().includes(src.toLowerCase())
          );

        // Date range filter
        const publishDate = new Date(article.publishedAt);
        const dateMatch =
          !dateRange.startDate ||
          !dateRange.endDate ||
          (publishDate >= dateRange.startDate &&
            publishDate <= dateRange.endDate);

        return categoryMatch && sourceMatch && dateMatch;
      });

      setFilteredResults(filtered);
      setIsFilterApplied(true);
    } else {
      // If no filters, show all search results
      setFilteredResults(searchResults);
      setIsFilterApplied(false);
    }
  };

  // Apply filters when search results or filter options change
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      applyFilters();
    }
  }, [searchResults, categories, sources, dateRange]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Reset filters
  const resetFilters = () => {
    setCategories([]);
    setSources([]);
    setDateRange({
      startDate: null,
      endDate: null,
      key: "selection",
    });
    setIsFilterApplied(false);
    setFilteredResults([]);
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
            placeholder="Search news articles..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border p-2 rounded w-full"
          />
        </div>
        {/* Category Dropdown */}
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
                onClick={() => handleDropdownToggle("category")}
                className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Sources Dropdown */}
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
                onClick={() => handleDropdownToggle("source")}
                className="w-full bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Date Range Picker */}
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
                onClick={() => setOpenDropdown(null)}
                className="mt-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mt-6 space-x-4">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>

        {/* Reset Filters Button - Only show if filters are applied */}
        {isFilterApplied && (
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Display Results */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-white">
          {isFilterApplied ? "Filtered" : "Search"} Results (
          {filteredResults.length})
        </h3>
        {filteredResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResults.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{article.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {article.source.name} |{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-sm">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">
            {searchResults && searchResults.length > 0
              ? "No results found. Try adjusting your filters."
              : "Perform a search to view results."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
