const apiKey = "1102604841";
const accessToken = "eyJ0eXAiOiJK..."; // ← yaha tu apna full token paste kare

const getCandles = async (symbol, exchange = "NSE") => {
  const exchangeSegment = exchange === "BSE" ? "BSE_EQ" : "NSE_EQ";
  const url = `https://api.dhan.co/market/v1/instruments/intraday/${exchangeSegment}/${symbol}?interval=5m`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        "client-id": apiKey,
      },
    });

    const data = await response.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching candles:", error.message);
    return [];
  }
};

export default getCandles;
      
