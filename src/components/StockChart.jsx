import { useEffect, useState } from "react";
import "./StockChart.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { getHistory } from "../services/stockApi";

function StockChart({
  code,
  name = "",
  range,
  setRange,
  compact = false
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priceChange =
    data.length > 1
      ? data[data.length - 1].price - data[0].price
      : 0;

  const priceChangePercent =
    data.length > 1 && data[0].price !== 0
      ? (priceChange / data[0].price) * 100
      : 0;

  const isUp = priceChange >= 0;

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getHistory(code, range);

        // Backend returns: { meta, values: [...] }
        const values = res.data?.values || [];

        const chartData = values
          .filter((item) => item.datetime && item.close != null)
          .map((item) => ({
            date: new Date(item.datetime).toLocaleDateString(),
            price: Number(item.close)
          }));

        setData(chartData);

      } catch (error) {
        console.error("CHART ERROR:", error);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      loadHistory();
    }
  }, [code, range]);

  return (
    <div className="stock-card">

      {/* Stock Header */}
      <div className="stock-header">

        <div>
          <h3>
            {code} {name}
          </h3>

          <div className="current-price">
            ¥
            {data.length > 0
              ? data[data.length - 1].price.toLocaleString()
              : "--"}
          </div>
        </div>

        <div
          className={`price-change ${
            isUp ? "up" : "down"
          }`}
        >
          {isUp ? "▲" : "▼"}

          ¥{Math.abs(priceChange).toLocaleString()}

          ({Math.abs(priceChangePercent).toFixed(2)}%)
        </div>

      </div>

      {/* Time Filter */}
      <div className="time-filter">

  <button
    className={range === "1H" ? "active" : ""}
    onClick={() => setRange("1H")}
  >
    1H
  </button>

  <button
    className={range === "1D" ? "active" : ""}
    onClick={() => setRange("1D")}
  >
    1D
  </button>

  <button
    className={range === "1W" ? "active" : ""}
    onClick={() => setRange("1W")}
  >
    1W
  </button>

  <button
    className={range === "1M" ? "active" : ""}
    onClick={() => setRange("1M")}
  >
    1M
  </button>

  <button
    className={range === "1Y" ? "active" : ""}
    onClick={() => setRange("1Y")}
  >
    1Y
  </button>

  <button
    className={range === "5Y" ? "active" : ""}
    onClick={() => setRange("5Y")}
  >
    5Y
  </button>

  <button
    className={range === "MAX" ? "active" : ""}
    onClick={() => setRange("MAX")}
  >
    Max
  </button>

</div>

      {/* Chart */}
      <div
        style={{
          width: "100%",
          height: compact ? 120 : 250
        }}
      >

        {loading ? (

          <div className="loading">
            Loading chart...
          </div>

        ) : error ? (

          <div className="error">
            ⚠️ {error}
          </div>

        ) : data.length === 0 ? (

          <div className="error">
            ⚠️ No chart data available
          </div>

        ) : (

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke={
                  isUp
                    ? "#16a34a"
                    : "#dc2626"
                }
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}

export default StockChart;

function CustomTooltip({
  active,
  payload,
  label
}) {
  if (
    active &&
    payload &&
    payload.length
  ) {
    return (
      <div className="custom-tooltip">

        <p className="tooltip-date">
          {label}
        </p>

        <p className="tooltip-price">
          ¥
          {Number(
            payload[0].value
          ).toLocaleString()}
        </p>

      </div>
    );
  }

  return null;
}