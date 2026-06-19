import _yahooFinance from "yahoo-finance2";

// Robust resolution of the yahoo-finance2 instance
const yahooFinance = (function() {
  const lib = (_yahooFinance as any).default || _yahooFinance;
  if (!lib) return null;

  // 1. If it's already a working instance
  if (typeof lib.historical === 'function') return lib;

  // 2. If it's a function, it's either the Class or the Factory
  if (typeof lib === 'function') {
    try {
      // Try calling as a Factory first. 
      // The factory patches the prototype and returns the Class.
      const Cls = (lib as any)();
      return new (Cls as any)();
    } catch (e) {
      // If it's a Class, it cannot be called as a function, so we instantiate it.
      return new (lib as any)();
    }
  }
  return lib;
})();

export default async function TestPage({
  searchParams,
}: {
  searchParams: Promise<{ symbol?: string }>;
}) {
  const symbol = (await searchParams).symbol?.toUpperCase() || "AAPL";

  // Resource 1: Yahoo Finance
  let yfBars: any[] = [];
  let yfError: string | null = null;

  // Resource 2: Financial Modeling Prep (FMP) - Using public demo key for AAPL
  let fmpBars: any[] = [];
  let fmpError: string | null = null;

  // Resource 3: Python Bridge (yfinance)
  let pyBars: any[] = [];
  let pyError: string | null = null;

  try {
    if (!yahooFinance || !yahooFinance.historical) {
      throw new Error("Yahoo Finance library failed to initialize prototype methods.");
    }

    // Fetch last 30 days of daily bars
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 30);

    const result = await yahooFinance.historical(symbol, {
      period1: start,
      period2: end,
      interval: "1d",
    });

    yfBars = result.sort((a: any, b: any) => b.date.getTime() - a.date.getTime()).slice(0, 10);
  } catch (e: any) {
    yfError = e.message;
    console.error("Test page fetch error:", e);
  }

  try {
    // Resource 2: Financial Modeling Prep
    const FMP_API_KEY = process.env.FMP_API_KEY || "demo"; 
    // We use the 'quote' endpoint instead of 'historical-price-full' 
    // because the latter is now restricted to legacy users in new FMP accounts.
    const fmpRes = await fetch(
      `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FMP_API_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (fmpRes.status === 401) {
      throw new Error("FMP API Key 'demo' is unauthorized or expired. Please use a real API key.");
    }
    if (!fmpRes.ok) throw new Error(`FMP API returned status ${fmpRes.status}`);
    
    const data = await fmpRes.json();
    // The quote endpoint returns an array with the current snapshot
    fmpBars = data || [];
  } catch (e: any) {
    fmpError = e.message;
    console.error("FMP fetch error:", e);
  }

  try {
    // Resource 3: Python Bridge API
    const pyRes = await fetch(`http://localhost:3000/api/market/python-yf?symbol=${symbol}`, {
      cache: "no-store"
    });
    if (!pyRes.ok) throw new Error(`Python Bridge returned ${pyRes.status}`);
    const data = await pyRes.json();
    pyBars = data.bars || [];
  } catch (e: any) {
    pyError = e.message;
    console.error("Python bridge error:", e);
  }

  return (
    <div className="p-10 max-w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b pb-4 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">{symbol} Data Comparison Test</h1>
        
        <form action="/test" method="GET" className="flex gap-2">
          <input 
            type="text" 
            name="symbol" 
            placeholder="Enter Ticker (e.g. MSFT)" 
            defaultValue={symbol}
            className="border border-slate-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
          />
          <button 
            type="submit" 
            className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700 transition-colors"
          >
            Update
          </button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table 1: Yahoo Finance */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-accent">Resource 1: Yahoo Finance</h2>
          {yfError ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              <p className="font-bold">Yahoo Error:</p>
              <p className="font-mono">{yfError}</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold">Date</th>
                    <th className="p-2 font-semibold text-right">Close</th>
                    <th className="p-2 font-semibold text-right">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {yfBars.map((bar, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2 text-slate-600">
                        {bar.date instanceof Date ? bar.date.toISOString().split('T')[0] : String(bar.date).split('T')[0]}
                      </td>
                      <td className="p-2 text-right font-bold text-slate-900">${bar.close?.toFixed(2)}</td>
                      <td className="p-2 text-right text-slate-500 text-xs">{bar.volume?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-[10px] text-slate-400 italic">Method: yahoo-finance2 library (Node.js)</p>
        </div>

        {/* Table 2: FMP API */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gold">Resource 2: FMP (Quote API)</h2>
          {fmpError ? (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-700 rounded-md text-sm">
              <p className="font-bold">FMP Error:</p>
              <p className="font-mono">{fmpError}</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold">Symbol</th>
                    <th className="p-2 font-semibold text-right">Close</th>
                    <th className="p-2 font-semibold text-right">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fmpBars.map((bar: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2 text-slate-600 font-bold">{bar.symbol}</td>
                      <td className="p-2 text-right font-bold text-slate-900">${bar.price?.toFixed(2)}</td>
                      <td className="p-2 text-right text-slate-500 text-xs">{bar.change?.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-[10px] text-slate-400 italic">Method: Native fetch (REST API Demo)</p>
        </div>

        {/* Table 3: Python yfinance */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">Resource 3: Python (yfinance)</h2>
          {pyError ? (
            <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md text-sm">
              <p className="font-bold">Python Error:</p>
              <p className="font-mono">{pyError}</p>
              <p className="mt-2 text-xs italic">Ensure Python and yfinance are installed.</p>
            </div>
          ) : (
            <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-2 font-semibold">Date</th>
                    <th className="p-2 font-semibold text-right">Close</th>
                    <th className="p-2 font-semibold text-right">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pyBars.map((bar: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2 text-slate-600">{bar.date}</td>
                      <td className="p-2 text-right font-bold text-slate-900">${bar.close?.toFixed(2)}</td>
                      <td className="p-2 text-right text-slate-500 text-xs">{bar.volume?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-[10px] text-slate-400 italic">Method: Child Process (yfinance library)</p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-paper border border-slate-100 rounded-xl text-sm text-slate-600">
        <h3 className="font-bold mb-2">Import Comparison Notes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Python Bridge</strong> is often the most reliable for complex math, but requires a Python environment on the host machine.</li>
          <li><strong>Yahoo Finance</strong> uses a complex internal library that handles its own redirect and cookie logic. It returns data as JavaScript <code>Date</code> objects.</li>
          <li><strong>FMP</strong> uses a standard RESTful JSON interface. It returns data as strings (ISO dates) and numbers, which is typically faster for the browser to process but often requires an API key for production use.</li>
        </ul>
      </div>
    </div>
  );
}