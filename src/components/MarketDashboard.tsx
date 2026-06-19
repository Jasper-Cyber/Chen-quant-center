"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import StockChart from "@/components/StockChart";
import type { OhlcBar } from "@/lib/quant";

type MacroItem = {
  id: string;
  label: string;
  symbol: string;
  price: number | null;
  changePct: number | null;
  asOf: string | null;
};

export default function MarketDashboard() {
  const [symbol, setSymbol] = useState("AAPL");
  const [searchInput, setSearchInput] = useState("AAPL");
  const [bars, setBars] = useState<OhlcBar[]>([]);
  const [range, setRange] = useState("3mo");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [macro, setMacro] = useState<MacroItem[]>([]);
  const [source, setSource] = useState("");
  const [recentSymbols, setRecentSymbols] = useState<string[]>(["AAPL"]);
  
  // Persist fetched data in a local cache to prevent redundant 6s API calls during the session
  const stockCache = useRef<Record<string, { bars: OhlcBar[]; name: string; source: string }>>({});

  const loadStock = useCallback(async (sym: string, period: string) => {
    const cacheKey = `${sym}-${period}`;
    
    if (stockCache.current[cacheKey]) {
      const cached = stockCache.current[cacheKey];
      setBars(cached.bars);
      setName(cached.name);
      setSource(cached.source);
      setError(null);
      setRecentSymbols((prev) => {
        const upper = sym.toUpperCase();
        const filtered = prev.filter((s) => s !== upper);
        return [upper, ...filtered].slice(0, 5);
      });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/market/stock?symbol=${encodeURIComponent(sym)}&period=${period}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Fetch failed");

      const fetchedBars = json.bars ?? [];
      const fetchedName = json.name ?? sym;
      const fetchedSource = json.source ?? "";

      setBars(fetchedBars);
      setName(fetchedName);
      setSource(fetchedSource);

      setRecentSymbols((prev) => {
        const upper = sym.toUpperCase();
        const filtered = prev.filter((s) => s !== upper);
        return [upper, ...filtered].slice(0, 5);
      });

      // Update local cache
      stockCache.current[cacheKey] = { bars: fetchedBars, name: fetchedName, source: fetchedSource };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setBars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStock(symbol, range);
  }, [symbol, range, loadStock]);

  useEffect(() => {
    fetch("/api/market/macro")
      .then((r) => r.json())
      .then((j) => setMacro(j.items ?? []))
      .catch(() => setMacro([]));
  }, []);

  const lastBar = bars.length > 0 ? bars[bars.length - 1] : null;
  
  const rangeLabels: Record<string, string> = {
    "3mo": "Three-month",
    "6mo": "Six-month",
    "1y": "One-year"
  };

  return (
    <div className="space-y-8">
      {/* Market Banner Section */}
      <div className="container-cqc">
        <p className="mt-2 text-lg leading-relaxed text-slate-700">
          In a market economy, prices and market data provide one of the most transparent measures of how participants assess value. While market signals are not perfect and often require deeper analysis, they remain an important source for understanding economic activity, expectations, and long-term development.
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Main Stock Chart Window */}
        <div className="card flex-[2.5] w-full">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex items-end gap-2">
              <label className="label-muted" htmlFor="symbol-search">
                Search U.S. Ticker
              </label>
              <input
                id="market-ticker-input"
                name="market-ticker-search-no-autofill"
                list="recent-tickers"
                type="text"
                autoComplete="off"
                placeholder="e.g. AAPL"
                className="mt-1 block w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-accent"
                value={searchInput}
                onFocus={() => setSearchInput("")}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setSymbol(searchInput.toUpperCase())}
              />
              <datalist id="recent-tickers">
                {recentSymbols.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </datalist>
            </div>
              <button
                onClick={() => setSymbol(searchInput.toUpperCase())}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition-colors h-[38px]"
              >
                Search
              </button>
            </div>
            
            <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-serif text-xl font-semibold">
                  {error ? (
                    <span className="text-red-600">Ticker "{symbol}" not found</span>
                  ) : (
                    name || symbol
                  )}
                </p>
                <p className="text-xs text-mist">{rangeLabels[range]} daily bars</p>
              </div>
              {!error && lastBar && (
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-mist font-bold">{lastBar.date}</p>
                  <div className="flex gap-3 text-sm">
                    <span><span className="text-mist mr-1">Prev. Open:</span><span className="font-mono font-semibold">${lastBar.open.toFixed(2)}</span></span>
                    <span><span className="text-mist mr-1">Close:</span><span className="font-mono font-semibold">${lastBar.close.toFixed(2)}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {[
                { label: "3M", value: "3mo" },
                { label: "6M", value: "6mo" },
                { label: "1Y", value: "1y" },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRange(r.value)}
                  className={`px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${
                    range === r.value 
                      ? "bg-white text-accent shadow-sm" 
                      : "text-mist hover:text-ink"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {loading && <p className="mt-4 text-xs text-mist">Loading data…</p>}
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-xs text-red-800">
              {error}
            </p>
          )}
          {!loading && !error && bars.length > 0 && (
            <div className="mt-1">
              <StockChart bars={bars} />
            </div>
          )}
          {source && (
            <p className="mt-3 text-[10px] text-mist italic">Source: {source}</p>
          )}
        </div>

        {/* Right: Concise Combined Macro Index Window */}
        <div className="card flex-1 min-w-[280px] w-full lg:w-auto self-stretch">
          <h2 className="font-serif text-lg font-semibold mb-1">Macro Overview</h2>
          <p className="text-[10px] text-mist mb-3 border-b pb-2 border-slate-100">Market Index Proxies</p>
          <div className="divide-y divide-slate-100/50">
            {macro.map((m) => (
              <div key={m.id} className="flex justify-between items-center py-1">
                <div className="flex-1 pr-3">
                  <p className="text-xs font-semibold text-ink leading-tight truncate" title={m.label}>{m.label}</p>
                  <p className="text-[9px] text-mist font-mono uppercase tracking-tighter">{m.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono font-bold text-ink">
                    {m.price != null ? m.price.toFixed(2) : "—"}
                  </p>
                  {m.changePct != null && (
                    <p
                      className={`text-[10px] font-medium leading-none mt-0.5 ${
                        m.changePct >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {m.changePct >= 0 ? "+" : ""}
                      {m.changePct.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[9px] text-mist leading-relaxed italic border-t border-slate-100 pt-2">
            Source: Yahoo Finance. Using public proxies. Transition to FRED for official series.
          </p>
        </div>
      </div>
    </div>
  );
}
