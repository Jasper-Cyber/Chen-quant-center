import CommunityFeed from '@/components/CommunityFeed';

export const metadata = {
  title: 'Community - Chen Quant Center',
  description: 'Market sentiment and community forecasting',
};

export default function CommunityPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community</h1>
        <p className="text-gray-400">Market sentiment and collaborative forecasting</p>
      </div>
      <CommunityFeed />
    </div>
  );
}
