// EMA Calculation function
export function calculateEMA(data, period) {
  if (!Array.isArray(data) || data.length < period) {
    return [];
  }

  const k = 2 / (period + 1);
  let emaArray = [];

  // First EMA as SMA
  let sma =
    data
      .slice(0, period)
      .reduce((sum, value) => sum + value, 0) / period;
  emaArray[period - 1] = sma;

  // Rest EMA values
  for (let i = period; i < data.length; i++) {
    emaArray[i] = data[i] * k + emaArray[i - 1] * (1 - k);
  }

  return emaArray;
    }
