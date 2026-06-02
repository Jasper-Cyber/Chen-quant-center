export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Market Dashboard',
      description: 'Real-time price charts, historical data, and technical indicators for comprehensive market analysis.',
    },
    {
      icon: '📈',
      title: 'Quantitative Tools',
      description: 'SMA, RSI, portfolio analytics, and factor analysis for data-driven investment decisions.',
    },
    {
      icon: '📝',
      title: 'Research Articles',
      description: 'In-depth investment research and macroeconomic analysis from quantitative experts.',
    },
    {
      icon: '👥',
      title: 'Community Forecasting',
      description: 'Collaborative market sentiment analysis and community-driven forecasting insights.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-max">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-400 text-lg">Everything you need for professional quantitative investing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
