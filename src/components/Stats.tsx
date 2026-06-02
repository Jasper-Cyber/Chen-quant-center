export default function Stats() {
  const stats = [
    { number: '500+', label: 'Research Articles' },
    { number: '1M+', label: 'Data Points' },
    { number: '50+', label: 'Market Indicators' },
    { number: '24/7', label: 'Market Updates' },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
