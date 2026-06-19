import { type Article } from "./articles";

export const site = {
  name: "Chen Quant Center",
  shortName: "CQC",
  slogan: "Evidence, Logic, Value creation",
  focus: "Insights \u2022 Markets \u2022 Analytics",
  email: "example@chenquant.com",
  social: {
    substack: "https://substack.com/@jasperchen666",
    linkedin: "www.linkedin.com/in/jia-chen-7a1a6036",
    wechat: "jiaobserver",
    github: "https://github.com/Jasper-Cyber",
  },
};

export const briefText = "I believe sustainable investment returns ultimately arise from improvements in productivity, innovation, and the ability of businesses to satisfy human needs. Through economic reasoning, quantitative analysis, and data-driven research, CQC explores how technology, capital allocation, and market behavior interact to create long-term value. The objective is to understand how value is created, measured, and allocated in financial markets and the real economy.";

export const pillarCards = [
  {
    num: 1,
    href: "/research",
    title: "Research and Insights",
    description:
      "Research and commentary on value creation, productivity, technology, and financial markets.",
  },
  {
    num: 2,
    href: "/market",
    title: "Market Data",
    description:
      "A dashboard of market data and visualizations that help explore economic activity, market behavior, and financial insights. ",
  },
  {
    num: 3,
    href: "/quant-lab",
    title: "Quant Lab",
    description:
      "Quantitative tools and models for analyzing market conditions, risk, valuation, sentiment, and performance.",
  },
];

export const researchInterests = [
  "Quantitative equity and macro research",
  "Factor investing and systematic backtesting",
  "Risk management (CVaR, ARCH, volatility modeling)",
  "Technology, productivity, and capital markets",
  "ESG and sustainable systems valuation",
];

export const stockSymbols = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "NVDA",
  "META",
  "JPM",
  "XOM",
  "SPY",
  "QQQ",
];

export const backtestCases = [
  {
    title: "Momentum factor — U.S. large cap",
    description: "12-1 month momentum with monthly rebalance (sample placeholder).",
    github: "#",
  },
  {
    title: "Value vs. growth regime switch",
    description: "Book-to-market spread strategy with volatility filter.",
    github: "#",
  },
  {
    title: "Macro overlay on equity beta",
    description: "Rates-sensitive overlay using rolling factor regression.",
    github: "#",
  },
];
