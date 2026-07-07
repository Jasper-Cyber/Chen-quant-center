## **Understanding Financial Time Series Models (Part I): ARMA and Market Dynamics** 

_Chen Quant Academy Series – Quantitative Models Explained_ 

## **Introduction: Is the Market Completely Random?** 

One of the first questions in quantitative finance is whether financial markets are entirely random or whether traces of the past continue to influence the future. 

At first glance, daily price movements appear chaotic. News arrives unexpectedly, investor sentiment changes rapidly, and external shocks constantly reshape 

expectations. On the contrary, some old tale says “ Rich will always be rich”. Yet empirical observations reveal more complexity, contain both persistence and collapse, that many economic and financial variables exhibit persistence, cycles, and short-term dependencies. 

Understanding these patterns is the purpose of time-series analysis. 

Among the classical tools, the **AutoRegressive Moving Average (ARMA)** model provides a foundational framework for describing how historical information propagates through time. 

Although modern quantitative research employs far more sophisticated techniques, ARMA remains an essential starting point for understanding dynamic systems, forecasting, and statistical inference. 

## **What Is a Time Series?** 

A time series is a sequence of observations indexed by time, such as daily stock returns, monthly inflation rates, annual productivity statistics, or personal income 

and consumption over time. 

Unlike ordinary cross-sectional random data, time-series observations are inherently connected. A simple example is personal income and consumption. Income earned today influences tomorrow's spending, while accumulated experience and skills shape future productivity. Such observations are naturally connected over time rather than being independent. 

The ordering of observations therefore contains valuable information. 

Understanding these temporal relationships is the central objective of time-series modeling. 

_Autocorrelation: Does the Past Matter?_ 

An intuitive question we can ask is: 

Does a variable tend to resemble its own past values? 

This concept is known as **autocorrelation** . Positive autocorrelation implies persistence: economic growth tends to continue, business cycles often evolve gradually; negative autocorrelation implies reversal: economics may turn its direction, good business yesterday may getting hard or even obsolete today. If no autocorrelation exists, observations behave like independent random shocks. Strong autocorrelation suggests that historical information still contains explanatory power for future outcomes. 

The purpose of autocorrelation function is to find relation between past and today, or future. The autocorrelation coefficient at lag (k) measures the relationship between the current observation and its value (k) periods earlier. 

The **Autoregressive Moving Average (ARMA)** model is a cornerstone of classical time-series analysis. Originally formalized by Peter Whittle in 1951 and popularized in the seminal 1970 book by George Box and Gwilym Jenkins, ARMA models are designed to understand, represent, and forecast the **conditional mean** of a stationary stochastic process. To understand this fundamental tool of modern financial analysis, I will introduce the AR, MA and their combination ARMA model in 

this article. 

## The Autoregressive Model (AR) 

The **Autoregressive (AR)** model assumes that the present depends directly on previous observations. 

An AR(1) process is expressed as: 

**==> picture [86 x 12] intentionally omitted <==**

This function express a simplified assumption: 

_Today's value equals a constant, plus a fraction of yesterday's value, plus a new random shock._ 

Examples include: Inflation persistence; Business cycles; Commodity prices, etc. The parameter $\phi$ measures memory: $\phi > 0$ : persistence, ( \phi < 0 ): reversal, ( \phi = 0 ): no dependence. If the absolute value of coefficient becomes large than 1, shocks accumulate indefinitely and the process loses stability, so it’s normal to limit it smaller than 1. In this way, many economic systems can be viewed as balancing persistence with adaptation. 

## The Moving Average Model (MA) 

The **Moving Average (MA)** model approaches dynamics from another perspective. 

Instead of depending on past observations themselves, it assumes that current values depend on past disturbances. 

An MA(1) process is given by: 

$$ 

y_t = \mu + \epsilon_t + \theta \epsilon_{t-1} 

$$ 

The key idea is: 

## _Economic systems remember shocks._ 

