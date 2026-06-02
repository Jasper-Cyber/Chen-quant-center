#!/bin/bash

# Chen Quant Center - Bulk File Creation Script
# This script creates all project files in one operation

echo "🚀 Creating Chen Quant Center project structure..."

# Create directories
mkdir -p src/app/research
mkdir -p src/app/market
mkdir -p src/app/quantlab
mkdir -p src/app/community
mkdir -p src/components

echo "📁 Directories created"

# Create package.json
cat > package.json << 'EOF'
{
  "name": "chen-quant-center",
  "version": "1.0.0",
  "description": "Chen Quant Center - Quantitative Research and Market Analytics Platform",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next": "^14.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# Create next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
EOF

# Create tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#1E293B',
        accent: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# Create postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
.nyc_output
coverage

# Production
.next/
out/
build/
dist/

# Misc
.DS_Store
*.pem
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
Thumbs.db
.DS_Store
EOF

# Create .env.example
cat > .env.example << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database (future use)
# DATABASE_URL=

# Authentication (future use)
# NEXT_AUTH_SECRET=
EOF

# Create src/app/globals.css
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #0F172A;
  --secondary: #1E293B;
  --accent: #3B82F6;
  --success: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
}

body {
  @apply bg-primary text-white;
  font-family: 'Inter', sans-serif;
}

a {
  @apply text-accent hover:text-blue-400 transition-colors;
}

button {
  @apply transition-all duration-200;
}

.container-max {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
EOF

# Create src/app/layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Chen Quant Center - Quantitative Research & Market Analytics',
  description: 'Investment research, market data visualization, and quantitative factor analysis platform',
  keywords: 'quantitative finance, market analysis, investment research, quant trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary text-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
EOF

# Create src/app/page.tsx
cat > src/app/page.tsx << 'EOF'
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
    </>
  );
}
EOF

# Create src/app/research/page.tsx
cat > src/app/research/page.tsx << 'EOF'
import ResearchList from '@/components/ResearchList';

export const metadata = {
  title: 'Research - Chen Quant Center',
  description: 'Investment research articles and market commentary',
};

export default function ResearchPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Investment Research</h1>
        <p className="text-gray-400">In-depth analysis and market commentary</p>
      </div>
      <ResearchList />
    </div>
  );
}
EOF

# Create src/app/market/page.tsx
cat > src/app/market/page.tsx << 'EOF'
import MarketDashboard from '@/components/MarketDashboard';

export const metadata = {
  title: 'Market - Chen Quant Center',
  description: 'Stock market dashboards with charts and technical indicators',
};

export default function MarketPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Market Dashboard</h1>
        <p className="text-gray-400">Real-time market data visualization and analysis</p>
      </div>
      <MarketDashboard />
    </div>
  );
}
EOF

# Create src/app/quantlab/page.tsx
cat > src/app/quantlab/page.tsx << 'EOF'
import QuantLabTools from '@/components/QuantLabTools';

export const metadata = {
  title: 'Quant Lab - Chen Quant Center',
  description: 'Quantitative finance tools: SMA, RSI, portfolio analytics, factor analysis',
};

export default function QuantLabPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Quant Lab</h1>
        <p className="text-gray-400">Advanced quantitative finance tools and analysis</p>
      </div>
      <QuantLabTools />
    </div>
  );
}
EOF

# Create src/app/community/page.tsx
cat > src/app/community/page.tsx << 'EOF'
import CommunityFeed from '@/components/CommunityFeed';

export const metadata = {
  title: 'Community - Chen Quant Center',
  description: 'Market sentiment and community forecasting',
};

export default function CommunityPage() {
  return (
    <div className="container-max py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Community</h1>
        <p className="text-gray-400">Market sentiment and collaborative forecasting</p>
      </div>
      <CommunityFeed />
    </div>
  );
}
EOF

# Create src/components/Header.tsx
cat > src/components/Header.tsx << 'EOF'
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-accent py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
EOF

# Create src/components/Footer.tsx
cat > src/components/Footer.tsx << 'EOF'
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
EOF

# Create src/components/Hero.tsx
cat > src/components/Hero.tsx << 'EOF'
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-secondary to-primary py-20 md:py-32">
      <div className="container-max">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Quantitative Research & Market Analytics
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Professional investment research, advanced quantitative tools, and market intelligence for sophisticated investors and fund managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/market"
              className="bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
            >
              Explore Market Dashboard
            </Link>
            <Link
              href="/research"
              className="border border-accent text-accent hover:bg-accent hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block text-center"
            >
              Read Research
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

