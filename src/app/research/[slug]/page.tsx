import { getArticleData, getAllArticleSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleData(slug);
  } catch (error) {
    console.error(`Failed to load article with slug: ${slug}`, error);
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="container-cqc py-14 md:py-20">
      <article className="prose prose-slate mx-auto max-w-3xl lg:prose-lg">
        {article.category === "Company Research" && (
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm not-prose">
            <Link href="/research/company-research" className="font-semibold text-accent hover:underline">
              Company Research
            </Link>
            {article.ticker && <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-accent">{article.ticker}</span>}
            <time className="text-mist">{article.date}</time>
          </div>
        )}
        <h1>{article.title}</h1>
        <p className="lead !mt-2 !mb-8 text-mist">{article.excerpt}</p>
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: article.contentHtml || "" }}
        />
        {article.category === "Company Research" && (
          <aside className="not-prose mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-mist">
            <p className="font-semibold text-ink">Research disclosure</p>
            <p className="mt-2">
              This independent report is for general research and education, not personalized
              investment advice. Financial data, assumptions, and scenarios are time-sensitive.
              AI-assisted text, where used, should be distinguished from sourced figures and
              reviewed before publication.
            </p>
          </aside>
        )}
      </article>
    </div>
  );
}
