import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserPreferences, clearUserPreferences } from "../redux/newsSlice";

function PreferencesModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const currentPreferences = useSelector((state) => state.news.preferences);

  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("userNewsPreferences");
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setCategories(parsedPreferences.categories || []);
      setSources(parsedPreferences.sources || []);
      setAuthors(parsedPreferences.authors || []);
    }
  }, []);

  const handleSave = () => {
    const preferences = { categories, sources, authors };
    dispatch(setUserPreferences(preferences));
    localStorage.setItem("userNewsPreferences", JSON.stringify(preferences));
    onClose();
  };

  const handleClear = () => {
    setCategories([]);
    setSources([]);
    setAuthors([]);
    dispatch(clearUserPreferences());
    localStorage.removeItem("userNewsPreferences");
    onClose();
  };

  const toggleSelection = (value, selectedList, setSelectedList) => {
    if (selectedList.includes(value)) {
      setSelectedList(selectedList.filter((item) => item !== value));
    } else {
      setSelectedList([...selectedList, value]);
    }
  };

  const Dropdown = ({ title, options, selected, setSelected, dropdownKey }) => (
    <div className="relative mb-4">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === dropdownKey ? null : dropdownKey)
        }
        className="w-full text-left border border-gray-300 bg-white text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {title} ({selected.length > 0 ? selected.length : "All"})
      </button>
      {openDropdown === dropdownKey && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 text-black rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selected.includes(option) ? "bg-gray-200" : ""
              }`}
              onClick={() => toggleSelection(option, selected, setSelected)}
            >
              {selected.includes(option) && (
                <span className="text-blue-600 mr-2">✔</span>
              )}
              {option}
            </div>
          ))}
          <div className="flex justify-end p-2 border-t border-gray-200">
            <button
              onClick={() => setOpenDropdown(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 modal-overlay flex items-center justify-center bg-gray-800 bg-opacity-75"
        onClick={(e) => {
          if (e.target.classList.contains("modal-overlay")) onClose();
        }}
      >
        <div className="bg-white p-6 rounded-lg w-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">
              Set Your Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 text-[30px] hover:text-gray-900"
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>

          <Dropdown
            title="Select Categories"
            options={[
              "Technology",
              "Business",
              "Health",
              "Sports",
              "Entertainment",
              "Science",
              "General",
            ]}
            selected={categories}
            setSelected={setCategories}
            dropdownKey="categories"
          />
          <Dropdown
            title="Select Sources"
            options={[
              "BBC",
              "CNN",
              "Reuters",
              "Al Jazeera",
              "The New York Times",
              "Associated Press",
              "Bloomberg",
            ]}
            selected={sources}
            setSelected={setSources}
            dropdownKey="sources"
          />
          <Dropdown
            title="Select Authors"
            options={[
              "Author 1",
              "Author 2",
              "Author 3",
              "Author 4",
              "Jane Doe",
              "John Smith",
              "Tech Journalist",
            ]}
            selected={authors}
            setSelected={setAuthors}
            dropdownKey="authors"
          />

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear Preferences
            </button>
            <button
              onClick={handleSave}
              disabled={
                !categories.length && !sources.length && !authors.length
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default PreferencesModal;
