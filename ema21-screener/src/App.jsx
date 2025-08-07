import React, { useState } from "react";
import { calculateEMA } from "./utils/emaCalculator";

function App() {
  const [result, setResult] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.dhan.co/v2/market-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "YOUR_DHAN_ACCESS_TOKEN"
        },
        body: JSON.stringify({
          symbols: ["NSE:TCS-EQ"], // Example stock
          exchangeSegment: "NSE_EQ"
        })
      });

      const json = await response.json();
      console.log("API Data:", json);

      // Example: Replace with your candle data array from API
      const candleData = [
        { close: 3500 },
        { close: 3510 },
        { close: 3490 },
        { close: 3520 }
      ];

      const emaData = calculateEMA(candleData, 21);
      setResult(emaData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>EMA 21 Screener</h1>
      <button onClick={fetchData}>Scan Now</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default App;
