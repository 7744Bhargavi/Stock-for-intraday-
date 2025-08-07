import calculateEMA from "./emaCalculator";

const checkCrossover = (candles, emaPeriod = 21) => {
  if (candles.length < emaPeriod + 5) return false;

  const closes = candles.map(c => c.close);
  const emaValues = calculateEMA(closes, emaPeriod);

  const i = emaValues.length - 1;

  const c0 = closes[i];
  const e0 = emaValues[i];

  const c1 = closes[i - 1];
  const e1 = emaValues[i - 1];

  const c2 = closes[i - 2];
  const e2 = emaValues[i - 2];

  const c3 = closes[i - 3];
  const e3 = emaValues[i - 3];

  const c4 = closes[i - 4];
  const e4 = emaValues[i - 4];

  // Bullish crossover condition
  const bullish = c4 < e4 && c3 > e3 && c2 > e2 && c1 > e1 && c0 > e0;

  // Bearish crossover condition
  const bearish = c4 > e4 && c3 < e3 && c2 < e2 && c1 < e1 && c0 < e0;

  if (bullish) return "bullish";
  if (bearish) return "bearish";
  return false;
};

export default checkCrossover;
