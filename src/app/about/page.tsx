import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "About" };
const socialLinks = [
  { name: "Substack", href: site.social.substack },
  { name: "LinkedIn", href: site.social.linkedin },
  { name: "GitHub", href: site.social.github },
  { name: "WeChat", href: site.social.wechat },
];

export default function AboutPage() {
  return (
    <div className="container-cqc py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Main content */}
        <div className="lg:col-span-2 card">
          <div className="prose prose-slate max-w-none">
            <h1>About the Creator</h1>
            <p>
              Hi, my name is Jia Chen, and I am the creator of Chen Quant Center.
            </p>
            <p>
              My professional background spans industrial services, laboratory equipment, international trade, project management, and quantitative finance. Through these experiences, I became increasingly interested in a fundamental question:
            </p>
            <blockquote>
              How is real value created, and how can we identify it systematically?
            </blockquote>
            <p>
              Many discussions about investing focus on market movements, economic forecasts, or emerging technologies. While these topics are important, I believe that long-term value is often created much deeper inside production systems, engineering processes, supply chains, and organizational coordination.
            </p>
            <p>
              Chen Quant Center was created as a platform to explore the intersection of:
            </p>
            <ul>
              <li>Technology and productivity</li>
              <li>Industrial systems and supply chains</li>
              <li>Capital allocation and financial markets</li>
              <li>Quantitative analysis and data-driven research</li>
            </ul>
            <p>
              The goal is not to predict short-term market movements, but to better understand the mechanisms through which businesses create value and how those mechanisms influence long-term investment outcomes.
            </p>
            <p>
              I am currently pursuing a Master of Science in Software Development at Boston University and continue to study quantitative methods, data modeling, and financial markets. This website serves as a place to share research, develop analytical tools, and document an ongoing learning journey across technology, industry, and investing.
            </p>
            <p>
              Thank you for visiting Chen Quant Center. I hope the ideas, research, and tools shared here contribute to a deeper understanding of value creation in an increasingly complex world.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="card lg:sticky top-24">
          <h2 className="font-serif text-xl font-semibold">Contact</h2>
          <div className="mt-4 flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="btn-secondary text-center">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
