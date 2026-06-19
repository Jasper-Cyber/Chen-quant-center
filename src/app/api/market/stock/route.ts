import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = (request.nextUrl.searchParams.get("symbol") ?? "SPY").toUpperCase();
  const period = request.nextUrl.searchParams.get("period") ?? "1y";

  try {
    // Path to your python script in the root scripts folder
    const scriptPath = path.join(process.cwd(), "scripts", "fetch_yf.py");
    
    // Execute the python script and capture stdout
    const output = execSync(`python "${scriptPath}" "${symbol}" "${period}"`, {
      encoding: "utf-8",
      timeout: 30000,
    });

    const data = JSON.parse(output);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({
      symbol,
      name: data.name || symbol,
      bars: data.bars,
      source: "Yahoo Finance",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Python bridge execution failed";
    return NextResponse.json({ error: message, symbol }, { status: 502 });
  }
}
