import calculateEMA from "./emaCalculator";

const checkCrossover = (candles, emaPeriod = 21) => {
  if (!Array.isArray(candles) || candles.length < emaPeriod) return null;

  const closes = candles.map(c => c.close);
  const ema = calculateEMA(closes, emaPeriod);

  const lastClose = closes[closes.length - 1];
  const prevClose = closes[closes.length - 2];
  const lastEMA = ema[ema.length - 1];
  const prevEMA = ema[ema.length - 2];

  if (prevClose < prevEMA && lastClose > lastEMA) return "bullish";
  if (prevClose > prevEMA && lastClose < lastEMA) return "bearish";

  return null;
};

export default checkCrossover;
