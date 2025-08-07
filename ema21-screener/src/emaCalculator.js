function calculateEMA(prices, period) {
  const k = 2 / (period + 1);
  let emaArray = [];

  if (prices.length < period) {
    return emaArray;
  }

  const sma = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  emaArray[period - 1] = sma;

  for (let i = period; i < prices.length; i++) {
    emaArray[i] = prices[i] * k + emaArray[i - 1] * (1 - k);
  }

  return emaArray;
}

export default calculateEMA;
