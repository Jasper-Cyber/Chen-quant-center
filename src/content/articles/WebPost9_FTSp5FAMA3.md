---
title: "Understanding Financial Time Series Models (Part V):The Fama-French Three-Factor Model"
date: "2026-09-18"
author: "Jia Chen"
excerpt: "Chen Quant Academy Series -- Introducing Quantitative Models in Finance"
---

In the previous articles, we explored how quantitative models can help
us understand the dynamics of financial markets:

- **ARMA:** How do past returns and shocks shape today\'s expected
  return?

- **ARCH:** How do past shocks influence today\'s uncertainty?

- **GARCH:** How does uncertainty itself evolve over time?

- **VaR:** How can we translate market uncertainty into a measurable
  potential loss?

So far, the focus has been primarily on **time-series behavior and risk
measurement**.

We now turn to another fundamental question in finance:

**Why do different assets earn different expected returns?**

Why have small companies sometimes generated different returns from
large companies? Why have value stocks historically behaved differently
from growth stocks? And can the risk of a diversified portfolio really
be summarized by a single number such as market beta?

These questions led to one of the most influential developments in
modern asset pricing: the **Fama-French Three-Factor Model**.

## Introduce Fama-French

### From CAPM to the Fama-French Model

Before introducing the Fama-French model, it is useful to review the
Capital Asset Pricing Model (CAPM).

The CAPM argues that the expected excess return of an asset depends
primarily on its exposure to market risk:

$$E\left( R_{i} \right) - R_{f} = \beta_{i}\left\lbrack E\left( R_{m} \right) - R_{f} \right\rbrack$$

>- $R_i$: Return of asset i
>- $R_f$: Risk-free rate
>- $R_m$: Market portfolio return
>- $\beta_i$: Sensitivity of the asset to movements in the overall
  market

The intuition is straightforward.

If an asset tends to move strongly with the market, investors are
exposed to greater systematic market risk. Therefore, they may demand a
higher expected return as compensation.

CAPM was a major breakthrough because it separated risk into two
categories:

- **Systematic risk:** Risk associated with the overall market

- **Idiosyncratic risk:** Firm-specific risk that can potentially be
  diversified away

However, empirical research gradually revealed an important problem.

**Market beta alone could not fully explain differences in average stock
returns.**

Researchers observed persistent patterns associated with characteristics
such as:

- Company size

- Valuation ratios

- Book-to-market ratios

These patterns became known as **factor anomalies** or **return
anomalies**.

This motivated Eugene Fama and Kenneth French to propose a broader
framework.

<p align="center">

<img src="/images/TSFP5F1.png" alt="Figure 1 From CAPM to Fama-French 3"
width="600" />
</p>



### The Fama-French Three-Factor Model

In 1993, Eugene Fama and Kenneth French introduced the **Fama-French
Three-Factor Model**.

The model extends CAPM by adding two additional factors to the
traditional market factor\-- **Size Factor** and **Value Factor.**

The model can be written as:

$$R_{i} - R_{f} = \alpha_{i} + \beta_{M,i}\left( R_{m} - R_{f} \right) + \beta_{SMB,i}SMB + \beta_{HML,i}HML + \epsilon_{i}$$

The model attempts to explain an asset\'s excess return using its
exposure to these three systematic factors.

> - SMB: Small Minus Big, the size factor

> - HML: High Minus Low, the value factor

> - $\alpha_i$: Abnormal return not explained by the three factors

> - $\epsilon_i$: Residual or unexplained component

The central idea is:

**A stock\'s return may depend not only on its exposure to the overall
market, but also on its exposure to systematic patterns associated with
company size and relative valuation.**

#### Factor One: The Market Risk Premium

The first factor is inherited directly from CAPM:

$$R_{m} - R_{f}$$

This represents the **market excess return**, or market risk premium.

It measures the additional return investors receive from holding the
market portfolio instead of a risk-free asset. Each asset has a market
beta: $\beta_{M,i}$ . A stock with a beta greater than 1 tends to move
more strongly than the overall market. The market factor captures broad
systematic economic and financial risk.

However, the Fama-French research suggested that market exposure alone
was not enough.

#### Factor Two: SMB --- The Size Factor

The second factor is SMB, stands for **Small Minus Big**. It measures
the return difference between portfolios of small-cap stocks and
large-cap stocks:

$$SMB = R_{\text{Small}} - R_{\text{Big}}$$

