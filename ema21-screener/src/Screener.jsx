import React, { useState, useEffect } from "react";
import calculateEMA from "./emaCalculator"; // Fixed file name

const Screener = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const stockList = [
    "RELIANCE",
    "TCS",
    "INFY",
    "HDFCBANK",
    "ICICIBANK",
    "SBIN",
    "HINDUNILVR",
    "ITC",
    "KOTAKBANK",
    "BHARTIARTL",
    // Baaki stocks yaha add kar sakta hai...
  ];

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://api.dhan.co/v2/market-feed/quotes?symbol=${symbol}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_DHAN_ACCESS_TOKEN",
            "Client-Id": "YOUR_DHAN_CLIENT_ID",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
      return null;
    }
  };

  const scanStocks = async () => {
    let results = [];

    for (let symbol of stockList) {
      const data = await fetchStockData(symbol);

      if (data && data.candles) {
        const ema21 = calculateEMA(data.candles.map((c) => c.close), 21);
        const lastPrice = data.candles[data.candles.length - 1].close;

        if (
          lastPrice > ema21[ema21.length - 1] &&
          data.candles[data.candles.length - 2].close < ema21[ema21.length - 2]
        ) {
          results.push({ symbol, signal: "Bullish Crossover" });
        }

        if (
          lastPrice < ema21[ema21.length - 1] &&
          data.candles[data.candles.length - 2].close > ema21[ema21.length - 2]
        ) {
          results.push({ symbol, signal: "Bearish Crossover" });
        }
      }
    }

    setStocks(results);
    setLoading(false);
  };

  useEffect(() => {
    scanStocks();
    const interval = setInterval(scanStocks, 60000); // 1 min refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-xl font-bold mb-4">EMA 21 Screener</h1>
      {loading ? (
        <p>Scanning stocks...</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index} className="mb-2">
              {stock.symbol} -{" "}
              <span
                className={
                  stock.signal.includes("Bullish") ? "text-green-400" : "text-red-400"
                }
              >
                {stock.signal}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Screener;
          
