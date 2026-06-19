import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml?: string;
  href?: string;
};

const articlesDirectory = path.join(process.cwd(), 'src', 'content', 'articles');

export function getSortedArticlesData(): Article[] {
  // Get file names under /src/content/articles
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      href: `/research/${slug}`, // Generate href based on slug
    } as Article;
  });

  // Sort posts by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getArticleData(slug: string): Promise<Article> {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(articlesDirectory, `${decodedSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title ?? 'Untitled Article',
    date: matterResult.data.date ?? new Date().toISOString().split('T')[0],
    excerpt: matterResult.data.excerpt ?? '',
    contentHtml, // Now contains HTML string
    href: `/research/${slug}`,
  } as Article;
}

export function getAllArticleSlugs() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}