A large event—such as a policy announcement, technological breakthrough, or financial crisis—may influence behavior beyond the moment it occurs. The MA framework captures the lingering effects of these temporary disturbances. 

In practice: Supply-chain disruptions affect future production, monetary policy announcements influence expectations for several periods, market surprises generate delayed responses from investors. 

The parameter ( \theta ) determines how strongly past shocks continue to shape present outcomes. 

## AR versus MA: Two Different Views of Dynamics 

Although both models describe temporal dependence, their interpretations differ fundamentally. 

## **Model Interpretation Economic Meaning** 

AR Dependence on past values Persistence and inertia 

MA Dependence on past shocks Memory of disturbances 

ARMA Combination of both Dynamic systems with inertia and shocks 

An AR model suggests that the system itself contains internal momentum. 

An MA model suggests that the environment continuously injects shocks whose effects gradually dissipate. 

Real-world systems often exhibit both characteristics simultaneously. 

## The ARMA Model: Persistence Meets Innovation 

The **AutoRegressive Moving Average (ARMA)** model combines these two mechanisms. 

An ARMA(1,1) specification can be written as: 

$$y_t = c + \phi y_{t-1} + \epsilon_t + \theta \epsilon_{t-1}$$ 

Conceptually, this means: 

_The present is shaped both by historical conditions and by memories of recent shocks._ 

Economic and financial systems rarely reset themselves each period. Organizations accumulate experience and turn them into knowledge asset and intellectual property; Consumers form expectations and figure what’s better for them to consume; investors react not only to current information but also to previous surprises. 

ARMA models provide a parsimonious framework for describing these interactions. 

## Current Applications in Economics and Finance 

ARMA models remain widely used in: 

**Macroeconomic Forecasting :** GDP growth, Inflation, Unemployment, Industrial production. 

**Financial Analysis :** Interest rates, Exchange rates, Commodity prices, Return processes. 

**Business Operations:** Demand forecasting, Inventory management, Supply-chain planning, Energy consumption prediction. 

Although many modern machine-learning approaches outperform classical methods in 

certain contexts, ARMA models possess important advantages: 

- Transparency. 

- Interpretability. 

- Statistical rigor. 

- Economic intuition. 

Understanding them remains essential before moving toward more sophisticated frameworks. 

## **Limitations of ARMA Models** 

Despite their usefulness, ARMA models face important limitations. 

First, they assume relatively stable statistical structures over time. 

Second, they primarily focus on the conditional mean rather than changing risk conditions. 

Financial markets, however, exhibit a phenomenon known as **volatility clustering** : 

Calm periods are followed by calm periods, and turbulent periods are followed by turbulence. 

ARMA can describe expected dynamics, but it cannot adequately model evolving uncertainty. 

This limitation motivates the development of the next generation of models: 

- ARCH (Autoregressive Conditional Heteroskedasticity) 

- GARCH (Generalized ARCH) 

These frameworks shift attention from predicting returns to understanding risk itself. Which will be introduced in following articles. 

## Conclusion 

Time-series analysis begins with a simple but profound question: 

How much of the past survives into the present? 

Autocorrelation provides the first clue. Autoregressive models capture persistence. Moving-average models describe the memory of shocks. ARMA integrates both mechanisms into a coherent framework for understanding dynamic systems. 

For quantitative researchers, mastering these ideas is not merely a technical exercise. It is a way of thinking about how information, expectations, and disturbances propagate through economies and organizations over time. 

In the next article, we move from modeling expectations to modeling uncertainty itself, introducing the ARCH framework and the phenomenon of volatility clustering. 

The **Autoregressive Moving Average (ARMA)** model is a cornerstone of classical time-series analysis. Originally formalized by Peter Whittle in 1951 and popularized in the seminal 1970 book by George Box and Gwilym Jenkins, ARMA models are designed to understand, represent, and forecast the **conditional mean** of a stationary stochastic process. 

Unlike models like **ARCH/GARCH** —which capture time-varying _volatility_ (conditional variance)—an ARMA model filters and maps the systematic momentum and short-term shocks that drive the _value_ of the series itself. 