A positive SMB return means that, during that period, small companies
outperformed large companies, negative value means that large companies
outperformed small companies.

The size factor was motivated by the observation that smaller companies
historically appeared to exhibit different average return behavior from
larger companies.

In the Fama-French framework, an asset can also have an estimated **SMB
factor loading, β~SMB~**. A positive β~SMB~ indicates that the asset\'s
returns tend to move with the SMB factor, while a negative β~SMB~
indicates an opposite relationship.

Importantly, β~SMB~ does **not** classify a company as small or large.
Company size is used when constructing the SMB factor; β~SMB~ is
subsequently estimated from the asset\'s return relationship with that
factor.

#### Factor Three: HML --- The Value Factor

The third factor is HML, it stands for **High Minus Low**. It measures
the difference in returns between stocks with high book-to-market ratios
and low book-to-market ratios.

$$HML = R_{\text{High~B/M}} - R_{\text{Low~B/M}}$$

An asset\'s exposure to the value factor is represented by **β~HML~**. A
positive β~HML~ indicates that its returns tend to move with the HML
factor, while a negative β~HML~ indicates an opposite relationship. This
factor exposure should not be confused with directly classifying the
asset as a value or growth stock.

## How Are SMB and HML Constructed?

One of the strengths of the Fama-French framework is that its factors
are constructed from portfolios of real stocks rather than treated as
abstract theoretical variables.

At the end of each June, U.S. stocks are sorted independently by
**market capitalization** and **book-to-market ratio (B/M)**. The size
breakpoint is the **NYSE median market capitalization**, while the B/M
breakpoints are the **30th and 70th NYSE percentiles**.

These two classifications create six value-weighted portfolios:
Small/Value, Small/Neutral, Small/Growth, Big/Value, Big/Neutral, and
Big/Growth. The portfolios are then used to construct the factor
returns.

This construction transforms observable company characteristics into
**portfolio-based systematic factors**.

<p align="center">

<img src="/images/TSFP5F2.png" alt="Figure 2 SMB & HML Factor Construction"
width="600" />
</p>

## Why Do These Factors Matter?

Why should small-cap and high-value firms earn systematic return premia
over long horizons? Academic finance is divided into two competing
schools of thought:

### 1. The Rational Risk-Based Hypothesis (Fama & French)

Under the Efficient Market Hypothesis (EMH), higher returns can *only*
stem from higher systematic risk:

- **Size as Vulnerability:** Small firms have less diversified revenue
  streams, limited access to debt capital markets during recessions,
  thinner trading liquidity, and higher default sensitivities to
  aggregate macroeconomic contractions.

- **Value as Relative Distress:** High B/M firms are typically mature
  companies experiencing prolonged financial distress, depressed
  earnings, or high financial/operating leverage. Their capital
  equipment is often irreversible, making them unable to easily
  downscale during market downturns.

- **Covariance with State Variables:** In line with Robert Merton\'s
  **Intertemporal CAPM (ICAPM)**, size and value act as state variables
  tracking shifts in investment opportunities, labor income risks, and
  credit availability.

### 2. The Behavioral Finance Hypothesis (Lakonishok, Shleifer, and Vishny)

Behavioral economists argue that factor premia are manifestations of
persistent cognitive biases:

- **Extrapolation Errors:** Investors irrationally extrapolate the
  recent strong earnings growth of \"glamour\" (low B/M) stocks too far
  into the future, bidding their prices above intrinsic value.

- **Overreaction to Adversity:** Investors excessively punish
  unglamorous value companies experiencing short-term setbacks. When
  value firms subsequently exhibit modest mean-reversion in
  profitability, they generate positive earnings surprises, yielding the
  value premium.

- **Limits to Arbitrage:** Institutional career risk (fund managers
  avoiding distressed stocks that look risky to clients) prevents smart
  money from fully arbitraging away these pricing discrepancies.

The Fama-French model primarily provides a framework for **measuring and
modeling factor exposure**; it does not by itself settle the debate over
why these premiums exist.

### What Does the Three-Factor Model Explain?

Suppose we analyze a stock portfolio and estimate its
$\beta_{M}\ ,\beta_{SMB},\ \beta_{HML}$ . Its returns may be partially
explained by its exposure to market movements, Small/Large-company
performance, and Value/Growth-stock performance.

After controlling for market, size, and value exposures, we examine:
$\alpha_{i}$ . If a portfolio\'s returns are fully explained by factor
exposures, its estimated alpha may be close to zero. If a statistically
significant positive alpha remains, this may suggest performance not
fully explained by the three factors.

