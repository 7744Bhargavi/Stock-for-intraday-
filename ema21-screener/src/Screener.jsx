import React, { useState } from "react";
import calculateEMA from "./calculateEMA";

const Screener = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy candle data for demo mode
  const demoCandles = [
    { close: 100 },
    { close: 102 },
    { close: 104 },
    { close: 103 },
    { close: 105 },
    { close: 110 }, // crossover candle
  ];

  const stockList = ["DEMO1", "DEMO2", "DEMO3"];

  const fetchStockData = async (symbol) => {
    try {
      const url = `https://api.dhan.co/charts/intraday?symbol=${symbol}&interval=5`;
      const res = await fetch(url, {
        headers: { Authorization: "Bearer YOUR_ACCESS_TOKEN" },
      });
      const data = await res.json();

      // If API failed or returned empty data, use demoCandles
      if (!data || !data.candles || data.candles.length === 0) {
        console.log(`Market closed - Using demo data for ${symbol}`);
        return demoCandles;
      }

      return data.candles.map((candle) => ({
        close: candle[4], // Close price
      }));
    } catch (error) {
      console.log(`Error fetching ${symbol} - Using demo data`);
      return demoCandles;
    }
  };

  const scanStocks = async () => {
    setLoading(true);
    let crossedStocks = [];

    for (let stock of stockList) {
      const candles = await fetchStockData(stock);
      const closes = candles.map((c) => c.close);
      const ema21 = calculateEMA(closes, 21);

      const lastClose = closes[closes.length - 1];
      const lastEMA = ema21[ema21.length - 1];
      const prevClose = closes[closes.length - 2];
      const prevEMA = ema21[ema21.length - 2];

      if (prevClose < prevEMA && lastClose > lastEMA) {
        crossedStocks.push({ stock, type: "Bullish" });
      } else if (prevClose > prevEMA && lastClose < lastEMA) {
        crossedStocks.push({ stock, type: "Bearish" });
      }
    }

    setResults(crossedStocks);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={scanStocks} disabled={loading}>
        {loading ? "Scanning..." : "Scan Now"}
      </button>

      <ul>
        {results.map((r, i) => (
          <li key={i}>
            {r.stock} - {r.type} Crossover
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Screener;
