import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-primary py-20 md:py-32">
      <div className="container-max">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Quantitative Research & Market Analytics
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Professional investment research, advanced quantitative tools, and market intelligence for sophisticated investors and fund managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/market"
              className="bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
            >
              Explore Market Dashboard
            </Link>
            <Link
              href="/research"
              className="border border-accent text-accent hover:bg-accent hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
            >
              Read Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
