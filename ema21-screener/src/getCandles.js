// src/getCandles.js
const apiKey = "1102604841"; // apna Dhan client-id
const accessToken = "PASTE_YOUR_DHAN_ACCESS_TOKEN"; // apna full access-token

const getCandles = async (symbolObjOrSymbol, exchange = "NSE") => {
  let symbol = symbolObjOrSymbol;
  let exch = exchange;

  if (typeof symbolObjOrSymbol === "object" && symbolObjOrSymbol !== null) {
    symbol = symbolObjOrSymbol.symbol;
    exch = symbolObjOrSymbol.exchange || exchange;
  }

  const exchangeSegment = exch === "BSE" ? "BSE_EQ" : "NSE_EQ";
  const url = `https://api.dhan.co/market/v1/instruments/intraday/${exchangeSegment}/${symbol}?interval=5m`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        "client-id": apiKey,
      },
    });

    const json = await response.json();
    let raw = json?.data ?? json;

    if (!raw) return [];

    // Normalize candles to { open, high, low, close, time }
    if (Array.isArray(raw)) {
      return raw.map((item) => {
        if (typeof item === "object" && !Array.isArray(item)) {
          return {
            open: Number(item.open ?? item.o ?? 0),
            high: Number(item.high ?? item.h ?? 0),
            low: Number(item.low ?? item.l ?? 0),
            close: Number(item.close ?? item.c ?? 0),
            time: item.time ?? item.t ?? null,
          };
        }
        if (Array.isArray(item)) {
          return {
            time: item[0] ?? null,
            open: Number(item[1] ?? 0),
            high: Number(item[2] ?? 0),
            low: Number(item[3] ?? 0),
            close: Number(item[4] ?? 0),
          };
        }
        return { open: 0, high: 0, low: 0, close: 0, time: null };
      });
    }

    if (raw.candles && Array.isArray(raw.candles)) {
      return raw.candles.map((it) => ({
        time: it[0] ?? null,
        open: Number(it[1] ?? 0),
        high: Number(it[2] ?? 0),
        low: Number(it[3] ?? 0),
        close: Number(it[4] ?? 0),
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching candles:", error);
    return [];
  }
};

export default getCandles;
        
