import { NextRequest, NextResponse } from "next/server";
import { getStockDataWithFallback } from "@/lib/yahoo-finance";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") ?? "SPY").toUpperCase();
  const period = request.nextUrl.searchParams.get("period") ?? "1y";

  try {
    const data = await getStockDataWithFallback(symbol, period);

    return NextResponse.json({
      symbol,
      name: data.name || symbol,
      bars: data.bars,
      source: data.source,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, symbol }, { status: 502 });
  }
}