Therefore, the Fama-French model became an important tool for portfolio
performance evaluation , fund manager analysis , risk decomposition ,
benchmark construction , and factor investing .

### Alpha: Skill or Factor Exposure?

One of the most important applications of factor models is separating
**Investment skill from systematic exposure.** Suppose two portfolios
both generate a 12% annual return. At first glance, they appear equally
successful. However, after factor analysis, we may discover Portfolio A
**with High market beta** and **Alpha close to zero** , while Portfolio
B with Moderate factor exposure and Positive and statistically
**significant alpha.**

These portfolios may have produced the same return, but the sources of
that return are very different. Portfolio A may have simply taken
systematic factor risks, and Portfolio B generated returns that are not
statistically explained by the factors included in the model.

This distinction is central to modern portfolio analysis. High returns
do not automatically imply high investment skill. A return must be
evaluated relative to the risks and systematic factors that generated
it.

### The Connection to Modern Quantitative Investing

The Fama-French model helped transform the way investors think about
portfolios.

Instead of viewing a portfolio only as a collection of individual
stocks, quantitative investors increasingly analyze portfolios as
collections of **factor exposures**. The Fama-French Three-Factor Model
was one of the most important frameworks that helped establish this
approach.

## Practical Applications

### Performance Attribution & Active Manager Analysis

A manager may appear to generate substantial alpha when evaluated
against a simple benchmark such as CAPM. After controlling for size and
value exposures, however, the estimated alpha may become substantially
smaller or statistically insignificant.

The analysis can therefore reveal whether apparent active performance is
partly explained by systematic factor exposures.

### Corporate Hurdle Rates & Cost of Equity

Under multi-factor models, the cost of equity for corporate capital
budgeting expands beyond CAPM.

Multi-factor models can produce different estimates of required return
from CAPM when an asset has significant exposure to additional
systematic factors such as size and value.

### Quantitative Factor Investing and Style Neutralization

Investors can intentionally construct portfolios with desired exposures,
or employ Fama--French factor loadings to ensure their portfolios are
**factor-neutral.**

Investing with desired exposure is known as **factor investing**.
Instead of selecting individual stocks based solely on company-specific
forecasts, investors can manage portfolios according to systematic
factor characteristics.

If a quant signals mispricing based on earnings momentum, they can
construct their portfolio to neutralize portfolio SMB and HML
coefficients. This can help investors distinguish a portfolio\'s
intended alpha signal from unintended exposure to systematic size and
value factors.

### Limitations of the Fama-French Three-Factor Model

Although the model significantly boosted explanatory power and is
extremely influential, it does not explain all return patterns.

**1. Momentum Is Not Included**

One of the most important return patterns in financial markets is
**momentum**. Stocks that have performed well over certain past periods
have historically shown a tendency, under some conditions, to continue
performing well in subsequent periods.

**2. The Model May Omit Other Important Factors**

Later research identified additional factors related to Profitability,
Investment behavior, Momentum, Liquidity, Quality etc. These
developments eventually led Fama and French to propose the **Five-Factor
Model**.

**3. Alpha Depends on the Model**

This is a particularly important limitation. A portfolio\'s alpha
depends on which factors are included in the model. A manager may appear
to generate positive alpha under CAPM. After adding size and value
factors, that alpha may decrease. After adding momentum and other
factors, it may decrease further. Therefore: **Alpha is not an absolute
concept. It is always measured relative to a model.**

## Summary

The previous articles in this series focused primarily on understanding
and measuring financial risk:

**ARMA → ARCH → GARCH → VaR**

These models asked: How do returns evolve? How does volatility evolve?
How can potential losses be measured?

The Fama-French model introduces a different by asking which systematic
factors may help explain a portfolio\'s returns. It extends the
traditional CAPM framework by recognizing that stock returns may be
related to more than market exposure alone. The key insight is:

**Investment returns should not be evaluated only by how much a
portfolio earned, but also by understanding which systematic factors
generated those returns.**

This idea fundamentally influenced modern portfolio management,
quantitative investing, and performance evaluation.

## Looking Ahead: Beyond Three Factors

The Three-Factor Model represented a major step forward in asset
pricing, but financial markets are more complex than three sources of
systematic risk.

In the next article, we will introduce the **Fama-French Five-Factor
Model** and examine how profitability and investment extend the
three-factor framework.
