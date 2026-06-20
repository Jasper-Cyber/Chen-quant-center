import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-cqc py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-mist">{site.slogan}</p>
            <p className="mt-3 max-w-md text-xs text-mist">
              Personal research views. Public, official data with clearly denoted sources.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/research" className="text-mist hover:text-accent">
              Research
            </Link>
            <Link href="/market" className="text-mist hover:text-accent">
              Market Data
            </Link>
            <Link href="/quant-lab" className="text-mist hover:text-accent">
              Quant Lab
            </Link>
            <Link href="/about" className="text-mist hover:text-accent">
              About
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-mist">
          © 2026 Jia Chen. Published through Chen Quant Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
