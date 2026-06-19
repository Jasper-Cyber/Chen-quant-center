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
              <Link key={p.href} href={p.href} className="card group block">
                <span className="label-muted">Section {p.num}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold text-ink group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {p.description}
                </p>
                <span className="mt-6 inline-block text-sm font-semibold text-accent">
                  Open section →
                </span>
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
