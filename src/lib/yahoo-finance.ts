import { execSync } from "child_process";
import path from "path";

export interface StockBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockData {
  bars: StockBar[];
  name: string;
  symbol: string;
  source: string;
}

/**
 * Attempts to fetch stock data by executing the Python script (trying python then python3).
 */
export function fetchViaPythonBridge(symbol: string, period: string = "1y"): StockData {
  const scriptPath = path.join(process.cwd(), "scripts", "fetch_yf.py");
  
  let output: string;
  try {
    // Try standard python command
    output = execSync(`python "${scriptPath}" "${symbol}" "${period}"`, {
      encoding: "utf-8",
      timeout: 30000,
    });
  } catch (err1: any) {
    console.warn(`Python execution failed, trying python3: ${err1.message}`);
    // Try python3 fallback
    output = execSync(`python3 "${scriptPath}" "${symbol}" "${period}"`, {
      encoding: "utf-8",
      timeout: 30000,
    });
  }

  const parsed = JSON.parse(output);
  if (parsed.error) {
    throw new Error(parsed.error);
  }

  // Handle case where python batch returns an object with symbols
  if (symbol.includes(",") && !parsed.bars) {
    return parsed; // Return batch object directly
  }

  return {
    bars: parsed.bars || [],
    name: parsed.name || symbol,
    symbol: symbol,
    source: "Yahoo Finance (Python yfinance)",
  };
}

/**
 * Native Node.js fallback that fetches data directly from the public Yahoo Finance Chart API.
 */
export async function fetchViaDirectHttp(symbol: string, period: string = "1y"): Promise<StockData> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol.toUpperCase()}?range=${period}&interval=1d`;
  
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Yahoo Finance HTTP request failed with status ${response.status}`);
  }

  const data = await response.json();
  const result = data.chart?.result?.[0];
  if (!result) {
    throw new Error(`Invalid Yahoo Finance API response structure for ${symbol}`);
  }

  const timestamps = result.timestamp || [];
  const quote = result.indicators?.quote?.[0] || {};
  const opens = quote.open || [];
  const highs = quote.high || [];
  const lows = quote.low || [];
  const closes = quote.close || [];
  const volumes = quote.volume || [];

  const bars: StockBar[] = [];
  for (let i = 0; i < timestamps.length; i++) {
    const openVal = opens[i];
    const closeVal = closes[i];
    
    // Skip invalid entries (such as days with no trading activity / null prices)
    if (openVal === null || openVal === undefined || closeVal === null || closeVal === undefined) {
      continue;
    }

    const highVal = highs[i];
    const lowVal = lows[i];
    const volumeVal = volumes[i];
    
    // Create Date safely using UTC timestamp
    // Note: yfinance format returns date formatted in YYYY-MM-DD local timezone context.
    const dateStr = new Date(timestamps[i] * 1000).toISOString().split("T")[0];

    bars.push({
      date: dateStr,
      open: Number(openVal),
      high: highVal !== null && highVal !== undefined ? Number(highVal) : Number(closeVal),
      low: lowVal !== null && lowVal !== undefined ? Number(lowVal) : Number(closeVal),
      close: Number(closeVal),
      volume: volumeVal !== null && volumeVal !== undefined ? Math.round(Number(volumeVal)) : 0,
    });
  }

  return {
    bars,
    name: result.meta?.longName || result.meta?.shortName || symbol.toUpperCase(),
    symbol: symbol.toUpperCase(),
    source: "Yahoo Finance (Node HTTP Fallback)",
  };
}

/**
 * Combined runner that attempts Python first, then python3, then direct HTTP fetch.
 */
export async function getStockDataWithFallback(symbol: string, period: string = "1y"): Promise<StockData> {
  // Check if multiple symbols (batch request)
  if (symbol.includes(",")) {
    try {
      return fetchViaPythonBridge(symbol, period);
    } catch (pyErr: any) {
      console.warn(`Python bridge batch fetch failed: ${pyErr.message}. Falling back to direct Node HTTP...`);
      return fetchBatchViaDirectHttp(symbol, period);
    }
  }

  try {
    return fetchViaPythonBridge(symbol, period);
  } catch (pyErr: any) {
    console.warn(`Python bridge fetch failed for ${symbol}: ${pyErr.message}. Falling back to direct Node HTTP...`);
    return await fetchViaDirectHttp(symbol, period);
  }
}

/**
 * Helper to fetch a batch of symbols concurrently via direct HTTP.
 */
async function fetchBatchViaDirectHttp(symbolsString: string, period: string = "1y"): Promise<any> {
  const symbols = symbolsString.split(",").map(s => s.trim()).filter(Boolean);
  const results: Record<string, any> = {};

  await Promise.all(
    symbols.map(async (sym) => {
      try {
        const data = await fetchViaDirectHttp(sym, period);
        results[sym] = {
          bars: data.bars,
          name: data.name,
        };
      } catch (err: any) {
        console.error(`Direct HTTP fetch failed for batch item ${sym}:`, err.message);
        results[sym] = {
          bars: [],
          name: sym,
          error: err.message,
        };
      }
    })
  );

  return results;
}
