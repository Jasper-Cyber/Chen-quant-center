import { getArticleData, getAllArticleSlugs } from "@/lib/articles";
import { notFound } from "next/navigation";

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
        <h1>{article.title}</h1>
        <p className="lead !mt-2 !mb-8 text-mist">{article.excerpt}</p>
        <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: article.contentHtml || "" }}
        />
      </article>
    </div>
  );
}
