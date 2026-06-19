import Link from "next/link";
import { briefText, pillarCards, site } from "@/lib/site";
import { getSortedArticlesData } from "@/lib/articles"; // Import getSortedArticlesData

export default function HomePage() {
  const articles = getSortedArticlesData(); // Fetch articles directly in this server component
  const recent = articles.slice(0, 3); // Slice for recent articles

  return (
    <>
      <section className="bg-white">
        <div className="container-cqc py-8 md:py-12">
          <p className="label-muted">{site.focus}</p>
          <Link href="/" className="inline-block group">
            <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl group-hover:text-accent transition-colors">
              {site.name} ({site.shortName})
            </h1>
          </Link>
          <p className="mt-2 text-xl font-medium text-gold">{site.slogan}</p>
        </div>
      </section>

      {/* Decoration line: Blue-grey gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <section className="container-cqc pt-10 pb-8 md:pt-16 md:pb-12">
        
        <p className="mt-2 text-lg leading-relaxed text-slate-700">
          {briefText}
        </p>
      </section>

      <section className="bg-slate-50 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="container-cqc">
          <h2 className="section-title">Insights · Markets · Analytics</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillarCards.map((p) => (
              <Link key={p.href} href={p.href} className="card group flex flex-col justify-between min-h-[460px] h-[480px] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 ease-out bg-white p-6">
                <div>
                  <span className="label-muted">Section {p.num}</span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-ink group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                </div>
                
                <div className="my-4 relative w-full h-[180px] rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div>
                  <p className="text-sm leading-relaxed text-mist">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent gap-1 group-hover:underline">
                    Open section <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-cqc py-14 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="section-title">Recent insights</h2>
          <Link href="/research" className="text-sm font-semibold text-accent">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {recent.map((a) => (
            <article key={a.slug} className="card">
              <time className="label-muted">{a.date}</time>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-mist">{a.excerpt}</p>
              <Link
                href={a.href ?? "/research"}
                className="mt-4 inline-block text-sm font-semibold text-accent"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
