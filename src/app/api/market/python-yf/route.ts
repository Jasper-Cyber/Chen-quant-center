import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  
  try {
    // Path to your python script in the root scripts folder
    const scriptPath = path.join(process.cwd(), "scripts", "fetch_yf.py");
    
    // Execute the python script and capture stdout
    // We remove 2>&1 so that stderr (logs) does not mix with stdout (JSON data)
    const output = execSync(`python "${scriptPath}" ${symbol}`, {
      encoding: "utf-8",
      timeout: 30000, // 30 second timeout for the data download
    });

    const data = JSON.parse(output);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({
      ...data,
      source: "Python (yfinance) via Bridge",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}