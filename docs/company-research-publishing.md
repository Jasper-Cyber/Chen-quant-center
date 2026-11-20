# Publishing company research on Chen Quant Center

The Company Research archive lives at `/research/company-research`. It reads Markdown posts from
`src/content/articles/`, using the same parser and visual style as other CQC research posts.

## Publishing an equity report

1. Generate the standalone report with the Chen Quant reporting tool, preferably in Markdown
   (`python -m equity_report NVDA -o NVDA_report.md`), and export the supporting Excel workbook if needed.
2. Independently review every source figure, currency, fiscal period, exchange listing, ADR/share ratio,
   company-specific assertion, earnings multiple, and bear/base/bull valuation assumption.
3. Distinguish financial facts and derived calculations from forecasts and AI-assisted commentary.
   Confirm all supporting links and record the report's **financial data cutoff** and **publication date**.
4. Edit the Markdown into an article for CQC. Add YAML frontmatter as in the example below.
   Store it at `src/content/articles/nvda-equity-research-2026-11.md`.
5. Move any standalone charts/images into `public/images/company-research/` and change
   references to site-relative paths, e.g. `/images/company-research/nvda-chart.png`.
   Review any raw HTML before including it; avoid embedded scripts, iframes, and third-party trackers.
6. Commit the article and images, run the Next.js build, and review the rendered report before merging.
   The article will appear automatically in the Company Research archive and Recent Insights.

## Example article frontmatter

```yaml
---
title: "NVIDIA — Equity Research (Illustrative Title)"
date: "2026-11-20"
author: "Jia Chen"
category: "Company Research"
ticker: "NVDA"
excerpt: "Independent review of NVIDIA's business, financials, valuation scenarios, and key risks."
---
```

The text above is a **publishing template only**; it is not a factual NVIDIA research report.

## Suggested report content

- Company and ticker/security identification; reporting/market-price currencies
- Executive summary and investment thesis
- Financial statements and source/date notes
- Industry, value chain, competition, and key risks
- Valuation methodology and numerical assumptions for each scenario
- Sensitivity analysis and limitations
- AI-assisted analysis disclosure, sources, data cutoff, and relevant conflicts

## Markdown or HTML?

**Markdown is the preferred editorial source for CQC.** It is already supported by
`src/lib/articles.ts` (GFM tables, math, and inline HTML), and is rendered through the
shared research-page design. Markdown makes reports easier to review, track, and publish.

The original standalone HTML can be retained privately or offered as a downloadable
artifact after review. Avoid inserting a complete HTML document into an article:
HTML `<head>`, `<style>`, scripts, embedded media, and layout assumptions may conflict with CQC.

For complex charts, put the image assets under `public/images/company-research` and link
them from Markdown, or implement a purpose-built Next.js chart component.

**Important:** The system currently loads Markdown from the repository at build time.
Writing a new local report does not publish it until the source article/assets are
committed to the website repository and its deployment completes.

## Publication standards

Never invent unavailable figures or silently patch missing data. Preserve the origin
of key financial metrics, distinguish actuals from estimates, and add appropriate
AI-assisted research and investment-risk disclosures. A research disclaimer does not
replace review for publication accuracy or any applicable legal obligations.
