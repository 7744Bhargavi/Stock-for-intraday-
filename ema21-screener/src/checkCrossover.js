import { calculateEMA } from "./emaCalculator";

// Function to check EMA 21 crossover
function checkCrossover(candles) {
  if (!candles || candles.length < 24) return null;

  // Close prices array
  const closePrices = candles.map(candle => candle.close);

  // Calculate EMA 21
  const ema21 = calculateEMA(closePrices, 21);

  const lastIndex = candles.length - 1;
  const prevIndex = lastIndex - 1;

  const lastClose = closePrices[lastIndex];
  const prevClose = closePrices[prevIndex];

  const lastEMA = ema21[lastIndex];
  const prevEMA = ema21[prevIndex];

  // Crossover detection
  if (prevClose < prevEMA && lastClose > lastEMA) {
    return "bullish"; // Crossed from below
  }
  if (prevClose > prevEMA && lastClose < lastEMA) {
    return "bearish"; // Crossed from above
  }

  return null; // No crossover
}

export default checkCrossover;
