import React, { useState } from "react";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    console.log({ keyword, category, source, date });
    // Perform search/filter logic here
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Search Prefered Aricles
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <input
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Source</option>
            <option value="bbc">BBC</option>
            <option value="cnn">CNN</option>
            <option value="reuters">Reuters</option>
            <option value="aljazeera">Al Jazeera</option>
            <option value="nytimes">The New York Times</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
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
