import Link from 'next/link';

export default function Header() {
  const navItems = [
    { href: '/research', label: 'Research' },
    { href: '/market', label: 'Market' },
    { href: '/quantlab', label: 'Quant Lab' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <header className="bg-secondary border-b border-gray-700 sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-bold">CQC</span>
            </div>
            <span className="hidden sm:inline font-bold text-xl">Chen Quant Center</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}