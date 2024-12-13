import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchNews, clearSearchResults, fetchNews } from "../redux/newsSlice";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchResults = useSelector((state) => state.news.searchResults);
  const newsResults = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);

  const [keyword, setKeyword] = useState(location.state?.searchTerm || "");
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
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
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  const staticSources = ["NYTimes", "CBZ News", "BBC", "Reuters", "Al Jazeera"];

  const getSourceOptions = () => {
    const allResults = [...(searchResults || []), ...(newsResults || [])];
    return [
      ...new Set(allResults.map((article) => article.source.name)),
    ].concat(staticSources);
  };

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [dispatch, newsStatus]);

  const handleDropdownToggle = (dropdownKey) => {
    setOpenDropdown((prev) => (prev === dropdownKey ? null : dropdownKey));
  };

  const handleSearch = () => {
    dispatch(clearSearchResults());
    if (!keyword.trim()) {
      dispatch(fetchNews());
    } else {
      dispatch(searchNews(keyword));
    }
    setIsSearchPerformed(true);
    setIsFilterApplied(false);
    setFilteredResults([]);
  };

  const applyFilters = () => {
    const baseResults = searchResults.length > 0 ? searchResults : newsResults;
    const hasFilters =
      categories.length > 0 ||
      sources.length > 0 ||
      (dateRange.startDate && dateRange.endDate);

    if (hasFilters && baseResults) {
      const filtered = baseResults.filter((article) => {
        const categoryMatch =
          categories.length === 0 ||
          (article.category &&
            categories.some(
              (cat) => article.category.toLowerCase() === cat.toLowerCase()
            )) ||
          categories.some((cat) =>
            article.source.name.toLowerCase().includes(cat.toLowerCase())
          );

        const sourceMatch =
          sources.length === 0 ||
          sources.some((src) =>
            article.source.name.toLowerCase().includes(src.toLowerCase())
          );

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
      setFilteredResults(baseResults || []);
      setIsFilterApplied(false);
    }
  };

  useEffect(() => {
    if (
      (searchResults && searchResults.length > 0) ||
      (newsResults && newsResults.length > 0)
    ) {
      applyFilters();
    }
  }, [searchResults, newsResults, categories, sources, dateRange]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const resetFilters = () => {
    setCategories([]);
    setSources([]);
    setDateRange({ startDate: null, endDate: null, key: "selection" });
    setIsFilterApplied(false);
    setFilteredResults([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const now = new Date();
    const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
    let timeAgo = "";

    if (diffInHours < 24) {
      timeAgo = `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    return (
      <div className="text-sm text-gray-600 mb-2">
        <span className="font-semibold">{formattedDate}</span>
        {timeAgo && (
          <span className="ml-2 bg-blue-100 px-2 py-1 rounded-full">
            {timeAgo}
          </span>
        )}
      </div>
    );
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
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
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
                    className={`flex w-4 h-4 rounded-full mr-2 ${
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
              {getSourceOptions().map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
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
            onClick={() => handleDropdownToggle("dateRange")}
            className="w-full text-left border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRange.startDate && dateRange.endDate
              ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
              : "Select Date Range"}
          </button>
          {openDropdown === "dateRange" && (
            <DateRangePicker
              onChange={(item) => setDateRange(item.selection)}
              showDateDisplay={false}
              moveRangeOnFirstSelection={false}
              ranges={[dateRange]}
              className="absolute mt-1 bg-white border border-gray-300 text-black rounded-md shadow-md z-10"
            />
          )}
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Search
      </button>

      {isFilterApplied && (
        <button
          onClick={resetFilters}
          className="mt-2 w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 focus:outline-none"
        >
          Reset Filters
        </button>
      )}

      {isSearchPerformed && filteredResults.length === 0 && (
        <p className="mt-4 text-center text-gray-600">
          No results found for "{keyword}"
        </p>
      )}

      {isSearchPerformed && filteredResults.length > 0 && (
        <div className="mt-8">
          {filteredResults.map((article, index) => (
            <div key={index} className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {article.description}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
              {formatDate(article.publishedAt)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
