import getCandles from "./getCandles";
import checkCrossover from "./checkCrossover";
import stockList from "./stockList";

const scanStocks = async () => {
  const crossedStocks = [];

  for (const stock of stockList) {
    try {
      const candles = await getCandles(stock.symbol, stock.exchange);
      const result = checkCrossover(candles);

      if (result) {
        crossedStocks.push({
          symbol: stock.symbol,
          exchange: stock.exchange,
          direction: result,
        });
      }
    } catch (error) {
      console.error(`Error scanning ${stock.symbol}:`, error.message);
    }
  }

  return crossedStocks;
};

export default scanStocks;
