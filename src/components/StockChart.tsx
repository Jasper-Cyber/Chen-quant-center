"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OhlcBar } from "@/lib/quant";
import { macd, rsi, sma } from "@/lib/quant";

type Props = {
  bars: OhlcBar[];
  showIndicators?: boolean;
};

const CandlestickShape = (props: any) => {
  const { x, y, width, height, payload, yAxis } = props;
  if (!payload || x == null || y == null || height == null) return null;

  const { open, close, low, high } = payload;
  const isUp = close >= open;
  const color = isUp ? "#22c55e" : "#ef4444";
  const cx = x + width / 2;

  // Use the standard y and height for the body to ensure visibility
  const bodyTop = Math.min(y, y + height);
  const bodyHeight = Math.max(Math.abs(height), 1);

  let yHigh = bodyTop;
  let yLow = bodyTop + bodyHeight;

  // Attempt to use yAxis scale for accurate wick placement
  const scale = yAxis?.scale;
  if (typeof scale === "function") {
    yHigh = scale(high);
    yLow = scale(low);
  } else {
    // Fallback with protection against zero-height bodies (Dojis)
    const priceDiff = Math.abs(open - close);
    if (priceDiff > 0.0001) {
      const ratio = Math.abs(height) / priceDiff;
      yHigh = bodyTop - (high - Math.max(open, close)) * ratio;
      yLow = bodyTop + bodyHeight + (Math.min(open, close) - low) * ratio;
    }
  }

  return (
    <g>
      <line x1={cx} y1={yHigh} x2={cx} y2={yLow} stroke={color} strokeWidth={1} />
      <rect x={x} y={bodyTop} width={width} height={bodyHeight} fill={color} />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label, unit = "" }: any) => {
  if (active && payload && payload.length) {
    const ohlc = payload[0].payload;
    return (
      <div className="rounded-lg bg-white p-3 shadow-xl border border-slate-100 text-[11px] leading-tight min-w-[140px]">
        <div className="font-bold text-slate-800 mb-2 border-b pb-1">{label}</div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Close</span>
            <span className="font-mono font-bold text-slate-900">${ohlc.close?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Open</span>
            <span className="font-mono text-slate-700">${ohlc.open?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">High</span>
            <span className="font-mono text-green-600">${ohlc.high?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Low</span>
            <span className="font-mono text-red-600">${ohlc.low?.toFixed(2)}</span>
          </div>
          {payload.map((item: any) => {
            if (['body', 'wick'].includes(item.dataKey)) return null;
            return (
              <div key={item.dataKey} className="flex justify-between pt-1 mt-1 border-t border-slate-100">
                <span style={{ color: item.color }}>{item.name}</span>
                <span className="font-mono font-bold">{item.value?.toFixed(2)}{unit}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function StockChart({ bars, showIndicators = false }: Props) {
  const closes = bars.map((b) => b.close);
  const sma20 = sma(closes, 20);
  const rsi14 = rsi(closes, 14);
  const { macd: macdLine, signal } = macd(closes);

  // Calculate absolute price range boundaries
  const allPrices = bars.flatMap(b => [b.open, b.high, b.low, b.close].filter(v => v != null));
  const minStockPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxStockPrice = allPrices.length > 0 ? Math.max(...allPrices) : 100;

  const minBoundary = minStockPrice * 0.9;
  const maxBoundary = maxStockPrice * 1.1;
  const priceDomain: [number, number] = [minBoundary, maxBoundary];

  // Calculate custom unit length based on the (highest - lowest) value
  const diff = maxBoundary - minBoundary;
  let unit = 0;
  if (diff > 0) {
    const magnitude = Math.pow(10, Math.floor(Math.log10(diff)));
    const firstDigit = Math.floor(diff / magnitude);

    if (firstDigit > 2) {
      // Rule: Keep first 1 digit, set rest to zero, divide by 5
      unit = (firstDigit * magnitude) / 5;
    } else {
      // Rule: Keep first 2 digits, set rest to zero, divide by 5
      const magnitudeTwo = Math.pow(10, Math.floor(Math.log10(diff)) - 1);
      unit = (Math.floor(diff / magnitudeTwo) * magnitudeTwo) / 5;
    }
  }

  // Use only the first two digits of the lowest boundary to ensure "clean" tick values (zeros in lower digits)
  const minMag = minBoundary > 0 ? Math.pow(10, Math.floor(Math.log10(minBoundary)) - 1) : 1;
  const roundedMin = minBoundary > 0 ? Math.floor(minBoundary / minMag) * minMag : 0;

  // Generate custom ticks by adding the unit to the rounded base
  const customTicks = unit > 0 ? [1, 2, 3, 4, 5].map(i => roundedMin + i * unit) : [];

  const data = bars.map((b, i) => ({
    date: b.date,
    open: b.open,
    high: b.high,
    low: b.low,
    close: b.close,
    wick: [b.low, b.high],
    body: [b.open, b.close],
    sma20: sma20[i],
    rsi: rsi14[i],
    macd: macdLine[i],
    signal: signal[i],
  }));

  if (showIndicators) {
    return (
      <div className="space-y-8">
        <ChartBlock 
          title="Price & SMA(20)" 
          subtitle="Simple Moving Average"
          data={data} 
          lines={["sma20"]} 
          domain={priceDomain}
          ticks={customTicks}
          isCandle
          allowDecimals={true}
        />
        <ChartBlock 
          title="RSI(14)" 
          subtitle="Relative Strength Index" 
          data={data} 
          lines={["rsi"]} 
          domain={[0, 100]} 
          allowDecimals={true} 
        />
        <ChartBlock 
          title="MACD" 
          subtitle="Moving Average Convergence Divergence" 
          data={data} 
          lines={["macd", "signal"]} 
        />
      </div>
    );
  }

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={40} />
          <YAxis 
            domain={priceDomain}
            ticks={customTicks}
            tickFormatter={(val) => (typeof val === 'number' ? val.toFixed(2) : val)}
            tick={{ fontSize: 11 }}
            width={64}
            allowDecimals={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="left" />
          <Bar 
            dataKey="body" 
            name="Price" 
            shape={CandlestickShape}
            barSize={8}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ChartBlock({
  title,
  subtitle,
  data,
  lines,
  domain,
  ticks,
  isCandle = false,
  allowDecimals = true,
  unit = "",
}: {
  title: string;
  subtitle?: string;
  data: any[];
  lines: string[];
  domain?: [number, number];
  ticks?: number[];
  isCandle?: boolean;
  allowDecimals?: boolean;
  unit?: string;
}) {
  const displayNames: Record<string, string> = {
    sma20: "SMA(20)",
    rsi: "RSI",
    macd: "MACD",
    signal: "Signal",
    volatility: "Volatility",
    var: "VaR",
    cvar: "CVaR",
  };

  const colors: Record<string, string> = {
    close: "#0f172a",
    sma20: "#b45309",
    rsi: "#1d4ed8",
    macd: "#1d4ed8",
    signal: "#b45309",
    volatility: "#ef4444",
    var: "#f59e0b",
    cvar: "#dc2626",
  };

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-sm font-semibold text-mist">{title}</h3>
        {subtitle && <span className="text-[10px] text-mist opacity-70 italic">{subtitle}</span>}
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} minTickGap={50} />
            <YAxis
              domain={domain ?? ["auto", "auto"]}
              ticks={ticks}
              tickFormatter={(val) => (typeof val === 'number' ? `${val.toFixed(2)}${unit}` : val)}
              tick={{ fontSize: 11 }}
              width={56}
              allowDecimals={allowDecimals}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Legend verticalAlign="top" align="left" />
            {isCandle && (
              <Bar 
                dataKey="body" 
                name="Price" 
                shape={CandlestickShape}
                barSize={6}
              />
            )}
            {lines.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={displayNames[key] ?? key}
                stroke={colors[key] ?? "#64748b"}
                dot={false}
                connectNulls
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