## **1. Core Philosophy & The Wold Decomposition** 

To understand why we combine Autoregressive (AR) and Moving Average (MA) processes, we must look to the **Wold Decomposition Theorem** . This theorem states 

that any covariance-stationary time series $\{X_t\}$ can be represented as the sum of two mutually uncorrelated processes: 

1. A **deterministic** component (perfectly predictable using a linear combination of past values). 

2. A **stochastic** component that is purely non-deterministic and can be 

represented as an infinite moving average of white noise shocks. 

Since estimating an infinite number of parameters is statistically impossible, the ARMA model acts as a highly parsimonious approximation of this infinite representation. By combining a finite number of past values, $AR(p)$, and a finite number of past shocks, $MA(q)$, we can model complex dependency structures with very few parameters. 

## **2. Structural Decomposition of $ARMA(p, q)$** 

An $ARMA(p, q)$ model consists of two distinct components, where $p$ is the order of the autoregressive part and $q$ is the order of the moving average part. 

## **A. The Autoregressive (AR) Part — Order $p$** 

The $AR(p)$ model assumes that the current value of the series, $X_t$, depends linearly on its own immediate past $p$ values (lags) plus a random shock. 

##  **Equation:** 

$$X_t = c + \phi_1 X_{t-1} + \phi_2 X_{t-2} + \dots + \phi_p X_{t-p} + \epsilon_t$$ 

- **Intuition:** This represents **momentum** or **mean-reversion** . For instance, if asset returns have short-term momentum, a positive return yesterday suggests a positive return today. 

- **Stationarity Constraint:** For an $AR$ process to be stationary, the roots of its characteristic equation must lie outside the complex unit circle. For a simple $AR(1)$ process ($X_t = \phi_1 X_{t-1} + \epsilon_t$), this simplifies to: 

$$|\phi_1| < 1$$ 

If $|\phi_1| = 1$, the process becomes a non-stationary **random walk** (unit root). 

## **B. The Moving Average (MA) Part — Order $q$** 

The $MA(q)$ model assumes that the current value $X_t$ is a linear combination of the current white noise shock and the past $q$ white noise shocks. 

##  **Equation:** 

$$X_t = \mu + \epsilon_t + \theta_1 \epsilon_{t-1} + \theta_2 \epsilon_{t-2} + \dots + \theta_q \epsilon_{t-q}$$ 

- **Intuition:** This represents the lingering effect of unexpected market events or **systematic shocks** (e.g., surprise earnings announcements or macroeconomic data releases). A shock occurs at time $t-1$ and continues to decay or influence the price at time $t$, $t+1$, etc., before vanishing. 

- **Invertibility Constraint:** To ensure that the error terms can be uniquely recovered from past observed values of $X_t$, the MA process must be **invertible** . Similar to the stationarity condition of the AR part, the roots of the MA characteristic equation must lie outside the unit circle. For an $MA(1)$ process, this requires: 

$$|\theta_1| < 1$$ 

## **3. Mathematical Formulations** 

To write and manipulate ARMA models efficiently, statisticians use the **Lag Operator** (or Backshift Operator), denoted by $B$ (or $L$), where: 

$$B^k X_t = X_{t-k}$$ 

## **The General Algebraic Equation** 

Using standard algebra, a stationary $ARMA(p, q)$ process is written as: 

$$X_t = c + \epsilon_t + \sum_{i=1}^{p} \phi_i X_{t-i} + \sum_{j=1}^{q} \theta_j \epsilon_{t-j}$$ 

## Where: 

- $c$: A constant term related to the mean of the process $\mu$ via $\mu = \frac{c}{1 - \sum \phi_i}$. 

- $\phi_1, \dots, \phi_p$: Autoregressive parameters. 

- $\theta_1, \dots, \theta_q$: Moving average parameters. 

- $\epsilon_t$: White noise error terms, such that $\epsilon_t \sim \text{IID } \mathcal{N}(0, \sigma^2)$. 

## **The Lag Operator Representation** 

