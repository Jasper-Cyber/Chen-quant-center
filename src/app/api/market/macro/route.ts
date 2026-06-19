import { NextResponse } from "next/server";
import { getStockDataWithFallback } from "@/lib/yahoo-finance";

export const dynamic = "force-dynamic";

/** Macro proxies using Python yfinance bridge for reliability */
const MACRO_TICKERS = [
  { id: "us-10y", label: "10-Year Treasury Yield", symbol: "^TNX" },
  { id: "us-5y", label: "5-Year Treasury Yield", symbol: "^FVX" },
  { id: "us-bill", label: "13-Week T-Bill", symbol: "^IRX" },
  { id: "cpi", label: "CPI / inflation sensitivity (TIP)", symbol: "TIP" },
  { id: "ppi", label: "PPI / industrial inputs proxy (XLB)", symbol: "XLB" },
  { id: "supply-chain", label: "Global supply chain index proxy (SEA)", symbol: "SEA" },
  { id: "industrial", label: "Industrial production proxy (XLI)", symbol: "XLI" },
];

export async function GET() {
  const allSymbols = MACRO_TICKERS.map(m => m.symbol).join(",");

  try {
    const batchData = await getStockDataWithFallback(allSymbols, "5d") as any;
    
    const snapshots = MACRO_TICKERS.map((item) => {
      const data = batchData[item.symbol];
      const bars = data?.bars || [];

      if (bars.length === 0) {
        return { ...item, price: null, changePct: null, asOf: null };
      }

      const lastBar = bars[bars.length - 1];
      const prevBar = bars.length > 1 ? bars[bars.length - 2] : null;
      const price = lastBar.close;
      let changePct = null;

      if (prevBar && prevBar.close !== 0) {
        changePct = ((price - prevBar.close) / prevBar.close) * 100;
      }

      return {
        ...item,
        price,
        changePct,
        asOf: lastBar.date,
      };
    });

    return NextResponse.json({
      items: snapshots,
      source: "Yahoo Finance",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Macro fetch failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
