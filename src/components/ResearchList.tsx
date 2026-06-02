export default function ResearchList() {
  const articles = [
    {
      id: 1,
      title: 'Technical Analysis in Modern Markets',
      date: '2024-01-15',
      category: 'Technical Analysis',
      excerpt: 'Exploring the effectiveness of technical indicators in current market conditions.',
    },
    {
      id: 2,
      title: 'Macroeconomic Trends and Market Impact',
      date: '2024-01-10',
      category: 'Macroeconomics',
      excerpt: 'How global economic factors influence market movements and investment strategies.',
    },
    {
      id: 3,
      title: 'Factor Analysis Deep Dive',
      date: '2024-01-05',
      category: 'Quantitative',
      excerpt: 'Understanding multi-factor models and their role in portfolio construction.',
    },
  ];

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <span className="text-accent text-sm mt-2 md:mt-0">{article.date}</span>
          </div>
          <p className="text-gray-400 mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-primary px-3 py-1 rounded text-accent">{article.category}</span>
            <a href="#" className="text-accent hover:text-blue-400">Read More →</a>
          </div>
        </div>
      ))}
    </div>
  );
}
