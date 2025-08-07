import React, { useEffect, useState } from "react";
import stockList from "./stockList";
import getCandles from "./getCandles";
import { calculateEMA } from "./emaCalculator";
import checkCrossover from "./checkCrossover";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function scanStocks() {
      let foundStocks = [];

      for (let stock of stockList) {
        try {
          const candles = await getCandles(stock, "5m", 50); // last 50 candles, 5 min timeframe
          if (!candles || candles.length < 21) continue;

          const closes = candles.map(c => c.close);
          const ema21 = calculateEMA(closes, 21);

          const signal = checkCrossover(candles, ema21);
          if (signal) {
            foundStocks.push({
              stock,
              signal
            });
          }
        } catch (error) {
          console.error(`Error scanning ${stock}`, error);
        }
      }

      setResults(foundStocks);
      setLoading(false);
    }

    scanStocks();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>EMA 21 Screener (5m)</h1>
      {loading ? (
        <p>Scanning stocks...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              {item.stock} —{" "}
              <span
                style={{
                  color: item.signal === "bullish" ? "green" : "red"
                }}
              >
                {item.signal.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No signals found.</p>
      )}
    </div>
  );
}

export default App;
      