Using the lag operator $B$, we can group the $X$ terms on the left and the $\epsilon$ terms on the right: 

$$\left(1 - \sum_{i=1}^{p} \phi_i B^i\right) X_t = c + \left(1 + \sum_{j=1}^{q} \theta_j B^j\right) \epsilon_t$$ 

This is compactly written as: 

$$\Phi(B) X_t = c + \Theta(B) \epsilon_t$$ 

Where: 

- $\Phi(B) = 1 - \phi_1 B - \phi_2 B^2 - \dots - \phi_p B^p$ is the 

## **Autoregressive polynomial** . 

- $\Theta(B) = 1 + \theta_1 B + \theta_2 B^2 + \dots + \theta_q B^q$ is the **Moving Average polynomial** . 

## **4. Model Identification: ACF and PACF Behavior** 

Before fitting an ARMA model, we must identify the appropriate orders $p$ and $q$. We do this by analyzing two statistical plots: the **Autocorrelation Function (ACF)** and the **Partial Autocorrelation Function (PACF)** . 

- **ACF:** Measures the total linear correlation between $X_t$ and its lag $X_{tk}$. 

- **PACF:** Measures the correlation between $X_t$ and its lag $X_{t-k}$ _after_ controlling for the effects of all shorter lags (from $1$ to $k-1$). 

The theoretical behaviors of these functions act as a blueprint for identification: 

## **Model** 

## **ACF Plot Behavior PACF Plot Behavior** 

## **Structure** 

Decays exponentially or as a **Pure** $AR(p)$ damped sine wave towards 0 **Cuts off abruptly** after lag $p$. (never shuts off). 

**Pure** $MA(q)$ **Cuts off abruptly** after lag $q$. 

Decays exponentially or as a damped sine wave towards 0 (never shuts off). 

**Mixed** Decays exponentially or as a Decays exponentially or as a $ARMA(p, q)$ damped sine wave after lag $q$. damped sine wave after lag $p$. 

## **The Identification Process** 

1. If the PACF spikes at lag 1 and 2 and then drops to statistically zero, while the ACF decays slowly, you should fit an $AR(2)$ model. 

2. If the ACF spikes at lag 1 and then drops to zero, while the PACF decays slowly, you should fit an $MA(1)$ model. 

3. If both decay gradually, a mixed $ARMA(1, 1)$ or higher-order model is appropriate. 

## **5. Estimation, Selection, and Diagnostic Verification** 

Modern statistical packages automate the estimation of ARMA models, but understanding the steps is crucial to avoiding misspecified models. 

[Raw Data] │ ▼ 

[Check Stationarity] ──(Non-Stationary)──► [Difference/Transform Data] │                                          │ (Stationary)                                    │ ├──────────────────────────────────────────┘ ▼ 

[Identify Orders p, q via ACF/PACF] │ ▼ [Estimate Parameters via MLE/LS] │ ▼ [Select Optimal Model via AIC/BIC] │ ▼ 

[Verify Residuals (Ljung-Box Test)] ──(Fail/Autocorrelated)──┐ │                                                 │ (Pass/White Noise)                                      │ ▼                                                 ▼ 

[Ready for Forecasting]                           [Revise Orders p, q] 

## **Step 1: Stationarity Check** 

You must verify that your time series is stationary. Feeding a non-stationary series (like a raw stock price) into an ARMA model will result in spurious regressions and mathematically invalid forecasts. 

- **Visual Test:** Plot the series over time. Look for a constant mean and constant variance. 

- **Statistical Test:** Run an **Augmented Dickey-Fuller (ADF)** test or a 

**Kwiatkowski-Phillips-Schmidt-Shin (KPSS)** test. If a unit root is present, 

you must transform the series—typically by taking the first difference of the log prices to generate **log returns** : 

$$r_t = \ln(S_t) - \ln(S_{t-1})$$ 

## **Step 2: Parameter Estimation** 

Once orders $p$ and $q$ are selected, parameters ($\phi, \theta, \sigma^2$) are estimated using: 

