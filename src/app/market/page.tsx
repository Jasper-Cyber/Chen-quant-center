import MarketDashboard from '@/components/MarketDashboard';

export const metadata = {
  title: 'Market - Chen Quant Center',
  description: 'Stock market dashboards with charts and technical indicators',
};

export default function MarketPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Market Dashboard</h1>
        <p className="text-gray-400">Real-time market data visualization and analysis</p>
      </div>
      <MarketDashboard />
    </div>
  );
}
