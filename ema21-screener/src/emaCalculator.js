// Function to calculate EMA for given period
export function calculateEMA(prices, period) {
  if (!prices || prices.length < period) return [];

  const k = 2 / (period + 1);
  let emaArray = [];
  let sum = 0;

  // First EMA = SMA of first 'period' prices
  for (let i = 0; i < period; i++) {
    sum += prices[i];
    emaArray.push(null); // No EMA for first 'period - 1' candles
  }

  let emaPrev = sum / period;
  emaArray[period - 1] = emaPrev;

  // Calculate EMA for rest
  for (let i = period; i < prices.length; i++) {
    const ema = (prices[i] - emaPrev) * k + emaPrev;
    emaArray.push(ema);
    emaPrev = ema;
  }

  return emaArray;
}
