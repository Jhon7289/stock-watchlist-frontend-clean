import { useState } from "react";

function SearchBar({ onSearch }) {

  const [code, setCode] = useState("");

  const handleSearch = () => {
    if (code) {
      onSearch(code);
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter stock code (e.g. 5707)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300"
        />

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>

      </div>
    </div>
  );
}

export default SearchBar;