// src/calculateEMA.js
export default function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let ema = data[0];

  data.forEach((price, index) => {
    if (index === 0) {
      emaArray.push(price);
    } else {
      ema = price * k + ema * (1 - k);
      emaArray.push(ema);
    }
  });

  return emaArray;
}
