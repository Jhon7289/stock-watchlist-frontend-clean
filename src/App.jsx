import {
  useEffect,
  useState
} from "react";

import StockSearch from "./components/StockSearch";
import StockChart from "./components/StockChart";

import {
  getWatchlists,
  saveWatchlists,
  socket
} from "./services/stockApi";


function App() {

  const [watchlists, setWatchlists] =
    useState({
      "Watchlist 1": [],
      "Watchlist 2": [],
      "Watchlist 3": []
    });


  const [
    activeWatchlist,
    setActiveWatchlist
  ] = useState("Watchlist 1");


  const [range, setRange] =
    useState("1M");


  // =========================
  // LOAD WATCHLISTS
  // =========================

  useEffect(() => {

    getWatchlists()
      .then((res) => {

        setWatchlists(res.data);

      })
      .catch((error) => {

        console.error(
          "LOAD WATCHLIST ERROR:",
          error
        );

      });

  }, []);


  // =========================
  // SOCKET AUTO UPDATE
  // =========================

  useEffect(() => {

    const handleUpdate = (
      updatedWatchlists
    ) => {

      setWatchlists(
        updatedWatchlists
      );

    };


    socket.on(
      "watchlistsUpdated",
      handleUpdate
    );


    return () => {

      socket.off(
        "watchlistsUpdated",
        handleUpdate
      );

    };

  }, []);


  // =========================
  // SAVE WATCHLISTS
  // =========================

  useEffect(() => {

  const timer = setTimeout(() => {

    saveWatchlists(watchlists)
      .catch((error) => {

        console.error(
          "SAVE WATCHLIST ERROR:",
          error
        );

      });

  }, 500);


  return () => {

    clearTimeout(timer);

  };

}, [watchlists]);


  // =========================
  // RENAME WATCHLIST
  // =========================

  const renameWatchlist = (
    oldName
  ) => {

    const newName = prompt(
      "Enter new watchlist name:",
      oldName
    );


    const trimmedName =
      newName?.trim();


    if (
      !trimmedName ||
      trimmedName === oldName
    ) {

      return;

    }


    if (
      watchlists[trimmedName]
    ) {

      alert(
        "This name already exists"
      );

      return;

    }


    setWatchlists((prev) => {

      const updated = {};


      Object.entries(prev).forEach(
        ([name, stocks]) => {

          if (
            name === oldName
          ) {

            updated[trimmedName] =
              stocks;

          } else {

            updated[name] =
              stocks;

          }

        }
      );


      return updated;

    });


    setActiveWatchlist(
      trimmedName
    );

  };


  // =========================
  // ADD STOCK
  // =========================

  const addToWatchlist = (
    stock,
    watchlistName
  ) => {

    setWatchlists((prev) => {

      const currentList =
        prev[watchlistName] || [];


      if (
        currentList.length >= 10
      ) {

        alert(
          "Maximum 10 stocks only"
        );

        return prev;

      }


      const alreadyExists =
        currentList.some(
          (item) =>
            item.symbol ===
            stock.symbol
        );


      if (
        alreadyExists
      ) {

        alert(
          "Already in Watchlist"
        );

        return prev;

      }


      return {

        ...prev,

        [watchlistName]: [

          ...currentList,

          stock

        ]

      };

    });

  };


  // =========================
  // REMOVE STOCK
  // =========================

  const removeFromWatchlist = (
    watchlistName,
    symbol
  ) => {

    setWatchlists((prev) => ({

      ...prev,

      [watchlistName]:
        prev[watchlistName].filter(
          (stock) =>
            stock.symbol !== symbol
        )

    }));

  };


  return (

    <div className="app">


      <StockSearch
        onAddStock={
          addToWatchlist
        }
        watchlistNames={
          Object.keys(watchlists)
        }
      />


      {/* WATCHLIST TABS */}

      <div className="watchlist-tabs">

        {Object.keys(
          watchlists
        ).map((name) => (

          <button
            key={name}
            className={
              activeWatchlist === name
                ? "active watchlist-tab"
                : "watchlist-tab"
            }
            onClick={() =>
              setActiveWatchlist(
                name
              )
            }
          >

            <span>
              {name}
            </span>


            <span
              className=
                "tab-rename-button"
              onClick={(e) => {

                e.stopPropagation();

                renameWatchlist(
                  name
                );

              }}
            >
              ✏️
            </span>

          </button>

        ))}

      </div>


      {/* SELECTED WATCHLIST */}

      <div className="watchlist">

        <h2 className="watchlist-title">

          {activeWatchlist}

        </h2>


        {(
          watchlists[
            activeWatchlist
          ] || []

        ).map((stock) => (

          <div
            className="watchlist-item"
            key={stock.symbol}
          >

            <StockChart
              code={stock.symbol}
              name={
                stock.instrument_name
              }
              range={range}
              setRange={setRange}
              compact={true}
            />


            <button
              onClick={() =>
                removeFromWatchlist(
                  activeWatchlist,
                  stock.symbol
                )
              }
            >
              ✕
            </button>

          </div>

        ))}

      </div>


    </div>

  );

}


export default App;