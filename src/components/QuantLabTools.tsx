export default function QuantLabTools() {
  const tools = [
    {
      name: 'Simple Moving Average (SMA)',
      description: 'Calculate and visualize SMA for trend identification',
      icon: '📊',
    },
    {
      name: 'Relative Strength Index (RSI)',
      description: 'Identify overbought and oversold conditions',
      icon: '📈',
    },
    {
      name: 'Portfolio Analytics',
      description: 'Analyze portfolio performance and risk metrics',
      icon: '💼',
    },
    {
      name: 'Factor Analysis',
      description: 'Understand factor exposures and contributions',
      icon: '🔍',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool, index) => (
        <div key={index} className="bg-secondary p-8 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="text-5xl mb-4">{tool.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
          <p className="text-gray-400 mb-4">{tool.description}</p>
          <button className="bg-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors">
            Launch Tool
          </button>
        </div>
      ))}
    </div>
  );
}
