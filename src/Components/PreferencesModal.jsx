import React, { useState } from "react";

function PreferencesModal({ isOpen, onClose, onSave }) {
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const handleSave = () => {
    onSave({ categories, sources, authors });
    onClose();
  };

  const handleClear = () => {
    setCategories([]);
    setSources([]);
    setAuthors([]);
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
        {title}
      </button>
      {openDropdown === dropdownKey && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 text-black rounded-md shadow-md z-10">
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
              Save
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
            ]}
            selected={sources}
            setSelected={setSources}
            dropdownKey="sources"
          />
          <Dropdown
            title="Select Authors"
            options={["Author 1", "Author 2", "Author 3", "Author 4"]}
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
