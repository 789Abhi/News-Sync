import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchNews, clearSearchResults } from "../redux/newsSlice"; // Adjust import path
import PreferencesModal from "./PreferencesModal";

function Header({ onCountryChange, onPreferencesSave }) {
  const countries = [
    {
      value: "all",
      label: "All",
      flag: "https://tse3.mm.bing.net/th?id=OIP.TvFyTKnIpVLfvTS0F4Z12gHaHa&pid=Api&P=0&h=180",
    },
    { value: "in", label: "IND", flag: "https://flagcdn.com/in.svg" },
    { value: "us", label: "USA", flag: "https://flagcdn.com/us.svg" },
    { value: "uk", label: "UK", flag: "https://flagcdn.com/gb.svg" },
    { value: "au", label: "AUS", flag: "https://flagcdn.com/au.svg" },
    { value: "ca", label: "CAN", flag: "https://flagcdn.com/ca.svg" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0].value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(selectedCountry);
    }
  }, [selectedCountry, onCountryChange]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    if (onCountryChange) {
      onCountryChange(country.value);
    }
    setIsDropdownOpen(false);
  };

  const handlePreferencesClick = () => {
    setIsPreferencesModalOpen(true);
  };

  const handlePreferencesSave = (preferences) => {
    if (onPreferencesSave) {
      onPreferencesSave(preferences);
    }
    setIsPreferencesModalOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    dispatch(clearSearchResults());
    dispatch(searchNews(searchTerm));
    navigate("/search", { state: { searchTerm } }); // Pass search term in navigation state
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

        {/* Country Dropdown and Preferences */}
        <div className="flex items-center gap-4">
          {showCustomizeFeedButton && (
            <Link
              to="/search"
              className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-md"
            >
              Customize Feed
            </Link>
          )}

          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 bg-white text-gray-800 rounded-md shadow-md flex items-center justify-between w-[100px] h-[40px]"
            >
              <div className="flex items-center gap-2">
                <img
                  src={countries.find((c) => c.value === selectedCountry)?.flag}
                  alt="Selected Country"
                  className="w-6 h-6 rounded-full"
                />
                <span>
                  {countries.find((c) => c.value === selectedCountry)?.label}
                </span>
              </div>
              <span className="ml-2 text-xs">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-md rounded-md z-10">
                {countries
                  .filter((country) => country.value !== selectedCountry)
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

          {/* Set Preferences Icon  */}
          {showPreferencesButton && (
            <button
              onClick={handlePreferencesClick}
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

      {/* Modal Popup for Preferences */}
      <PreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
        onSave={handlePreferencesSave}
      />
    </header>
  );
}

export default Header;
