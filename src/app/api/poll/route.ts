import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

type PollId = "us-market-view" | "industry" | "country";

type PollStore = Record<PollId, Record<string, number>>;

const DATA_DIR = path.join(process.cwd(), "data");

function getDataFile(quarter: string) {
  // Validate quarter format to prevent path traversal
  if (!/^\d{4}Q[1-4]$/.test(quarter)) {
    throw new Error("Invalid quarter format");
  }
  return path.join(DATA_DIR, `polls-${quarter}.json`);
}
 
const emptyStore = (): PollStore => ({
  "us-market-view": {},
  industry: {},
  country: {},
});

async function readStore(quarter: string): Promise<PollStore> {
  try {
    const dataFile = getDataFile(quarter);
    const raw = await fs.readFile(dataFile, "utf-8");
    return { ...emptyStore(), ...JSON.parse(raw) };
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: PollStore, quarter: string) {
  const dataFile = getDataFile(quarter);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(store, null, 2), "utf-8");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const quarter = searchParams.get("quarter");

    if (!quarter) {
      return NextResponse.json({ error: "Quarter is required" }, { status: 400 });
    }

    const store = await readStore(quarter);
    return NextResponse.json({ polls: store });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read poll data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pollId = body.pollId as PollId;
    const quarter = body.quarter as string;
    const choice = String(body.choice ?? "").trim().slice(0, 80);

    if (!pollId || !choice || !(pollId in emptyStore())) {
      return NextResponse.json({ error: "Invalid poll submission" }, { status: 400 });
    }

    if (!quarter) {
      return NextResponse.json({ error: "Quarter is required" }, { status: 400 });
    }

    const store = await readStore(quarter);
    store[pollId][choice] = (store[pollId][choice] ?? 0) + 1;
    await writeStore(store, quarter);

    return NextResponse.json({ ok: true, polls: store });
  } catch (error) {
    return NextResponse.json({ error: "Poll save failed" }, { status: 500 });
  }
}
