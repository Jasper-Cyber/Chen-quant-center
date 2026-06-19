export type OhlcBar = { date: string; open: number; high: number; low: number; close: number };

export function sma(values: number[], period: number): (number | null)[] {
  return values.map((_, i) => {
    if (i < period - 1) return null;
    const slice = values.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

export function rsi(values: number[], period = 14): (number | null)[] {
  const out: (number | null)[] = [];
  for (let i = 0; i < values.length; i++) {
    if (i < period) {
      out.push(null);
      continue;
    }
    let gains = 0;
    let losses = 0;
    for (let j = i - period + 1; j <= i; j++) {
      const diff = values[j] - values[j - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }
    const rs = losses === 0 ? 100 : gains / losses;
    out.push(100 - 100 / (1 + rs));
  }
  return out;
}

export function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1);
  const result: number[] = [];
  values.forEach((v, i) => {
    if (i === 0) result.push(v);
    else result.push(v * k + result[i - 1] * (1 - k));
  });
  return result;
}

export function macd(values: number[]): {
  macd: (number | null)[];
  signal: (number | null)[];
  histogram: (number | null)[];
} {
  const ema12 = ema(values, 12);
  const ema26 = ema(values, 26);
  const macdLine = ema12.map((v, i) => v - ema26[i]);
  const signalLine = ema(macdLine, 9);
  const histogram = macdLine.map((m, i) => m - signalLine[i]);
  const pad = (arr: number[], start: number): (number | null)[] =>
    arr.map((v, i) => (i < start ? null : v));
  return {
    macd: pad(macdLine, 26),
    signal: pad(signalLine, 35),
    histogram: pad(histogram, 35),
  };
}

/** Black–Scholes European call price */
export function blackScholesCall(
  S: number,
  K: number,
  T: number,
  r: number,
  sigma: number
): number {
  if (T <= 0) return Math.max(S - K, 0);
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));
  return S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
}

/**
 * Calculates the rolling standard deviation of a data series.
 * @param data The input data series (e.g., log returns).
 * @param windowSize The size of the rolling window.
 * @returns An array of rolling standard deviations, with `null` for initial values.
 */
export function rollingStandardDeviation(data: number[], windowSize: number): (number | null)[] {
  if (data.length < windowSize) {
    return data.map(() => null);
  }

  const result: (number | null)[] = Array(windowSize - 1).fill(null);
  for (let i = windowSize - 1; i < data.length; i++) {
    const window = data.slice(i - windowSize + 1, i + 1);
    const mean = window.reduce((sum, val) => sum + val, 0) / windowSize;
    const variance = window.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / windowSize;
    result.push(Math.sqrt(variance));
  }
  return result;
}

/**
 * Calculates rolling historical VaR and CVaR (95%)
 * @returns Daily expected loss as a positive percentage
 */
export function rollingHistoricalRisk(returns: number[], windowSize: number, alpha = 0.05) {
  if (returns.length < windowSize) {
    return { 
      varOut: returns.map(() => null), 
      cvarOut: returns.map(() => null) 
    };
  }

  const varOut: (number | null)[] = Array(windowSize - 1).fill(null);
  const cvarOut: (number | null)[] = Array(windowSize - 1).fill(null);

  for (let i = windowSize - 1; i < returns.length; i++) {
    const window = returns.slice(i - windowSize + 1, i + 1).sort((a, b) => a - b);
    const cutoffIndex = Math.floor(alpha * windowSize);
    const varVal = window[Math.max(cutoffIndex, 0)];
    const tail = window.slice(0, Math.max(cutoffIndex, 1));
    const cvarVal = tail.reduce((a, b) => a + b, 0) / tail.length;

    varOut.push(Math.abs(varVal));
    cvarOut.push(Math.abs(cvarVal));
  }
  return { varOut, cvarOut };
}
export function historicalVar(returns: number[], alpha = 0.05): number | null {
  if (returns.length < 20) return null;
  const sorted = [...returns].sort((a, b) => a - b);
  const cutoff = Math.floor(alpha * sorted.length);
  return Math.abs(sorted[Math.max(cutoff, 0)]);
}

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function historicalCvar(returns: number[], alpha = 0.05): number | null {
  if (returns.length < 20) return null;
  const sorted = [...returns].sort((a, b) => a - b);
  const cutoff = Math.floor(alpha * sorted.length);
  const tail = sorted.slice(0, Math.max(cutoff, 1));
  return Math.abs(tail.reduce((a, b) => a + b, 0) / tail.length);
}

/** Simple ARCH(1)-style conditional variance (squared returns, demo estimator) */
export function archVolatilitySeries(
  returns: number[],
  omega = 0.00001,
  alpha = 0.1
): (number | null)[] {
  if (returns.length < 2) return returns.map(() => null);
  let h = returns.slice(0, 20).reduce((s, r) => s + r * r, 0) / Math.min(20, returns.length);
  const out: (number | null)[] = [null];
  for (let i = 1; i < returns.length; i++) {
    h = omega + alpha * returns[i - 1] ** 2 + (1 - alpha) * h;
    out.push(Math.sqrt(h * 252));
  }
  return out;
}
