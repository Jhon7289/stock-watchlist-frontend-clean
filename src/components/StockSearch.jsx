import {
  useEffect,
  useState
} from "react";

import { searchStocks } from "../services/stockApi";


function StockSearch({
  onAddStock,
  watchlistNames
}) {

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  const [
    selectedWatchlist,
    setSelectedWatchlist
  ] = useState("Watchlist 1");

  useEffect(() => {

  if (
    !watchlistNames.includes(
      selectedWatchlist
    )
  ) {

    setSelectedWatchlist(
      watchlistNames[0]
    );

  }

}, [
  watchlistNames,
  selectedWatchlist
]);


  const handleSearch = async () => {

    if (!query.trim()) return;


    try {

      setLoading(true);


      const res =
        await searchStocks(query);


      const searchResults =
        res.data.data || [];


      setResults(
        searchResults.slice(0, 1)
      );


    } catch (error) {

      console.error(
        "SEARCH ERROR:",
        error
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="stock-search">


      {/* Search Box */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search stock..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSearch();

            }

          }}
        />


        <button
          onClick={handleSearch}
        >
          🔍 Search
        </button>

      </div>


      {loading && (

        <p>
          Searching...
        </p>

      )}


      {/* Search Results */}

      <div className="search-results">

        {results.map((stock) => (

          <div
            className="search-result"
            key={stock.symbol}
          >

            <div>

              <strong>
                {stock.symbol}
              </strong>

              <span>
                {stock.instrument_name}
              </span>

            </div>


            {/* Watchlist Select */}

            <select
              value={selectedWatchlist}
              onChange={(e) =>
                setSelectedWatchlist(
                  e.target.value
                )
              }
            >

              {watchlistNames.map((name) => (

  <option
    key={name}
    value={name}
  >
    {name}
  </option>

))}

            </select>


            {/* Add Button */}

            <button
              onClick={() => {

                onAddStock(
                  stock,
                  selectedWatchlist
                );


                setQuery("");

                setResults([]);

              }}
            >
              ＋ Add
            </button>

          </div>

        ))}

      </div>


    </div>

  );

}


export default StockSearch;