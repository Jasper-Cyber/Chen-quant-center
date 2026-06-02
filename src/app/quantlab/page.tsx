import QuantLabTools from '@/components/QuantLabTools';

export const metadata = {
  title: 'Quant Lab - Chen Quant Center',
  description: 'Quantitative finance tools: SMA, RSI, portfolio analytics, factor analysis',
};

export default function QuantLabPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quant Lab</h1>
        <p className="text-gray-400">Advanced quantitative finance tools and analysis</p>
      </div>
      <QuantLabTools />
    </div>
  );
}
