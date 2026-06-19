"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import StockChart, { ChartBlock } from "@/components/StockChart";
import PollWidget from "@/components/PollWidget";
import { backtestCases, site } from "@/lib/site";
import {
  archVolatilitySeries,
  blackScholesCall,
  historicalCvar,
  historicalVar,
  rollingHistoricalRisk,
  rollingStandardDeviation,
  type OhlcBar,
} from "@/lib/quant";

export default function QuantLabClient() {
  const [bars, setBars] = useState<OhlcBar[]>([]);
  const [symbol, setSymbol] = useState("AAPL");
  const [searchInput, setSearchInput] = useState("");
  const [range, setRange] = useState("3mo");
  const [recentSymbols, setRecentSymbols] = useState<string[]>(["AAPL"]);

  const localCache = useRef<Record<string, { bars: OhlcBar[]; name: string }>>({});
  const [riskBars, setRiskBars] = useState<OhlcBar[]>([]);
  const [name, setName] = useState("");
  // const [bs, setBs] = useState({ S: 100, K: 100, T: 1, r: 0.05, sigma: 0.2 });

  const returns = useMemo(() => {
    if (bars.length < 2) return [];
    const r: number[] = [];
    for (let i = 1; i < bars.length; i++) {
      r.push(Math.log(bars[i].close / bars[i - 1].close));
    }
    return r;
  }, [bars]);

  const riskReturns = useMemo(() => {
    if (riskBars.length < 2) return [];
    const r: number[] = [];
    for (let i = 1; i < riskBars.length; i++) {
      r.push(Math.log(riskBars[i].close / riskBars[i - 1].close));
    }
    return r;
  }, [riskBars]);

  // Rolling 90-day volatility (annualized)
  const rollingVol = useMemo(() => {
    if (riskReturns.length < 90) return [];
    const dailyVol = rollingStandardDeviation(riskReturns, 90);
    // Annualize daily volatility: multiply by sqrt(252) for trading days
    return dailyVol.map(vol => vol != null ? vol * Math.sqrt(252) : null);
  }, [riskReturns]);
  const latestVolatility = useMemo(() =>
    rollingVol.filter((v): v is number => v != null).slice(-1)[0] ?? null,
  [rollingVol]);
  const latestPrice = riskBars.length > 0 ? riskBars[riskBars.length - 1].close : 0;
  const cvar = useMemo(() => historicalCvar(riskReturns, 0.05), [riskReturns]);
  const var95 = useMemo(() => historicalVar(riskReturns, 0.05), [riskReturns]);
  const archSeries = useMemo(() => archVolatilitySeries(riskReturns), [riskReturns]);
  const latestArch = useMemo(() =>
    archSeries.filter((v): v is number => v != null).slice(-1)[0] ?? null,
  [archSeries]);
  
  // const callPrice = blackScholesCall(bs.S, bs.K, bs.T, bs.r, bs.sigma);

  const riskMetrics = useMemo(() => {
    if (riskReturns.length < 90) return { varSeries: [], cvarSeries: [] };
    const { varOut, cvarOut } = rollingHistoricalRisk(riskReturns, 90, 0.05);
    return { varSeries: varOut, cvarSeries: cvarOut };
  }, [riskReturns]);

  const riskChartData = useMemo(() => {
    return riskMetrics.varSeries.map((v, i) => {
      if (v === null || riskMetrics.cvarSeries[i] === null) return null;
      return {
        date: riskBars[i + 1].date,
        var: v * riskBars[i + 1].close,
        cvar: riskMetrics.cvarSeries[i]! * 100,
      };
    }).filter((item): item is { date: string; var: number; cvar: number } => item !== null);
  }, [riskBars, riskMetrics]);

  const volatilityChartData = useMemo(() => {
    return rollingVol.map((v, i) => {
      if (v === null) return null;
      return {
        date: riskBars[i + 1].date,
        volatility: v * 100,
      };
    }).filter((item): item is { date: string; volatility: number } => item !== null);
  }, [riskBars, rollingVol]);

  async function loadDemo() {
    const sym = (searchInput || symbol).toUpperCase();
    setSymbol(sym);

    if (localCache.current[sym]) {
      const cached = localCache.current[sym];
      setRiskBars(cached.bars);
      
      // Slice bars based on default range (3mo ~ 63 trading days)
      let sliceCount = 63;
      if (range === "6mo") sliceCount = 126;
      if (range === "1y") sliceCount = 252;
      
      setBars(
        range === "1y" ? cached.bars : cached.bars.slice(-sliceCount)
      );

      setName(cached.name);
      setRecentSymbols((prev) => {
        const filtered = prev.filter((s) => s !== sym);
        return [sym, ...filtered].slice(0, 5);
      });
      return;
    }

    // Fetch 1 year of data for accurate risk analysis
    const res = await fetch(`/api/market/stock?symbol=${sym}&period=1y`);
    const json = await res.json();
    if (res.ok) {
      const newBars = json.bars ?? [];
      const newName = json.name ?? sym;
      
      let sliceCount = 63;
      if (range === "6mo") sliceCount = 126;
      if (range === "1y") sliceCount = 252;

      setRiskBars(newBars);
      setBars(
        range === "1y" ? newBars : newBars.slice(-sliceCount)
      );
      setName(newName);
      localCache.current[sym] = { bars: newBars, name: newName };
      setRecentSymbols((prev) => {
        const filtered = prev.filter((s) => s !== sym);
        return [sym, ...filtered].slice(0, 5);
      });
    }
  }

  // Load the default chart automatically when the page is opened
  useEffect(() => {
    loadDemo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update display bars when range changes without re-fetching
  useEffect(() => {
    if (riskBars.length === 0) return;
    let sliceCount = 63;
    if (range === "6mo") sliceCount = 126;
    if (range === "1y") sliceCount = 252;
    
    setBars(range === "1y" ? riskBars : riskBars.slice(-sliceCount));
  }, [range, riskBars]);

  return (
    <div className="space-y-14">
      <div className="container-cqc">
        <p className="mt-2 text-lg leading-relaxed text-slate-700">
          Quant Lab provides educational implementations of quantitative finance and statistical tools, including technical indicators, volatility analysis, market sentiment measures, and valuation models.
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        <section className="card lg:col-span-2">
          <h2 className="font-serif text-xl font-semibold">Technical indicators</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              id="quant-lab-ticker-input"
              name="quant-ticker-search-no-autofill"
              list="quant-recent-tickers"
              type="text"
              autoComplete="off"
              placeholder="e.g. AAPL"
              className="block w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchInput}
              onFocus={() => setSearchInput("")}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadDemo()}
            />
            <datalist id="quant-recent-tickers">
              {recentSymbols.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </datalist>
            <button type="button" onClick={loadDemo} className="btn-primary">
              search
            </button>
          </div>

          <div className="mt-6 flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-fit">
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

          {bars.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 font-serif text-lg font-bold text-ink">{name || symbol}</p>
              <StockChart bars={bars} showIndicators />
              <p className="mt-4 text-[10px] text-mist italic">Source: Yahoo Finance</p>
            </div>
          )}
        </section>

        <section className="card self-stretch">
          <h2 className="font-serif text-xl font-semibold">Risk analysis</h2>
          {volatilityChartData.length > 0 ? (
            <div className="mt-4">
              <p className="mb-2 font-serif text-sm font-bold text-ink">{name || symbol}</p>
              <ChartBlock
                title="Rolling 90-Day Volatility"
                subtitle="Annualized Standard Deviation (%)"
                data={volatilityChartData}
                lines={["volatility"]}
                domain={["auto", "auto"]}
                unit="%"
              />
              <div className="mt-8 space-y-8">
                <ChartBlock
                  title="VaR (95%)"
                  subtitle="Estimated Daily Price Loss ($)"
                  data={riskChartData}
                  lines={["var"]}
                  domain={["auto", "auto"]}
                />
                <ChartBlock
                  title="CVaR (95%)"
                  subtitle="Expected Tail Loss (%)"
                  data={riskChartData}
                  lines={["cvar"]}
                  domain={["auto", "auto"]}
                  unit="%"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] text-mist font-bold">Last Day VaR (95%)</p>
                  <p className="text-xl font-serif font-bold text-ink">{var95 != null ? `$${(var95 * latestPrice).toFixed(2)}` : "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-mist font-bold">Last Day CVaR (95%)</p>
                  <p className="text-xl font-serif font-bold text-ink">{cvar != null ? `${(cvar * 100).toFixed(2)}%` : "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-mist font-bold">Last Day Volatility</p>
                  <p className="text-xl font-serif font-bold text-ink">{latestVolatility != null ? `${latestVolatility.toFixed(2)}%` : "—"}</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] text-mist italic">Source: Yahoo Finance</p>
              <p className="mt-6 text-[10px] text-mist leading-relaxed italic border-t border-slate-100 pt-2">
                <span className="font-bold">Risk Metrics Notice:</span> The risk metrics presented on this website are derived from historical market data and quantitative models. They are intended solely for educational and research purposes. Historical volatility, model outputs, and other risk measures do not constitute forecasts or guarantees of future market behavior and should not be interpreted as investment advice.
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-mist italic">Loading risk analytics...</p>
          )}
        </section>
      </div>

      <section>
        <h2 className="font-serif text-xl font-semibold">Market sentiment polls</h2>
        <div className="mt-6">
          <PollWidget />
        </div>
      </section>
    </div>
  );
}
