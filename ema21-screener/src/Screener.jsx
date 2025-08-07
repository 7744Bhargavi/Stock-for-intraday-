import React, { useState } from "react";
import scanStocks from "./scanStocks";

const Screener = () => {
  const [stocks, setStocks] = useState([]);

  const runScan = async () => {
    const result = await scanStocks();
    setStocks(result);
  };

  return (
    <div>
      <h2>EMA 21 Screener</h2>
      <button onClick={runScan}>📊 Scan Now</button>
      <ul>
        {stocks.map((stock, idx) => (
          <li key={idx}>
            {stock.symbol} - {stock.direction.toUpperCase()} crossover
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Screener;
