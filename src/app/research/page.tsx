import Link from "next/link";
import { site } from "@/lib/site";
import { getSortedArticlesData } from "@/lib/articles"; // Import getSortedArticlesData

export const metadata = { title: "Research and Insights" };

const channels = [
  { name: "Substack", href: site.social.substack, note: "Long-form notes and memos" },
  { name: "LinkedIn", href: site.social.linkedin, note: "Professional posts and commentary" },
  { name: "WeChat Public Account", href: site.social.wechat, note: "Regional audience updates" },
];

export default function ResearchPage() {
  const articles = getSortedArticlesData(); // Fetch articles directly in this server component

  return (
    <div className="container-cqc py-14 md:py-20">
      <p className="mt-2 text-lg leading-relaxed text-slate-700">
        Independent analysis and personal insights focused on value creation, innovation, productivity, technology and financial markets.
      </p>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold">Channels</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="card block hover:border-accent"
            >
              <h3 className="font-semibold text-ink">{c.name}</h3>
              <p className="mt-2 text-sm text-mist">{c.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-xl font-semibold">Articles</h2>
        <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {articles.map((a) => (
            <li key={a.slug} className="p-6">
              <time className="label-muted">{a.date}</time>
              <h3 className="mt-1 font-serif text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-mist">{a.excerpt}</p>
              <Link href={a.href ?? `/research/${a.slug}`} className="mt-3 inline-block text-sm font-semibold text-accent">
                Read →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
