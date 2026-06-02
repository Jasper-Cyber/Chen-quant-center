import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-gray-700 mt-16">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Chen Quant Center</h3>
            <p className="text-gray-400 text-sm">Quantitative research and market analytics platform.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/research" className="hover:text-accent">Research</Link></li>
              <li><Link href="/market" className="hover:text-accent">Market</Link></li>
              <li><Link href="/quantlab" className="hover:text-accent">Quant Lab</Link></li>
              <li><Link href="/community" className="hover:text-accent">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent">Documentation</a></li>
              <li><a href="#" className="hover:text-accent">API Reference</a></li>
              <li><a href="#" className="hover:text-accent">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent">GitHub</a></li>
              <li><a href="#" className="hover:text-accent">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Chen Quant Center. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