# Create src/components/Features.tsx
cat > src/components/Features.tsx << 'EOF'
export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Market Dashboard',
      description: 'Real-time price charts, historical data, and technical indicators for comprehensive market analysis.',
    },
    {
      icon: '📈',
      title: 'Quantitative Tools',
      description: 'SMA, RSI, portfolio analytics, and factor analysis for data-driven investment decisions.',
    },
    {
      icon: '📝',
      title: 'Research Articles',
      description: 'In-depth investment research and macroeconomic analysis from quantitative experts.',
    },
    {
      icon: '👥',
      title: 'Community Forecasting',
      description: 'Collaborative market sentiment analysis and community-driven forecasting insights.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-max">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-400 text-lg">Everything you need for professional quantitative investing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

# Create src/components/Stats.tsx
cat > src/components/Stats.tsx << 'EOF'
export default function Stats() {
  const stats = [
    { number: '500+', label: 'Research Articles' },
    { number: '1M+', label: 'Data Points' },
    { number: '50+', label: 'Market Indicators' },
    { number: '24/7', label: 'Market Updates' },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

# Create src/components/ResearchList.tsx
cat > src/components/ResearchList.tsx << 'EOF'
export default function ResearchList() {
  const articles = [
    {
      id: 1,
      title: 'Technical Analysis in Modern Markets',
      date: '2024-01-15',
      category: 'Technical Analysis',
      excerpt: 'Exploring the effectiveness of technical indicators in current market conditions.',
    },
    {
      id: 2,
      title: 'Macroeconomic Trends and Market Impact',
      date: '2024-01-10',
      category: 'Macroeconomics',
      excerpt: 'How global economic factors influence market movements and investment strategies.',
    },
    {
      id: 3,
      title: 'Factor Analysis Deep Dive',
      date: '2024-01-05',
      category: 'Quantitative',
      excerpt: 'Understanding multi-factor models and their role in portfolio construction.',
    },
  ];

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <span className="text-accent text-sm mt-2 md:mt-0">{article.date}</span>
          </div>
          <p className="text-gray-400 mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm bg-primary px-3 py-1 rounded text-accent">{article.category}</span>
            <a href="#" className="text-accent hover:text-blue-400">Read More →</a>
          </div>
        </div>
      ))}
    </div>
  );
}
EOF

# Create src/components/MarketDashboard.tsx
cat > src/components/MarketDashboard.tsx << 'EOF'
'use client';

