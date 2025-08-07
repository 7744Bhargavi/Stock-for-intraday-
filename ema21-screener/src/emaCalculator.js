function calculateEMA(data, period) {
  if (!Array.isArray(data) || data.length === 0) return [];

  const k = 2 / (period + 1);
  let emaArray = [];
  let ema = data[0]; // start from first close

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

export default calculateEMA; // << IMPORTANT
