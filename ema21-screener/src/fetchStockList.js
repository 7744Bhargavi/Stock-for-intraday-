const clientId = "1102604841";
const accessToken = "eyJ0eXAiOiJK..."; // ← yaha tu apna full token paste kare

export const fetchStockList = async () => {
  try {
    const exchanges = ["NSE", "BSE"];
    let allStocks = [];

    for (let exchange of exchanges) {
      const res = await fetch(
        `https://api.dhan.co/instruments/master/${exchange}`,
        {
          headers: {
            "access-token": accessToken,
            "client-id": clientId,
          },
        }
      );

      const text = await res.text();
      const rows = text.split("\n").slice(1);
      const stocks = rows.map((row) => {
        const cols = row.split(",");
        return {
          symbol: cols[0],
          name: cols[1],
          exchange: exchange,
        };
      });

      allStocks.push(...stocks);
    }

    return allStocks;
  } catch (err) {
    console.error("Error fetching stock list:", err);
    return [];
  }
};
          
