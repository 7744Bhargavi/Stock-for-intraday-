import React, { useEffect, useState } from "react";
import stockList from "./stockList";
import calculateEMA from "./emaCalculator"; // ✅ yaha naam fix kiya

const Screener = () => {
  const [crossovers, setCrossovers] = useState([]);

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://api.dhan.co/charts/intraday?symbol=${symbol}&interval=5m`,
        {
          headers: {
            "Content-Type": "application/json",
            "access-token": "YOUR_DHAN_ACCESS_TOKEN", // yaha apna Dhan ka token daalo
          },
        }
      );

      if (!response.ok) {
        console.error(`Error fetching ${symbol}:`, response.statusText);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${symbol}:`, error);
      return null;
    }
  };

  const checkCrossover = (candles) => {
    const closes = candles.map((c) => c.close);
    const ema21 = calculateEMA(closes, 21);

    let results = [];

    for (let i = 1; i < closes.length; i++) {
      const prevPrice = closes[i - 1];
      const currPrice = closes[i];
      const prevEMA = ema21[i - 1];
      const currEMA = ema21[i];

      // Bullish crossover
      if (prevPrice < prevEMA && currPrice > currEMA) {
        results.push({ type: "Bullish", index: i });
      }

      // Bearish crossover
      if (prevPrice > prevEMA && currPrice < currEMA) {
        results.push({ type: "Bearish", index: i });
      }
    }

    return results;
  };

  useEffect(() => {
    const runScreener = async () => {
      let found = [];

      for (const symbol of stockList) {
        const data = await fetchStockData(symbol);
        if (data && data.candles) {
          const cross = checkCrossover(data.candles);
          if (cross.length > 0) {
            found.push({ symbol, cross });
          }
        }
      }

      setCrossovers(found);
    };

    runScreener();
    const interval = setInterval(runScreener, 300000); // 5 min refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>EMA 21 Crossover Screener</h1>
      {crossovers.length === 0 ? (
        <p>No crossovers found.</p>
      ) : (
        <ul>
          {crossovers.map((item, index) => (
            <li key={index}>
              {item.symbol} — {item.cross.map((c) => c.type).join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Screener;
                    
