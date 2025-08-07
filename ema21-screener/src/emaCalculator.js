export function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let ema = data[0].close; // Start with first candle close price

  for (let i = 0; i < data.length; i++) {
    ema = data[i].close * k + ema * (1 - k);
    emaArray.push({ ...data[i], ema });
  }

  return emaArray;
}
