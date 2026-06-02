'use client';

export default function MarketDashboard() {
  const marketData = [
    { symbol: 'SPY', price: 462.85, change: 1.25, changePercent: 0.27 },
    { symbol: 'QQQ', price: 385.42, change: -0.85, changePercent: -0.22 },
    { symbol: 'IWM', price: 195.63, change: 2.15, changePercent: 1.11 },
    { symbol: 'GLD', price: 195.50, change: 3.20, changePercent: 1.66 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketData.map((data) => (
          <div key={data.symbol} className="bg-secondary p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{data.symbol}</h3>
              <span className={`text-lg font-semibold ${data.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {data.change > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">${data.price.toFixed(2)}</p>
            <div className="h-32 bg-primary rounded flex items-center justify-center text-gray-500">
              [Chart would display here]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
