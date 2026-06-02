import ResearchList from '@/components/ResearchList';

export const metadata = {
  title: 'Research - Chen Quant Center',
  description: 'Investment research articles and market commentary',
};

export default function ResearchPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Investment Research</h1>
        <p className="text-gray-400">In-depth analysis and market commentary</p>
      </div>
      <ResearchList />
    </div>
  );
}