export default function MarketDashboard() {
  const marketData = [
    { symbol: 'SPY', price: 462.85, change: 1.25, changePercent: 0.27 },
    { symbol: 'QQQ', price: 385.42, change: -0.85, changePercent: -0.22 },
    { symbol: 'IWM', price: 195.63, change: 2.15, changePercent: 1.11 },
    { symbol: 'GLD', price: 195.50, change: 3.20, changePercent: 1.66 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketData.map((data) => (
          <div key={data.symbol} className="bg-secondary p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">{data.symbol}</h3>
              <span className={`text-lg font-semibold ${data.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {data.change > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">${data.price.toFixed(2)}</p>
            <div className="h-32 bg-primary rounded flex items-center justify-center text-gray-500">
              [Chart would display here]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

# Create src/components/QuantLabTools.tsx
cat > src/components/QuantLabTools.tsx << 'EOF'
export default function QuantLabTools() {
  const tools = [
    {
      name: 'Simple Moving Average (SMA)',
      description: 'Calculate and visualize SMA for trend identification',
      icon: '📊',
    },
    {
      name: 'Relative Strength Index (RSI)',
      description: 'Identify overbought and oversold conditions',
      icon: '📈',
    },
    {
      name: 'Portfolio Analytics',
      description: 'Analyze portfolio performance and risk metrics',
      icon: '💼',
    },
    {
      name: 'Factor Analysis',
      description: 'Understand factor exposures and contributions',
      icon: '🔍',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tools.map((tool, index) => (
        <div key={index} className="bg-secondary p-8 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="text-5xl mb-4">{tool.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
          <p className="text-gray-400 mb-4">{tool.description}</p>
          <button className="bg-accent hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors">
            Launch Tool
          </button>
        </div>
      ))}
    </div>
  );
}
EOF

# Create src/components/CommunityFeed.tsx
cat > src/components/CommunityFeed.tsx << 'EOF'
export default function CommunityFeed() {
  const posts = [
    {
      id: 1,
      author: 'Market Analyst',
      sentiment: 'Bullish',
      forecast: 'S&P 500 expected to reach 470 by Q1 2024',
      votes: 234,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      author: 'Quant Researcher',
      sentiment: 'Neutral',
      forecast: 'Tech sector showing mixed signals on momentum indicators',
      votes: 156,
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      author: 'Risk Manager',
      sentiment: 'Bearish',
      forecast: 'Volatility likely to spike given Fed policy signals',
      votes: 89,
      timestamp: '1 day ago',
    },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Bullish':
        return 'bg-success/20 text-success border-success/50';
      case 'Bearish':
        return 'bg-danger/20 text-danger border-danger/50';
      default:
        return 'bg-warning/20 text-warning border-warning/50';
    }
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-secondary p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-lg">{post.author}</h4>
              <p className="text-sm text-gray-400">{post.timestamp}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getSentimentColor(post.sentiment)}`}>
              {post.sentiment}
            </span>
          </div>
          <p className="text-gray-300 mb-4">{post.forecast}</p>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-accent">
              <span>👍</span>
              <span>{post.votes}</span>
            </button>
            <button className="text-gray-400 hover:text-accent">💬 Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
}
EOF

# Create README.md
cat > README.md << 'EOF'
# Chen Quant Center (CQC)

A professional quantitative research and market analytics platform showcasing expert-level quantitative finance capabilities.

## 🎯 Project Overview

Chen Quant Center is designed to demonstrate professional quantitative finance expertise through:

- **Investment Research**: In-depth analysis and market commentary
- **Market Dashboard**: Real-time market data visualization with price charts and technical indicators
- **Quant Lab**: Advanced tools including SMA, RSI, portfolio analytics, and factor analysis
- **Community**: Market sentiment and collaborative forecasting features

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── research/             # Research section
│   ├── market/               # Market dashboard
│   ├── quantlab/             # Quant tools
│   └── community/            # Community features
└── components/
    ├── Header.tsx            # Navigation header
    ├── Footer.tsx            # Footer
    ├── Hero.tsx              # Landing hero section
    ├── Features.tsx          # Features showcase
    ├── Stats.tsx             # Statistics section
    ├── ResearchList.tsx      # Research articles
    ├── MarketDashboard.tsx   # Market data
    ├── QuantLabTools.tsx     # Quant tools
    └── CommunityFeed.tsx     # Community posts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Jasper-Cyber/jia-quant-platform.git
cd jia-quant-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React 18
- **Deployment**: Vercel (recommended)

## 📋 Features

- ✅ Professional, clean design
- ✅ Mobile-responsive layout
- ✅ Fast loading performance
- ✅ Functional React components with TypeScript
- ✅ Reusable component architecture
- ✅ SEO optimized
- ✅ No authentication required (Version 1)

## 📝 Coding Standards

- Use functional React components
- Prefer TypeScript for type safety
- Avoid duplicated code
- Create responsive layouts
- Use reusable components
- Follow the design principles: Professional, Clean, Mobile-friendly, Minimalistic, Fast

## 🎨 Design Principles

- **Professional**: Enterprise-grade appearance
- **Clean**: Minimalist interface with clear information hierarchy
- **Mobile-friendly**: Responsive design for all devices
- **Minimalistic**: Remove unnecessary elements
- **Fast Loading**: Optimized performance

## 📊 Routes

- `/` - Homepage
- `/research` - Investment research articles
- `/market` - Market dashboard with charts and indicators
- `/quantlab` - Quantitative finance tools
- `/community` - Community sentiment and forecasting

## 🔄 Workflow with Copilot

1. Reference `@AGENTS.md` in GitHub Copilot Chat for project context
2. Ask for new features or components
3. Copilot generates code files
4. Pull changes into local VSCode
5. Make local edits and test
6. Push updates back to GitHub

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📞 Contact & Links

- GitHub: [@Jasper-Cyber](https://github.com/Jasper-Cyber)
- Repository: [jia-quant-platform](https://github.com/Jasper-Cyber/jia-quant-platform)

## 📄 License

This project is open source and available under the MIT License.

---

**Version**: 1.0.0  
**Last Updated**: 2024
EOF

echo "✅ All files created successfully!"
echo ""
echo "Next steps:"
echo "1. npm install"
echo "2. npm run dev"
echo "3. Open http://localhost:3000"
echo ""
echo "🎉 Chen Quant Center is ready!"
