export default function CommunityFeed() {
  const posts = [
    {
      id: 1,
      author: 'Market Analyst',
      sentiment: 'Bullish',
      forecast: 'S&P 500 expected to reach 470 by Q1 2024',
      votes: 234,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      author: 'Quant Researcher',
      sentiment: 'Neutral',
      forecast: 'Tech sector showing mixed signals on momentum indicators',
      votes: 156,
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      author: 'Risk Manager',
      sentiment: 'Bearish',
      forecast: 'Volatility likely to spike given Fed policy signals',
      votes: 89,
      timestamp: '1 day ago',
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish':
        return 'bg-success/20 text-success border-success/50';
      case 'Bearish':
        return 'bg-danger/20 text-danger border-danger/50';
      default:
        return 'bg-warning/20 text-warning border-warning/50';
    }
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-lg">{post.author}</h4>
              <p className="text-sm text-gray-400">{post.timestamp}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getSentimentColor(post.sentiment)}`}>
              {post.sentiment}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{post.forecast}</p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-accent">
              <span>👍</span>
              <span>{post.votes}</span>
            </button>
            <button className="text-gray-400 hover:text-accent">💬 Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
}
