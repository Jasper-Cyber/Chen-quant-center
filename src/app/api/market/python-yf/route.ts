import { NextRequest, NextResponse } from "next/server";
import { getStockDataWithFallback } from "@/lib/yahoo-finance";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  
  try {
    const data = await getStockDataWithFallback(symbol, "1y");

    return NextResponse.json({
      ...data,
      source: data.source,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}