- **Maximum Likelihood Estimation (MLE):** Finds parameter values that maximize the probability of observing the historical data under the assumption of normally distributed residuals. 

- **Conditional Least Squares (CLS):** Minimizes the sum of squared residuals ($\sum \epsilon_t^2$). 

## **Step 3: Model Selection Criteria** 

If multiple models ($ARMA(1,1)$ vs. $ARMA(2,1)$) seem plausible, you select the best model using information criteria that penalize overfitting (adding too many parameters): 

- **Akaike Information Criterion (AIC):** 

$$AIC = 2k - 2\ln(\hat{L})$$ 

##  **Bayesian Information Criterion (BIC):** 

$$BIC = \ln(n)k - 2\ln(\hat{L})$$ 

Where $k = p + q + 1$ (number of parameters), $n$ is the sample size, and $\hat{L}$ is the maximized likelihood. **Lower values of AIC or BIC indicate a better, more parsimonious model.** BIC penalizes additional parameters more severely than AIC. 

## **Step 4: Diagnostic Checking** 

After fitting the model, you must check the residuals ($\hat{\epsilon}_t$): 

1. **Zero Mean and Homoskedasticity:** The residuals should behave like white noise. 

2. **No Autocorrelation:** Run a **Ljung-Box Q-test** on the residuals. The null hypothesis ($H_0$) is that the residuals are independently distributed (no remaining autocorrelation). 

   - If you _reject_ $H_0$ (p-value $< 0.05$), your model has left predictable information on the table. You must expand your orders $p$ or $q$. 

## **6. Financial and Economic Applications** 

Within quantitative finance, asset management, and macroeconomic forecasting, ARMA models are deployed across several environments: 

## **I. Mean-Reversion Trading Strategies** 

Pairs trading, interest rate spreads, and valuation ratios (like dividend yields) are fundamentally mean-reverting. An $AR(1)$ model with $0 < \phi_1 < 1$ represents a mean-reverting process where the speed of reversion is governed by $1 - \phi_1$. Quants use this to trade spreads when they deviate significantly from their historical ARMA-predicted mean. 

## **II. The First Stage of Volatility Modeling (ARMA-GARCH)** 

In asset returns, volatility is highly clustered. To model this volatility using a **GARCH** model, you must first remove any predictable linear patterns in the 

conditional mean of the returns. 

1. **Mean Equation:** Fit an $ARMA(p, q)$ model to the asset returns $r_t$ to obtain clean, uncorrelated residuals $\epsilon_t$: 

$$r_t = c + \phi_1 r_{t-1} + \theta_1 \epsilon_{t-1} + \epsilon_t$$ 

2. **Variance Equation:** Use the residuals $\epsilon_t$ to model the conditional variance $h_t$ via a $GARCH(1, 1)$ process: 

$$h_t = \omega + \alpha \epsilon_{t-1}^2 + \beta h_{t-1}$$ 

This joint **ARMA-GARCH** framework is the industry standard for pricing derivatives, simulating portfolios, and measuring Value at Risk (VaR). 

## **III. Macroeconomic Forecasting** 

Central banks and institutional economists use ARMA variations to forecast economic indicators such as: 

- Inflation rates (CPI changes). 

- Gross Domestic Product (GDP) growth rates. 

- Unemployment rates. 

## **7. Extending ARMA to ARIMA and Beyond** 

If a time series is not stationary, we can integrate the differencing step directly into the model, expanding $ARMA(p, q)$ into **ARIMA(p, d, q)** : 

- $d$ **(Integration Order):** The number of times the series must be differenced to achieve stationarity. 

- An $ARIMA(p, 1, q)$ model is simply an $ARMA(p, q)$ model applied to the first-differenced series: 

$$\Phi(B)(1-B) X_t = c + \Theta(B)\epsilon_t$$ 

If the series contains seasonal patterns (e.g., retail sales spiking every December), we 

can add seasonal lag parameters, resulting in a **SARIMA** (Seasonal ARIMA) model. 

