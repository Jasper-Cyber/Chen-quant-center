import Link from "next/link";
import { getCompanyResearchArticles } from "@/lib/articles";

export const metadata = {
  title: "Company Research",
  description: "Independent company research from Chen Quant Center: financial performance, industry analysis, scenario valuation, and investment risks.",
};

export default function CompanyResearchPage() {
  const reports = getCompanyResearchArticles();

  return (
    <div className="container-cqc py-14 md:py-20">
      <Link href="/research" className="text-sm font-semibold text-accent hover:underline">
        ← Research &amp; Insights
      </Link>
      <p className="label-muted mt-8">Independent equity research</p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-ink md:text-4xl">
        Company Research
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
        Evidence-based company reports exploring financial performance, competitive
        positioning, valuation scenarios, and investment risks. Reports may use
        AI-assisted commentary, but the analysis and source figures require editorial review.
      </p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
        I plan to select a different publicly traded company each week and publish a
        new research report here, with a focus on its business fundamentals,
        valuation, and key risks.
      </p>

      <section className="mt-12" aria-labelledby="reports-heading">
        <h2 id="reports-heading" className="font-serif text-xl font-semibold">
          Published reports
        </h2>
        {reports.length > 0 ? (
          <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {reports.map((report) => (
              <li key={report.slug} className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <time className="label-muted">{report.date}</time>
                  {report.ticker && (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-accent">
                      {report.ticker}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                  <Link href={report.href ?? `/research/${report.slug}`} className="hover:text-accent">
                    {report.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{report.excerpt}</p>
                <Link
                  href={report.href ?? `/research/${report.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-accent"
                >
                  Read report →
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8">
            <p className="font-semibold text-ink">The company research archive is being prepared.</p>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              The first report will appear here after its data, assumptions, and AI-assisted
              interpretations have been reviewed.
            </p>
            <Link href="/research" className="mt-4 inline-block text-sm font-semibold text-accent">
              Browse existing research →
            </Link>
          </div>
        )}
      </section>

      <section className="mt-14 rounded-xl bg-slate-50 p-6">
        <h2 className="font-serif text-xl font-semibold">Research principles</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Company research distinguishes sourced financial facts, calculated metrics,
          assumptions, and AI-assisted commentary. Scenario valuations are illustrative,
          not guarantees. Reports reflect their stated data cutoff and may become outdated.
        </p>
        <p className="mt-3 text-xs text-mist">
          General educational research only; not personalized investment advice.
        </p>
      </section>
    </div>
  );
}
