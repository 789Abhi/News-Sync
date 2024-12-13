import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchNews,
  clearSearchResults,
  setCurrentCountry,
} from "../redux/newsSlice";
import PreferencesModal from "./PreferencesModal";

function Header() {
  const dispatch = useDispatch();
  const currentCountry = useSelector((state) => state.news.currentCountry);
  const countries = [
    {
      value: "all",
      label: "All",
      flag: "https://tse3.mm.bing.net/th?id=OIP.TvFyTKnIpVLfvTS0F4Z12gHaHa&pid=Api&P=0&h=180",
    },
    { value: "in", label: "IND", flag: "https://flagcdn.com/w320/in.png" },
    { value: "us", label: "USA", flag: "https://flagcdn.com/w320/us.png" },
    { value: "gb", label: "UK", flag: "https://flagcdn.com/w320/gb.png" },
    { value: "au", label: "AUS", flag: "https://flagcdn.com/w320/au.png" },
    { value: "ca", label: "CAN", flag: "https://flagcdn.com/w320/ca.png" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const currentCountryObj =
    countries.find((c) => c.value === currentCountry) || countries[0];

  const handleCountrySelect = (countryValue) => {
    dispatch(setCurrentCountry(countryValue));
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(clearSearchResults());
    dispatch(searchNews({ searchTerm, country: currentCountry }));
    navigate("/search", { state: { searchTerm } });
  };

  const showSearchInput = location.pathname !== "/search";
  const showCustomizeFeedButton = location.pathname !== "/search";
  const showPreferencesButton = location.pathname !== "/search";

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 shadow-lg rounded-xl z-50 sticky top-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">NEWS SYNC</h1>
        </Link>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className={`flex items-center w-[600px] ${
            !showSearchInput && "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md text-gray-800 h-10 shadow-sm w-full"
          />
          <button
            type="submit"
            className="ml-2 bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            Search
          </button>
        </form>

        {/* Country and Preferences Section */}
        <div className="flex items-center gap-4">
          {/* Customize Feed Button */}
          {showCustomizeFeedButton && (
            <Link
              to="/search"
              className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
            >
              Customize Feed
            </Link>
          )}

          {/* Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 bg-white text-gray-800 rounded-md shadow-md flex items-center justify-between w-[100px] h-[40px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={currentCountryObj.flag}
                  alt="Selected Country"
                  className="w-6 h-6 rounded-full"
                />
                <span>{currentCountryObj.label}</span>
              </div>
              <span className="ml-2 text-xs">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-md rounded-md z-10">
                {countries
                  .filter((country) => country.value !== currentCountry)
                  .map((country) => (
                    <div
                      key={country.value}
                      onClick={() => handleCountrySelect(country.value)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={country.flag}
                        alt={country.label}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{country.label}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Preferences Button */}
          {showPreferencesButton && (
            <button
              onClick={() => setIsPreferencesModalOpen(true)}
              className="bg-purple-500 flex items-center hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
            >
              <img
                className="w-7 h-7 rounded-full"
                src="https://tse2.mm.bing.net/th?id=OIP.wX2pd1wOdEsuyI8yRQlCpQHaHa&pid=Api&P=0&h=180"
                alt="Preferences"
              />
            </button>
          )}
        </div>
      </div>

      {/* Preferences Modal */}
      <PreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
      />
    </header>
  );
}

export default Header;
